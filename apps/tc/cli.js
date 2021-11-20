// load remoteLS
eval(await termAPI.getFileFromPackage(pkgId, "./rls.js"));

let args = termAPI.getArguments(line);
let option = args[0];
let optArg = args[1];
let remote_cfg_url = 'https://tccaptcha.pcprojects.tk/captcha_remote_cfg'
if (option) {
	if (option.match(/-h|--help/)) {
		return termAPI.write(termAPI.toCRLF`tcCAPTCHA CLI v1.0.0
usage:
	tc [options]
options:
	-s, --settings - opens settings
	-d=<on/off>, --dark-mode=<on/off> - turns darkmode on or off
	-p, --password <password> - sets your password (leave blank to remove password)`)
	}
	if (option.match(/--settings|-s/)) {
		return termAPI.OSComms.openIframe("https://tccaptcha.pcprojects.tk/captchaSettings","tcCAPTCHA settings",600,500)
	}
	if (option.match(/^(--dark-mode|-d)=(?<switch>on|off)/)) {
		let matches = option.match(/^(--dark-mode|-d)=(?<switch>on|off)/);
		let isOn = matches.groups.switch === "on";
		remoteLS(remote_cfg_url).then(tc => {
			tc
				.setItem('dark', isOn.toString())
				.end();
		});
		return
	}
	if (option.match(/^(--password|-p)/)) {
		return remoteLS(remote_cfg_url).then(tc => {
			if (optArg) {
				return tc.setItem('setPassword', optArg).end();
			}
			return tc.removeItem('setPassword').end();

		})
	}
}

//let token = "DHUI38JS";
let token = await termAPI.getFileFromPackage(pkgId, "./token.txt")
let sparams = new URLSearchParams()
sparams.append('token',token);

let url = "https://tccaptcha.pcprojects.tk/captcha?"+sparams.toString();

termAPI.OSComms.openIframe(url, "tcCAPTCHA", 264, 79);
