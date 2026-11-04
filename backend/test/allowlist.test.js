import assert from "node:assert/strict";
import test from "node:test";
import { isAllowedHost } from "../src/allowlist.js";

test("allows YouTube and its media/API hosts", () => {
	for (const hostname of [
		"youtube.com",
		"www.youtube.com",
		"youtubei.googleapis.com",
		"fonts.googleapis.com",
		"fonts.gstatic.com",
		"r1---sn.googlevideo.com",
		"i.ytimg.com",
		"yt3.ggpht.com",
		"lh3.googleusercontent.com",
	]) {
		assert.equal(isAllowedHost(hostname), true, hostname);
	}
});

test("rejects unrelated and suffix-spoofed hosts", () => {
	for (const hostname of [
		"example.com",
		"google.com",
		"youtube.com.example.org",
		"notyoutube.com",
	]) {
		assert.equal(isAllowedHost(hostname), false, hostname);
	}
});