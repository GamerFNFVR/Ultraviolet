import { createServer } from "node:http";
import { createBareServer } from "@tomphttp/bare-server-node";
import { isAllowedHost } from "./allowlist.js";

const port = Number(process.env.PORT || 8080);
const bare = createBareServer("/bare/", {
	logErrors: process.env.NODE_ENV !== "production",
	filterRemote(remote) {
		if (
			!["http:", "https:", "ws:", "wss:"].includes(remote.protocol) ||
			!isAllowedHost(remote.hostname)
		) {
			throw new Error("Remote host is not allowed.");
		}
	},
});

const server = createServer((request, response) => {
	if (request.url === "/healthz") {
		response.writeHead(200, {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store",
		});
		response.end(JSON.stringify({ ok: true }));
		return;
	}

	if (bare.shouldRoute(request)) {
		void bare.routeRequest(request, response);
		return;
	}

	response.writeHead(404);
	response.end("Not found.");
});

server.on("upgrade", (request, socket, head) => {
	if (bare.shouldRoute(request)) {
		void bare.routeUpgrade(request, socket, head);
		return;
	}

	socket.destroy();
});

server.listen(port, "0.0.0.0");

for (const signal of ["SIGINT", "SIGTERM"]) {
	process.on(signal, () => {
		bare.close();
		server.close(() => process.exit(0));
	});
}