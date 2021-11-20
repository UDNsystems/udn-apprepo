// run ffmpeg
eval(await termAPI.getFileFromPackage(pkgId, "./ffmpeg.js"));
//ffmpeg ducked up, sad sus
if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer;

const { createFFmpeg } = FFmpeg;

const args = termAPI.getArguments(line);

if (args[0]?.match?.(/-h|--help/)) {
	return termAPI.write(termAPI.toCRLF`ffmpeg cli v1.0.0
syntax:
	ffmpeg [filename] [file url] - runs ffmpeg
options syntax:
	[...] - optional
	<...> - required
options:
	filename - the filename of the file to copy to ffmpeg's in-memory filesystem
	file url - the url of the file to copy to ffmpeg's in-memory filesystem(must have CORS)
`)
}

const ffmpeg = createFFmpeg({ log: true });

termAPI.write('[cli] loading ffmpeg...\r\n')

await ffmpeg.load();
if (args[0]) {
	termAPI.write('[cli] downloading video file...\r\n');
	let videoResp = await fetch(args[1]);
	termAPI.write('[cli] converting to a array buffer...\r\n');
	let videoArrBuf = await videoResp.arrayBuffer();
	termAPI.write('[cli] converting array buffer to uint8array...');
	let videoArr = new Uint8Array(videoArrBuf)
	termAPI.write('[cli] writing the video file to ffmpeg\'s vFS...\r\n');

	ffmpeg.FS('writeFile',args[0],videoArr);
}
let ffmpeg_args = (await termAPI.prompt('ffmpeg arguments(separated by commas): ')).split(', ');
let output_filename = await termAPI.prompt('Output filename? ')
let output_mimetype = await termAPI.prompt('Output mimetype? ');

ffmpeg.setLogger(({type, message}) => {
	termAPI.write(`[${type}] ${message}\r\n`)
})
await ffmpeg.run(...ffmpeg_args);

// termAPI.OSComms.setStorageKey(termAPI.resolvePath(folder, output_filename), JSON.stringify(
// 	new Uint8Array(
// 		ffmpeg.FS('readFile',output_filename)
// 	)
// ));
let file = ffmpeg.FS('readFile',output_filename);

let blob = new Blob([file],{type: output_mimetype});

let url = URL.createObjectURL(blob);

termAPI.write('\r\nThe video has been processed successfully! here\'s the url: '+url);
