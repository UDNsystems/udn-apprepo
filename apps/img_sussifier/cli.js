let args = termAPI.getArguments(line);
console.log('load 1')
let print = await termAPI.loadModule('libprint');
console.log('load 2')
let cpy = await termAPI.loadModule('cpython');
console.log('load 3')
let ffmpeg = await termAPI.loadModule('ffmpeg');
window.ffmpeg = ffmpeg;
cpy.loadLibrary(['pillow', 'numpy']);

if (args[0].match(/-h|--help/) || !args[0]) {
	return print(`img_sussifier for UDN systems v0.0.1 help

usage:
	sussify <imageURL>
syntax:
	<> - required
	[] - optional
options:
	imageURL - the image url you want to sussify`)
}

let suspy = await termAPI.getFileFromPackage(pkgId, "./sus.py")

print('downloading image...');

let img = new Uint8Array(await (await fetch(args[0])).arrayBuffer());

print('writing to fs...');

cpy.writeFS("input.png",img);

print('writing twerk images to fs...');

let twerk_imgs = {};

for (let i = 0; i < 6; i++) {
	twerk_imgs[i+'.png'] = await termAPI.getFileFromPackage(pkgId, "./twerk_imgs/"+i+".png");
}
cpy.mkdirFS("twerk_imgs")
for (let img in twerk_imgs) {
	cpy.writeFS("twerk_imgs/"+img,twerk_imgs[img]);
};

print('running script');
let isDone = false;

try {
	await cpy.run(suspy, undefined, async (ev) => {
		if (ev.event === "custom:ffmpeg-save-file") {
			ffmpeg.FS("writeFile",ev.filename, ev.data)
		}
		if (ev.event === "custom:run-ffmpeg") {
			await ffmpeg.run(...ev.args);
			let file = ffmpeg.FS("readFile","sussified.gif");
			let fileblob = new Blob([file],{type: 'image/gif'})
			let url = URL.createObjectURL(fileblob);
			termAPI.write('done! '+url);
			isDone = true;
		}
	});
} catch(err) {
	console.error(err);
}
await new Promise(resolve => {
	var duck = setInterval(_ => {
		if (isDone) {
			clearInterval(duck);
			resolve();
		}
	},100)
})