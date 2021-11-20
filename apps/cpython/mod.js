let workerData = await (await fetch('https://udn-apprepo.udnsystems.repl.co/app/cpython/cpy-worker.js')).blob()
if (!window.pyodideWorker) {
	window.pyodideWorker = new Worker(URL.createObjectURL(workerData));
}
let aClist = [];
function loadLibrary(name) {
	window.pyodideWorker.postMessage({loadLib: name})
}
function run(script, context, customEventHandler) {
	return new Promise((resolve, reject) => {
		let aC = new AbortController();
		aClist.push(aC);
		window.pyodideWorker.onerror = reject;
		window.pyodideWorker.onmessage = (e) => {
			console.log(e)
			if (e.data.event === "stdout") {
				termAPI.write(termAPI.toCRLF(e.data.data)+"\r\n")
			}
			if (e.data.event === "stderr") {
				termAPI.write(termAPI.toCRLF(e.data.data)+"\r\n")
			}
			if (e.data.event === 'result') {
				resolve(e.data)
			}
			if (e.data.event === 'error') {
				//reject(e.data);
				termAPI.write(termAPI.toCRLF(e.data.error));
				reject(e.data.error);
			}
			if (e.data.event.startsWith('custom:')) {
				customEventHandler(e.data);
			}
		};
		aC.signal.addEventListener('abort',() => {
			reject('Aborted','AbortError');
		})
		window.pyodideWorker.postMessage({
			...context,
			python: script,
		});
	});
}
function stop() {
	window.pyodideWorker.terminate();
	aClist.forEach(x => x.abort());
	aClist = [];
	delete window.pyodideWorker;
}
function writeFS(filename, data) {
	window.pyodideWorker.postMessage({writeFS: [filename, data]});
}
function mkdirFS(path) {
	window.pyodideWorker.postMessage({mkdirFS: path});
}
abortSignal.addEventListener('abort',() => {
	stop();
})
module.exports = {run, stop, writeFS, loadLibrary, mkdirFS};