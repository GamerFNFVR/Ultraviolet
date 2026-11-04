const allowedDomains = [
	"youtube.com",
	"youtubei.googleapis.com",
	"youtube.googleapis.com",
	"fonts.googleapis.com",
	"fonts.gstatic.com",
	"googlevideo.com",
	"ytimg.com",
	"ggpht.com",
	"googleusercontent.com",
];
const allowedHosts = ["www.google.com", "www.gstatic.com"];

export function isAllowedHost(hostname) {
	const normalized = hostname.toLowerCase().replace(/\.$/, "");
	return (
		allowedHosts.includes(normalized) ||
		allowedDomains.some(
			(domain) => normalized === domain || normalized.endsWith(`.${domain}`)
		)
	);
}