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

		if (!navigator.serviceWorker.controller) {
			await new Promise((resolve, reject) => {
				const timeout = setTimeout(() => {
					navigator.serviceWorker.removeEventListener(
						"controllerchange",
						onControllerChange
					);
					reject(new Error("The proxy service worker did not take control."));
				}, 10000);

				function onControllerChange() {
					clearTimeout(timeout);
					resolve();
				}

				navigator.serviceWorker.addEventListener(
					"controllerchange",
					onControllerChange,
					{ once: true }
				);
			});
		}

		const youtubeUrl = "https://www.youtube.com/";
		const frame = document.createElement("iframe");
		frame.title = "YouTube";
		frame.src = `/service/${window.Ultraviolet.codec.xor.encode(youtubeUrl)}`;
		frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
		frame.style.cssText = "position:fixed;inset:0;width:100%;height:100%;border:0";
		document.body.replaceChildren(frame);
	} catch (error) {
		document.body.textContent = `Unable to open YouTube: ${error.message}`;
	}
}

void openYouTube();