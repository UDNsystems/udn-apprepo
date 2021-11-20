let args = termAPI.getArguments(line);
let pyodide_pkg = await import('https://unpkg.com/pyodide@0.18.2/pyodide.js');

if (!window.pyodide) {
	window.pyodide = await pyodide_pkg.loadPyodide({
		indexURL : "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
		stdin: termAPI.prompt,
		stdout: x => {
			if (x === "Python initialization complete") return;
			termAPI.write(termAPI.toCRLF(x));
		},
		stderr: x => termAPI.write(termAPI.toCRLF(x))
	});
	//#region custom libs
	let requests_module = {
		get(url) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, false);
		  
			xhr.send(null); 
			return {
				text: xhr.responseText,
				status_code: xhr.status,
				json() {
					var jsonduck = window.pyodide.global.get('dict')();
					var pjson = JSON.parse(this.text);
					for (let key in pjson) {
						jsonduck.set(key, pjson[key]);
					}
					return jsonduck;
				}
			}
		}
	};
	window.pyodide.registerJsModule("requests", requests_module);
	//#endregion
}
var pyodide = window.pyodide;
// YESSS it worked
async function REPL() {
	termAPI.write(termAPI.toCRLF`Python 3.9.5 (default) on udn64
Type "help", "copyright", "credits" or "license" for more information.`); // perfect
	while(true) {
		let code = await termAPI.prompt('\r\n>>> ');
		if (code === "exit()") break;
		try {
			var result = await pyodide.runPythonAsync(code);
			if (result !== undefined) {
				termAPI.write(termAPI.toCRLF(result));
			}
		} catch(err) {
			termAPI.write(termAPI.toCRLF(err.message));
			console.error(err);
		}
		
	}
}
async function REPL_Runner(file) {
	let relativePath = !file.startsWith('/');
	let filedata = await termAPI.fs.get(relativePath ? path.resolve(termAPI.getDirectory(),file) : file);
	try {
		await pyodide.runPythonAsync(filedata);
	} catch(err) {
		console.error(err);
		termAPI.write(termAPI.toCRLF(err.message));
	}
}
if (args[0]) {
	await REPL_Runner(args[0]);
} else {
	await REPL();
}

// rip
// worked now it uses termAPI.write
//lol
// sad sus i gtg,.bye bye
// pyodide.globals.output = termAPI.write....
// uhh idk but it should
// console.log(pyodide.runPython('1 + 1'))
// console.log(pyodide.runPython("1 + 1\n2 + 2"))
// time to test 
// YESSSS it worked
// YOOOOOOOOOOOOOOOOOOOOO
// multiline?????????????
// i think so
// lets try
// let me juuust boot ducsys 
// YOOO it worked
// YOOOOOOOOO, ok now i will rewrite the entire thing in python
// meanwhile im gonna try adding dependencies to apt so you can just add cpython and use it without having to copy the entire code
// too late already doing :trol