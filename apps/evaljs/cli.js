//evaljs Version 0.1.0
var arg = termAPI.getArguments(line).join(" ")
try {
termAPI.write("Returned: " + eval(arg))
}catch(err) {termAPI.write(err.toString())}
//This package was made by Magestick