let cpy = await termAPI.loadModule('cpython');
console.log(cpy)
cpy.runPython("print('hello world from cpython!');");
