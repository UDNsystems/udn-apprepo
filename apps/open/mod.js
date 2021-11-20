module.exports = function open(filepath, mimeType = "text/plain", pageTitle, width = 600, height = 400) {
	if (!pageTitle) pageTitle = filepath;
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

}