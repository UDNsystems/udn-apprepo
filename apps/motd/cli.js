let choice = (...arr) => arr[Math.floor(Math.random() * arr.length)];

let motd = choice(
	'have you done our homework?', 
	'reminder to try not to use nested if\'s',
	'you can always sus!',
	'hey, remember that meme?', 
	'if you are bored, check your trello board and try to work on some stuff',
	'As always, Free™!',
	"please don't steal our hard work", 
	"did you know some apps are in completely different repls?", 
	"use the app launcher to launch community-made apps!",
	"UDN has less people than HEXEc but it has far far better management. (and we don't eject people out without a reason or without warning them)", // lmao
	"Have you tried mispelling \"help\" as \"halp\" and sending it as a command?",
	"Type 'sus' and press enter for a very sus surprise!"
);

termAPI.write(motd);