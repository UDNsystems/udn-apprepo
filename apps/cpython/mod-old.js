let pyodide_pkg = await import('https://unpkg.com/pyodide@0.18.2/pyodide.js');

if (!window.pyodide) {
	window.pyodide = await pyodide_pkg.loadPyodide({
		indexURL : "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
		stdin: window.prompt,
		stdout: x => {
			if (x === "Python initialization complete") return;
			termAPI.write(termAPI.toCRLF(x));
		},
		stderr: x => termAPI.write(termAPI.toCRLF(x))
	});
}
var pyodide = window.pyodide;

module.exports = {
	runPython(x) {
		try {
			return pyodide.runPython(x);
		} catch(err) {
			termAPI.write(termAPI.toCRLF(err.message));
			console.error(err);

		}
	},
	runPythonAsync(x) {
		try {
			return pyodide.runPythonAsync(x);
		} catch(err) {
			termAPI.write(termAPI.toCRLF(err.message));
			console.error(err);
			
		}
	},
	addLibrary(name) {
		return pyodide.loadPackage(name);
	}
}