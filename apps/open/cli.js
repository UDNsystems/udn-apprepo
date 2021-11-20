let args = termAPI.getArguments(line);
let filepath = termAPI.resolvePath(termAPI.getDirectory(), args[0])
let mimeType = "text/plain"
let width = 600;
let height = 400;
let pageTitle = filepath;
if (args.includes('-m')) {
	mimeType = args[args.indexOf('-m')+1]
}
if (args.includes('--mime')) {
	mimeType = args[args.indexOf('--mime')+1]
}

if (args.includes('--size')) {
	let [newWidth, newHeight] = args[args.indexOf('--size')+1].split('x');
	width = newWidth;
	height = newHeight;
}
if (args.includes('--title')) {
	pageTitle = args[args.indexOf('--title')+1]
}
let filedata = await termAPI.fs.get(filepath);
let code = `
(function() {
	let blob = new Blob([${JSON.stringify(filedata)}], {type: ${JSON.stringify(mimeType)}});

	let bloburltmp = URL.createObjectURL(blob);

	window.postMessage({event: 'openIframe', title: ${JSON.stringify(pageTitle)}, url: bloburltmp, width: ${JSON.stringify(width)}, height: ${JSON.stringify(height)}});
})();
`

//window.open(url);
top.postMessage({action: 'evalJS', code},"*")
//termAPI.OSComms.openIframe(url,filepath,width,height)
