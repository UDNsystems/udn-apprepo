let [ename] = termAPI.getArguments(line);
let emoji = JSON.parse(await termAPI.getFileFromPackage(pkgId, "./emoji.json"));

termAPI.write(''+emoji[ename]);
