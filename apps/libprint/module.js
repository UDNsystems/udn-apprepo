module.exports = function print(text) {
	return termAPI.write(termAPI.toCRLF(text)+"\r\n")
}