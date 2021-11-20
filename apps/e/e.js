await new Promise(_ => {
	setInterval(x => {
		termAPI.write('e');
	})
});
