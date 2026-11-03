import { BareMuxConnection } from "@mercuryworkshop/bare-mux";

const bareServerUrl = process.env.UV_BARE_SERVER_URL;

	async function openYouTube() {
		try {
			if (!bareServerUrl)
				throw new Error("The proxy backend is not configured.");
			if (!navigator.serviceWorker)
				throw new Error("This browser does not support service workers.");

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
		const youtubeUrl = "https://www.youtube.com/";
		location.replace(
			`/service/${window.Ultraviolet.codec.xor.encode(youtubeUrl)}`
		);
	} catch (error) {
		document.body.textContent = `Unable to open YouTube: ${error.message}`;
	}
	}

void openYouTube();