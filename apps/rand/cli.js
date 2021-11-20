/**
 * @syntax 
 * @description random number
 */
//let [max] = termAPI.getArguments(line);
let max = Number(await termAPI.prompt("maximum: "));

termAPI.write(`result: ${Math.floor(Math.random() * max)}`);
