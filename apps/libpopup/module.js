let evalpy = await termAPI.loadModule('evalpy');
module.exports = {
	TYPES: {
		warn: "Warning",
		error: "Error",
		info: "Info"
	},
	show(type, title, body) {
		evalpy(`Popup(${JSON.stringify(title)}, ${JSON.stringify(type)}, ${JSON.stringify(body)}`);
	}
}