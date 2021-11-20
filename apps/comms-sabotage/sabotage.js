for (let comm in termAPI.OSComms) {
	termAPI.OSComms[comm] = function() {
		throw new Error("Communications are sabotaged!");
	}
}
termAPI.write("Communications sabotaged! Try to reboot.");