module.exports = {
	Language: class Language {
		constructor(name,pjson) {
			this.pjson = pjson;
			this.name = name;
		}
		translate(translationId) {
			if (!this.pjson[translationId]) return translationId;
			return this.pjson[translationId];
		}
	},
	parse(data) {
		function parseLine(text) {
			let lp = text.split('=');
			if (lp[1].startsWith('base64:')) {
				lp[1] = atob(lp[1].slice('base64:'.length));
			}
			return [
				lp[0],
				lp[1]
			]
		}
		const lines = data
			.replace(/#(.*)\n/g, "")
			.replace(/\n+/g, "\n")
			.split(/;\n|;/g);

		var newJSON = {};
		for (let line of lines) {
			if (line === "") continue;
			let res = parseLine(line);
			let name = res[0];
			let text = res[1];
			newJSON[name] = text;
		}
		return newJSON;
	},
	load(name, data) {
		let parsed = parse(data);

		return new this.Language(name, parsed);
	}
}