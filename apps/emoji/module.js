let emoji = JSON.parse(await termAPI.getFileFromPackage(pkgId, "./emoji.json"));
let discord = JSON.parse(await termAPI.getFileFromPackage(pkgId, "./discord.json"));

module.exports = {
	get(name) {
		return emoji[name];
	},
	text(...args) {
		return args.map(x => {
			if (typeof x !== "string") return x;
			discord.forEach(emoji => {
				if (x.includes(emoji.name)) {
					x = x.replace(emoji.name, emoji.value);
				}
			})
			return x;
		})
	}
}
