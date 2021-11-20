let libadapt = await termAPI.loadModule('libadapt');
let print = await termAPI.loadModule('libprint');

if (!libadapt.isAdaptEnabled) return print('You need to enable adapt language!');

let adapt = libadapt.init([
	libadapt.Translation('english', {txt: 'english text'}),
	libadapt.Translation('dutch', {txt: 'dutch text'})
]);

print(adapt.translate('txt'));
