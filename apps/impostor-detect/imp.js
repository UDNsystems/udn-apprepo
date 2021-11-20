termAPI.write("Detecting Impostor (if you are not, you will get restarted)... ");
await new Promise(function(ok) {
	setTimeout(function() {
		ok("not dead on vitals")
	}, 3000)
})
try {
	termAPI.OSComms.reboot();
} catch {
	/* This user is impostor, he sabotaged comms! */
}
await new Promise(function(ok) {
	setTimeout(function() {
		ok("not dead on vitals")
	}, 1000)
})
termAPI.write("Impostor!");