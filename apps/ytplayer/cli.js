/**
 * @syntax <url>
 * @description plays a youtube video in a window
 */
let [url] = termAPI.getArguments(line);

if (url.match(/-h|--help/)) {
	return termAPI.write(termAPI.toCRLF`ytplayer v1.0.0
usage:
	ytplayer <url> - plays a youtube video in a window`)
}

function convertToYTEmbed(url) {
	let id = url.match(/watch\?v=([A-z0-9]+)/)[1];
	return `https://www.youtube.com/embed/${id}?autoplay=1`;
}

termAPI.OSComms.openIframe(convertToYTEmbed(url), "YouTube Player", 600, 400);
