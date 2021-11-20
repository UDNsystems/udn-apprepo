var languages = {
	sus: {
		UNLOADED: "Suslication susoaded.",
		OTHERAPPSCAN: "Suser suslications sus sus sus sus susverter susls.",
		DOCS: "to-hex v1.2 - sus susoding susverter\r\nsusge:\r\n\tconvert [suse] [susuments (su susded)]\r\nsuses:\r\n\ttoHEX (susds susument) - Susverts sus sust su SUS.\r\n\tfromHEX (susds susument) - Susverts sus SUS su sust.\r\n\ttoBIN (susds susument) - Susverts sus sust sus susary.\r\n\tfromBIN (susds susument) - Susverts sus susary su sust.\r\n\tno-unload - Suss sus susoad sus susls, susing suss s sustle susd susgram sus suser susgrams.\r\n\tunload - Susoads sus susls. Sus su suso susd su susmand sust suss sushing (no-op).\r\n\thelp - Susws sus suses sus susrything sus suss susgram. Suso --help su -h sus su susd.",
		INV: "Susalid susument. Sus help su suse su sus sus suses.",
		NOTEXT: "Su su, susre's su sust!",
		NOHEX: "Su su, susre's su SUS!",
		NOBIN: "Su su, susre's su susary suse!",
		SEPBY: "susarated su _"
	},
	english: {
		UNLOADED: "Application unloaded.",
		OTHERAPPSCAN: "Other applications now can use the converter tools.",
		DOCS: "to-hex v1.2 - the encoding converter\r\nusage:\r\n\tconvert [mode] [arguments (if needed)]\r\nmodes:\r\n\ttoHEX (needs argument) - Converts the text to HEX.\r\n\tfromHEX (needs argument) - Converts the HEX to text.\r\n\ttoBIN (needs argument) - Converts the text to binary.\r\n\tfromBIN (needs argument) - Converts the binary to text.\r\n\tno-unload - Does not unload the tools, making this a little good program for other programs.\r\n\tunload - Unloads the tools. Can be also used as command that does nothing (no-op).\r\n\thelp - Shows the modes and everything for this program. Also --help or -h can be used.",
		INV: "Invalid argument. Use help as mode to see the modes.",
		NOTEXT: "Uh oh, there's no text!",
		NOHEX: "Uh oh, there's no HEX!",
		NOBIN: "Uh oh, there's no binary code!",
		SEPBY: "separated by _"
	},
	duck: {
		UNLOADED: "Duckication duckaded.",
		OTHERAPPSCAN: "Duckr duckications duc duc duc duc duckerter ducks.",
		DOCS: "to-hex v1.2 - duc duckding duckerter\r\nducke:\r\n\tconvert [duck] [duckments (du ducked)]\r\nducks:\r\n\ttoHEX (ducks duckment) - Duckerts duc duck du DUC.\r\n\tfromHEX (ducks duckment) - Duckerts duc DUC du duck.\r\n\ttoBIN (ducks duckment) - Duckerts duc duck du duckry.\r\n\tfromBIN (ducks duckment) - Duckerts duc duckry du duck.\r\n\tno-unload - Duck duc duckad duc ducks, duckng duck d duckle duck duckram duc duckr duckrams.\r\n\tunload - Duckads duc ducks. Duc du duck duck du duckmand duck duck ducking (no-op).\r\n\thelp - Ducks duc ducks duc duckything duc duck duckram. Duck --help du -h duc du duck.",
		INV: "Ducklid duckment. Duc help du duck du duc duc ducks.",
		NOTEXT: "Du du, ducke's du duck!",
		NOHEX: "Du du, ducke's du DUC!",
		NOBIN: "Du du, ducke's du duckry duck!",
		SEPBY: "duckrated du _"
	},
	russian: {
		UNLOADED: "Приложение разгружено.",
		OTHERAPPSCAN: "Другие приложения теперь могут использовать функции конвертера.",
		DOCS: "to-hex v1.2 - конвертер кодирования.\r\nиспользование:\r\n\tconvert [режим] [аргументы (если необходимо)]\r\nрежимы:\r\n\ttoHEX (необходим аргумент) - Конвертирует текст в HEX.\r\n\tfromHEX (необходим аргумент) - Конвертирует HEX в текст.\r\n\ttoBIN (необходим аргумент) - Конвертирует текст в двоичный код.\r\n\tfromBIN (необходим аргумент) - Конвертирует двоичный код в текст.\r\n\tno-unload - Не разгружает утилиты, делая это маленькой хорошой программой для других программ.\r\n\tunload - Разгружает утилиты, также может быть использовано как команда которая делает ничего (no-op).\r\n\thelp - Показывает режимы и всё для этой программы. Также могут быть использованы --help или -h.",
		INV: "Неверный аргумент. Используйте help как режим чтобы увидеть все режимы.",
		NOTEXT: "О нет, здесь нет текста!",
		NOHEX: "О нет, здесь нет HEX!",
		NOBIN: "О нет, здесь нет двоичного кода!",
		SEPBY: "разделено _"
	}
};
try {
	var langExist = localStorage.getItem("adapt") ? languages.hasOwnProperty(await termAPI.OSComms.getStorageKey("language")) : true;
	var langset = localStorage.getItem("adapt") ? (langExist ? languages[await termAPI.OSComms.getStorageKey("language")] : languages["english"]) : languages["english"];
} catch {
	termAPI.write("Unspecified error while detecting language. Your communications may be sabotaged.\r\n");
	var langset = languages["english"]
}
var convertCMD = termAPI.getArguments(line);
String.prototype.toHEXCode = function(format = true, formatCharacter = " ") {
	var finalHex = "";
	var formatChar = format ? (formatCharacter ? formatCharacter : " ") : "";
	for (let char of this) {
		if (finalHex == "") {
			finalHex = char.charCodeAt().toString(16);
		} else {
			finalHex = finalHex + formatChar + char.charCodeAt().toString(16);
		}
	}
	return finalHex;
}
String.prototype.isHEXCode = function(split = " ") {
	var testAble = this.split(split).join("");
	var allowed = "1234567890ABCDEFabcdef";
	for (let char of testAble) {
		if (!allowed.includes(char)) return false;
	}
	return true;
}
String.prototype.fromHEXCode = function(formatted = " ") {
	if (!this.isHEXCode(formatted)) throw new TypeError("The detected string does not look like a HEX code.");
	if (!formatted) throw new TypeError("Cannot be transferred without formatting. Put a formatted argument (space is default for this).")
	var gets = [];
	var compgets = [];
	var convertAble = this.split(formatted);
	var converted = "";
	for (let sus of convertAble) {
		gets.push("0x" + sus);
	}
	for (let sus of gets) {
		compgets.push(eval(sus));
	}
	for (let sus of compgets) {
		converted = converted + String.fromCharCode(sus);
	}
	return converted;
}

String.prototype.toBinaryCode = function(format = true, formatCharacter = " ") {
	var finalHex = "";
	var formatChar = format ? (formatCharacter ? formatCharacter : " ") : "";
	for (let char of this) {
		if (finalHex == "") {
			finalHex = "0" + char.charCodeAt().toString(2);
		} else {
			finalHex = finalHex + formatChar + "0" + char.charCodeAt().toString(2);
		}
	}
	return finalHex;
}
String.prototype.isBinaryCode = function(split = " ") {
	var testAble = this.split(split).join("");
	var allowed = "01";
	for (let char of testAble) {
		if (!allowed.includes(char)) return false;
	}
	return true;
}
String.prototype.fromBinaryCode = function(formatted = " ") {
	if (!this.isBinaryCode(formatted)) throw new TypeError("The detected string does not look like a binary code.");
	if (!formatted) throw new TypeError("Cannot be transferred without formatting. Put a formatted argument (space is default for this).")
	var gets = [];
	var compgets = [];
	var convertAble = this.split(formatted);
	var converted = "";
	for (let sus of convertAble) {
		gets.push(sus.replace("0", ""));
	}
	for (let sus of gets) {
		converted = converted + String.fromCharCode(parseInt(sus, 2));
	}
	return converted;
}
if (convertCMD[0] == "toHEX") {
	if (convertCMD[1] == undefined) {
		termAPI.write(langset.NOTEXT + "\r\n");
	} else {
		termAPI.write(convertCMD[1].toHEXCode(true, "_") + " (" + langset.SEPBY + ")\r\n");
	}
} else if (convertCMD[0] == "fromHEX") {
	if (convertCMD[1] == undefined) {
		termAPI.write(langset.NOHEX + "\r\n");
	} else {
		termAPI.write(convertCMD[1].fromHEXCode("_") + "\r\n");
	}
} else if (convertCMD[0] == "toBIN") {
	if (convertCMD[1] == undefined) {
		termAPI.write(langset.NOTEXT + "\r\n");
	} else {
		termAPI.write(convertCMD[1].toBinaryCode(true, "_") + " (" + langset.SEPBY + ")\r\n");
	}
} else if (convertCMD[0] == "fromBIN") {
	if (convertCMD[1] == undefined) {
		termAPI.write(langset.NOBIN + "\r\n");
	} else {
		termAPI.write(convertCMD[1].fromBinaryCode("_") + "\r\n");
	}
} else if (convertCMD[0] == "help" || convertCMD[0] == "--help" || convertCMD[0] == "-h") {
	termAPI.write(langset.DOCS + "\r\n");
} else if (convertCMD[0] == "no-unload") {
	return termAPI.write(langset.OTHERAPPSCAN)
} else if (convertCMD[0] == "unload") {
	/* noop. */
} else {
	termAPI.write(langset.INV + "\r\n");
}
delete String.prototype.toHEXCode;
delete String.prototype.isHEXCode;
delete String.prototype.fromHEXCode;
delete String.prototype.toBinaryCode;
delete String.prototype.isBinaryCode;
delete String.prototype.fromBinaryCode;
termAPI.write(langset.UNLOADED)