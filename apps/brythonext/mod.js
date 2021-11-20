let cpy = await termAPI.loadModule('cpython');
cpy.runPython('1 + 1 # just to init pyodide y\'know')
function bryexecpy(brycode){
  top.postMessage({
    event: "execpy",
    code: brycode
  }, "*");
}

module.exports = {
	init(){
    window.pyodide.globals.set("bryexecpy",bryexecpy);
  }
}