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

export function isAllowedHost(hostname) {
	const normalized = hostname.toLowerCase().replace(/\.$/, "");
	return allowedDomains.some(
		(domain) => normalized === domain || normalized.endsWith(`.${domain}`)
	);
}