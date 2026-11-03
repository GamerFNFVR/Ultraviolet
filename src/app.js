import { BareMuxConnection } from "@mercuryworkshop/bare-mux";

const form = document.querySelector("#youtube-form");
const input = document.querySelector("#youtube-url");
const message = document.querySelector("#message");
const bareServerUrl = process.env.UV_BARE_SERVER_URL;

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	message.textContent = "";

	let target;
	try {
		target = new URL(
			input.value.includes("://") ? input.value : `https://${input.value}`
		);
	} catch {
		message.textContent = "Enter a valid YouTube URL.";
		return;
	}

	if (
		target.protocol !== "https:" ||
		(target.hostname !== "youtube.com" &&
			!target.hostname.endsWith(".youtube.com")) ||
		target.username ||
		target.password
	) {
		message.textContent = "Only youtube.com URLs are allowed.";
		return;
	}

	if (!bareServerUrl) {
		message.textContent = "The proxy backend is not configured.";
		return;
	}

	if (!navigator.serviceWorker) {
		message.textContent = "This browser does not support service workers.";
		return;
	}

	try {
		const backend = new URL(bareServerUrl);
		if (backend.protocol !== "https:" && backend.hostname !== "localhost") {
			throw new Error("The Bare server URL must use HTTPS.");
		}
		if (!backend.pathname.endsWith("/")) backend.pathname += "/";

		const connection = new BareMuxConnection("/bare-mux/worker.js");
		await connection.setTransport(
			new URL("/bare-client.js", location.origin).href,
			[backend.href]
		);
		await navigator.serviceWorker.register("/sw.js");
		await navigator.serviceWorker.ready;
		location.href = `/service/${window.Ultraviolet.codec.xor.encode(target.href)}`;
	} catch (error) {
		message.textContent = `Unable to start the proxy: ${error.message}`;
	}
});