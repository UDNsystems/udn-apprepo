let liblang = await termAPI.loadModule('liblang');
let udnlang = await termAPI.OSComms.getStorageKey("language");
module.exports = {
	syslang: udnlang,
	get isAdaptEnabled() {
		return !!localStorage.getItem('adapt');
	},
	init(langarr) {
		let langobj = Object.fromEntries(langarr.map(x => [x.name, x]))
		return {
			syslang: this.syslang,
			langobj,
			translate(id) {
				if (!this.langobj[this.syslang]) return `translation.${id.replace(/ /g,"_")}`;
				return this.langobj[this.syslang].translate(id);
			}
		}
	},
	Translation: (...x) => {return new liblang.Language(...x)}
}