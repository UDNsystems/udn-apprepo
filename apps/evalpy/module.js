function evalPy(code) {
	return new Promise((resolve, reject) => {
		let oldM = window.onmessage;
		window.onmessage = function(ev) {
			if (ev.data.action === "evalPy") {
				window.onmessage = oldM;
				let json = JSON.parse(ev.data.data);
				if (json.error) {
					return reject(json.output);
				}
				return resolve(json.output);
			}
		}
		top.postMessage({
			action: 'evalPy',
			code
		},'*');
		
	})
}

module.exports = evalPy;