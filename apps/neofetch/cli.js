// 19 lines
// ^ ignore this

let logo = await termAPI.getFileFromPackage(pkgId, "./logo.txt");
let fullduck = `${termAPI.getUsername()}@${termAPI.getHostname()}`
termAPI.write(termAPI.toCRLF(logo));
//termAPI.write('This package is ducked up')
/*
printer.next(`\x1b[32m${fullduck}\x1b[0m`);
printer.next("-".repeat(fullduck.length))
printer.next(`\x1b[33mOS:\x1b[0m UDN Systems`);
printer.next(`\x1b[33mKernel:\x1b[0m Brython`);
printer.next(`\x1b[33mUptime:\x1b[0m ? minutes`);
printer.next(`\x1b[33mPackages:\x1b[0m ${Object.keys(localStorage).filter(x => x.startsWith('/pkg/')).length}`);

printer.return();
*/