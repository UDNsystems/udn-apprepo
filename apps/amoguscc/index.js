window.Module = {
	print(data) {
		return termAPI.write(termAPI.toCRLF(data.toString())+"\r\n");
	},
	printErr(data) {
		console.log(JSON.stringify(data));
		return termAPI.write(termAPI.toCRLF(data.toString())+"\r\n");
	},
	onExit() {},
	noExitRuntime: false,
	"arguments": termAPI.getArguments(line)
}
// load module
;(() => {
	let s = document.createElement('script');
	s.src = "https://udn-apprepo.udnsystems.repl.co/app/amoguscc/a.out.js";
	document.body.appendChild(s);
})()
await new Promise(resolve => {
	Module.onExit = function() {
		resolve();
	}
});
