importScripts("https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js");

async function loadPyodideDuck() {
  self.pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
		stdin: () => {return 'stdin is not avaliable'},
		stdout: (x) => {
			if (x === "Python initialization complete") return;
			self.postMessage({ event: 'stdout', data: x });

		},
		stderr: x => {
			self.postMessage({ event: 'stderr', data: x });
		}
  });
	//#region custom libs
	let requests_module = {
		get(url) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, false);
			let headers = pyodide.globals.get('dict')();

			xhr.send(null); 
			return {
				text: xhr.responseText,
				status_code: xhr.status,
				json() {
					var jsonduck = pyodide.global.get('dict')();
					var pjson = JSON.parse(this.text);
					for (let key in pjson) {
						jsonduck.set(key, pjson[key]);
					}
					return jsonduck;
				}
			}
		}
	};
	pyodide.registerJsModule("requests", requests_module);
	//#endregion
}
let pyodideReadyPromise = loadPyodideDuck();

self.onmessage = async (event) => {
	await pyodideReadyPromise;
	if (event.data.loadLib) {
		return pyodide.loadPackage(event.data.loadLib);
	}
	if (event.data.mkdirFS) {
		return self.pyodide.FS.mkdir(event.data.mkdirFS);
	}
	if (event.data.writeFS) {
		let [filename, data] = event.data.writeFS;
		console.log('writing fs',filename,data);
		self.pyodide.FS.writeFile(filename, data);
		return;
	}
  // make sure loading is done
  
  // Don't bother yet with this line, suppose our API is built in such a way:
  const { python, ...context } = event.data;
  // The worker copies the context in its own "memory" (an object mapping name to values)
  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }
  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    await self.pyodide.loadPackagesFromImports(python);
    let results = await self.pyodide.runPythonAsync(python);
    self.postMessage({ event: 'result', results });
  } catch (error) {
    self.postMessage({ event: 'error', error: error.message });
  }
};