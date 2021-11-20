// const numberset = "0123456789"
// class Lexer{
//   constructor(text){
//     this.text = text
//     this.index = 0;
//     this.currchar = text[0]
//     this.eof = false
//     this.tokens = this.makeTokens()
//   }
//   advance(text){
//     this.index += 1;
//     if(this.index>this.text.length){
//       termAPI.write(String(this.index))
//       termAPI.write(String(this.text.length))
//       this.index = -1;
//       this.eof = true
//       this.currchar = undefined;
//     } else {
//       this.eof = false
//       this.currchar = this.text[this.index]
//     }
//   }
//   makeTokens(){
//     var tokens = []
//     while(this.eof==false){
//       if(numberset.includes(this.currchar)){
//         tokens.push(new Token("NUMBER", this.convertToNumber())) 
//       }
//       this.advance()
//       termAPI.write("NEEEEXT")
//       termAPI.write(String(this.index))
//       termAPI.write(String(this.text.length))
//     }
//     termAPI.write(String(this.eof))
//     //termAPI.write(String(this.currchar))
//     return tokens
//   }
//   convertToNumber(){
//     var currnum = "";
//     var points = 0
//     var error = false;
//     while(!this.currchar==" "||!this.eof){
//       //termAPI.write(this.currchar)
//       termAPI.write(String(numberset.includes(this.currchar)))
//       if(numberset.includes(this.currchar)){
//         termAPI.write('includes!')
//         currnum = currnum + this.currchar
//       } else if(this.currchar == "."){
//         points++;
//         termAPI.write("A DECIMAL!!!")
//         if(points>1){
//           error = true;
//           termAPI.write("SUS, DUk!")
//           break
//         } else{
//           currnum = currnum + "."
//         }
//       }else{
//         termAPI.write("it appears its not in any!")
//       }
//       this.advance()
//     }
//     termAPI.write('stopp!')
//     return currnum
//   }
// }
// class Token{
//   constructor(type, value){
//     this.type = type
//     this.value = value
//   }
//   cts(){
//     if(this.value==undefined){
//       return "UDNS_TOKEN["+this.type+"]"
//     } else {
//       return "UDNS_TOKEN["+this.type+"]:"+this.value
//     }
//   }
// }
// termAPI.write("is duk?")
// var ducklexer = new Lexer("8s20 69 ");


// // narrator: here we see the monke called "e_" trying to figure out how the Javascript works
// // lmao
/*let pyodide_pkg = await import('https://unpkg.com/pyodide@0.18.2/pyodide.js');

if (!window.pyodide) {
	window.pyodide = await pyodide_pkg.loadPyodide({
		indexURL : "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
	});
}
var pyodide = window.pyodide;
pyodide.globals.output = termAPI.write
pyodide.runPython(localStorage.getItem("/pkg/UDNscript/uds.py"))*/
// removed because we now have dependencies so no need to have this
// just don't remove cpython from "dependencies" on manifest.json

let cpy = await termAPI.loadModule('cpython');
console.log(pkgId)
try {
	await cpy.run(
		await termAPI.getFileFromPackage(pkgId,'./uds.py')
	);

} catch(err) {
	console.error(err)
}
