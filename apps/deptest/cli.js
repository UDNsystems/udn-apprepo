let text = await termAPI.getFileFromPackage(pkgId, "./text.txt");
console.log(text);
termAPI.write(text);