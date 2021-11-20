eval(await termAPI.getFileFromPackage("ffmpeg", "./ffmpeg.js"));

const { createFFmpeg } = FFmpeg;

if (!window.ffmpeg) {
	window.ffmpeg = createFFmpeg({ log: true });

	await window.ffmpeg.load();
}


module.exports = window.ffmpeg;
