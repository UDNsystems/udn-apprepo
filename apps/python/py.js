// run evalpy
eval(await termAPI.fs.get('/pkg/python/evalpy.js'));

termAPI.write('Brython 3.9.0 on udn-linux64\r\nType "help", "copyright", "credits" or "license" for more information.\r\n');

// main loop
while(true) {
	let input = await termAPI.prompt('>>> ');
	if (input === "copyright") {
		termAPI.write(termAPI.toCRLF`Copyright (c) 2001-2021 Python Software Foundation.
All Rights Reserved.

Copyright (c) 2000 BeOpen.com.
All Rights Reserved.

Copyright (c) 1995-2001 Corporation for National Research Initiatives.
All Rights Reserved.

Copyright (c) 1991-1995 Stichting Mathematisch Centrum, Amsterdam.
All Rights Reserved.
`);
		continue;
	}
	if (input === "credits") {
		termAPI.write(termAPI.toCRLF`    Thanks to CWI, CNRI, BeOpen.com, Zope Corporation and a cast of thousands
    for supporting Python development.  See www.python.org for more information.
`);
		continue;
	}
	if (input === "license") {
		termAPI.write(termAPI.toCRLF`Type license() to see the full license text
`);
		continue;
	}
	if (input.match(/license\((.*)?\);?/)) {
		termAPI.write((await termAPI.fs.get('/pkg/python/license.txt')).replace(/\n/g,"\r\n"));
		continue;
	}
	if (input.match(/exit\(\);?/)) {
		break;
	}
	if (input === "help") {
		termAPI.write('Type help() for interactive help, or help(object) for help about object.\r\n');
		continue;
	}
	if (input.match(/help\((.*)?\);?/)) {
		termAPI.write('Unsupported\r\n');
		continue;
	}
	try {
		let output = await evalPy(input);
		term.write(output+"\r\n");
	} catch(err) {
		// term.write('\x1b[0;31m'+ err.toString().replace(/\n/g, '\r\n')+'\x1b[0m\r\n');
    term.write('\x1b[0;31m'+err.toString()+'\x1b[0m\r\n');
	}
	

}
