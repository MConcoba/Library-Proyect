'use strict';

var Book = require('../models/book.model');
var Magazine = require('../models/magazine.model');
var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
require('dotenv').config();
const util = require('./genereatesParams');

const createAdmin = async () => {
	const user = User();
	user.name = 'Administrador';
	user.userName = 'admin';
	user.role = 'admin';

	let userExist = await User.findOne({
		$or: [{ userName: 'admin' }, { role: 'admin' }],
	});
	if (userExist) {
		return { message: 'User alredy exists' };
	} else {
		let hash = await bcrypt.hashSync('admin', null, null);
		user.password = hash;

		let accountCreated = await user.save();
		if (!accountCreated) return { menssage: 'Error creating account' };
		else {
			return { accountCreated };
		}
	}
};

const createUser1 = async () => {
	const user = User();
	user.carnet = '2018551';
	user.name = 'Manuel Alessandro';
	user.lastName = 'Concoba Núñez';
	user.role = 'estudiante';
	user.amount_book_borrowed = 0;
	user.amount_magazine_borrowed = 0;
	user.password = '123abc';

	user.userName = util.generateUsername('Manuel', 'Concoba', '2018551');
	user.email = util.generateEmail('Manuel', 'Concoba', '2018551');

	let userExist = await User.findOne({
		$or: [{ name: 'Manuel' }, { carnet: '2018551' }],
	});
	if (userExist) {
		return { message: 'User alredy exists' };
	} else {
		/* let hash = await bcrypt.hashSync('abcd123', null, null);
		user.password = hash; */

		let accountCreated = await user.save();
		if (!accountCreated) return { menssage: 'Error creating account' };
		else {
			return { accountCreated };
		}
	}
};

const createUser2 = async () => {
	const user = User();
	user.dpi = '179510850101';
	user.name = 'Juan';
	user.lastName = 'Aguilar';
	user.role = 'catedratico';
	user.amount_book_borrowed = 0;
	user.amount_magazine_borrowed = 0;
	user.password = '123abc';

	user.userName = util.generateUsernameCatedratico('Juan', 'Aguilar');
	user.email = util.generateEmailCatedratico('Juan', 'Aguilar');

	let userExist = await User.findOne({
		$or: [{ name: 'Juan' }, { dpi: '179510850101' }],
	});
	if (userExist) {
		return { message: 'User alredy exists' };
	} else {
		/* let hash = await bcrypt.hashSync('abcd123', null, null);
		user.password = hash; */

		let accountCreated = await user.save();
		if (!accountCreated) return { menssage: 'Error creating account' };
		else {
			return { accountCreated };
		}
	}
};

const createUser3 = async () => {
	const user = User();
	user.carnet = '2021159';
	user.name = 'Antonio';
	user.lastName = 'Tomas';
	user.role = 'estudiante';
	user.amount_book_borrowed = 0;
	user.amount_magazine_borrowed = 0;
	user.password = '123abc';

	user.userName = util.generateUsername('Antonio', 'Tomas', '2021159');
	user.email = util.generateEmail('Antonio', 'Tomas', '2021159');

	let userExist = await User.findOne({
		$or: [{ name: 'Antonio' }, { carnet: '2021159' }],
	});
	if (userExist) {
		return { message: 'User alredy exists' };
	} else {
		/* let hash = await bcrypt.hashSync('abcd123', null, null);
		user.password = hash; */

		let accountCreated = await user.save();
		if (!accountCreated) return { menssage: 'Error creating account' };
		else {
			return { accountCreated };
		}
	}
};

const createUser4 = async () => {
	const user = User();
	user.carnet = '352197980101';
	user.name = 'Marco';
	user.lastName = 'Garcia';
	user.role = 'catedractico';
	user.amount_book_borrowed = 0;
	user.amount_magazine_borrowed = 0;
	user.password = '123abc';

	user.userName = util.generateUsernameCatedratico('Marco', 'Garcia');
	user.email = util.generateEmailCatedratico('Marco', 'Garcia');

	let userExist = await User.findOne({
		$or: [{ name: 'Marco' }, { carnet: '352197980101' }],
	});
	if (userExist) {
		return { message: 'User alredy exists' };
	} else {
		/* let hash = await bcrypt.hashSync('abcd123', null, null);
		user.password = hash; */

		let accountCreated = await user.save();
		if (!accountCreated) return { menssage: 'Error creating account' };
		else {
			return { accountCreated };
		}
	}
};

const createUser5 = async () => {
	const user = User();
	user.carnet = '2021123';
	user.name = 'Pancracio';
	user.lastName = 'Tamarindo';
	user.role = 'estudiante';
	user.amount_book_borrowed = 0;
	user.amount_magazine_borrowed = 0;
	user.password = '123abc';

	user.userName = util.generateUsername('Pancracio', 'Tamarindo', '2021123');
	user.email = util.generateEmail('Pancracio', 'Tamarindo', '2021123');

	let userExist = await User.findOne({
		$or: [{ name: 'Pancracio' }, { carnet: '2021123' }],
	});
	if (userExist) {
		return { message: 'User alredy exists' };
	} else {
		/* let hash = await bcrypt.hashSync('abcd123', null, null);
		user.password = hash; */

		let accountCreated = await user.save();
		if (!accountCreated) return { menssage: 'Error creating account' };
		else {
			return { accountCreated };
		}
	}
};

const createBook1 = async () => {
	const book = Book();
	book.author = 'William Shakespeare';
	book.title = 'Rome y Julieta';
	book.edicion = 'Francisco de Robles';
	book.keywords = ['-Parodia', '-Sátira', '-Novela-picaresca', '-Farsa', '-Novela-gráfica', '-Ficción-de-aventuras'];
	book.description = 'Es una novela escrita por el español Miguel de Cervantes Saavedra.';
	book.topics = ['-Parodia', '-Sátira', '-Novela-picaresca', '-Farsa', '-Novela-gráfica', '-Ficción-de-aventuras'];
	book.copies = 50;
	book.available = 45;

	let bookExist = await Book.find({
		$or: [{ title: book.title }, { author: book.author }],
	});
	if (bookExist && bookExist.length >= 1) return { message: 'Book alredy exists' };
	else {
		let bookSave = await book.save();
		if (!bookSave) return { menssage: 'Error register book' };
		else {
			return { bookSave };
		}
	}
};

const createBook2 = async () => {
	const book = Book();
	book.author = 'Miguel de Cervantes';
	book.title = 'Don Quijote de la Mancha';
	book.edicion = 'Francisco de Robles';
	book.keywords = ['-Parodia', '-Sátira', '-Novela-picaresca', '-Farsa', '-Novela-gráfica', '-Ficción-de-aventuras'];
	book.description = 'Es una novela escrita por el español Miguel de Cervantes Saavedra.';
	book.topics = ['-Parodia', '-Sátira', '-Novela-picaresca', '-Farsa', '-Novela-gráfica', '-Ficción-de-aventuras'];
	book.copies = 50;
	book.available = 20;

	let bookExist = await Book.find({
		$or: [{ title: book.title }, { author: book.author }],
	});
	if (bookExist && bookExist.length >= 1) return { message: 'Book alredy exists' };
	else {
		let bookSave = await book.save();
		if (!bookSave) return { menssage: 'Error register book' };
		else {
			return { bookSave };
		}
	}
};

const createBook3 = async () => {
	const book = Book();
	book.author = 'José Milla y Vidaurre';
	book.title = 'La hija del Adelantado';
	book.edicion = 'Dirección General Inglaterra';
	book.keywords = ['-Trajedia', '-Romance'];
	book.description =
		'Cuenta la historia de dos jóvenes enamorados que, a pesar de la oposición de sus familias, rivales entre sí, se enamoran';
	book.topics = ['-Amor-Pohibido', '-Romance', '-Trajedia'];
	book.copies = 150;
	book.available = 20;

	let bookExist = await Book.find({
		$or: [{ title: book.title }, { author: book.author }],
	});
	if (bookExist && bookExist.length >= 1) return { message: 'Book alredy exists' };
	else {
		let bookSave = await book.save();
		if (!bookSave) return { menssage: 'Error register book' };
		else {
			return { bookSave };
		}
	}
};

const createBook4 = async () => {
	const book = Book();
	book.author = 'Ana Frank';
	book.title = 'Het Achterhuis (Diario de Ana Frank)';
	book.edicion = 'Garbo';
	book.keywords = ['-Autobiografía', '-Biografía'];
	book.description =
		'Se relata la historia de una adolescente con su familia alemana de origen judío, en Ámsterdam durante la Segunda Guerra Mundial hasta que fue descubierta.';

	book.topics = ['-Segunda Guerra Mundial', '-Países-Bajos-en-la-Segunda-Guerra-Mundial'];
	book.copies = 35;
	book.available = 30;

	let bookExist = await Book.find({
		$or: [{ title: book.title }, { author: book.author }],
	});
	if (bookExist && bookExist.length >= 1) return { message: 'Book alredy exists' };
	else {
		let bookSave = await book.save();
		if (!bookSave) return { menssage: 'Error register book' };
		else {
			return { bookSave };
		}
	}
};

const createMagazine1 = async () => {
	const magazine = Magazine();
	magazine.author = 'Universidad del Valle de Guatelama';
	magazine.title = 'RedLE';
	magazine.edicion = 'RedLEI: Una apuesta regional por la Lectoescritura inicial';
	magazine.description =
		'Su propósito principal es la formación de capacidades para la producción de investigación contextualizada';
	magazine.frequencyActs = 'Menusual';
	magazine.specimens = 39;
	magazine.keywords = ['-Ciencia', '-Investigacion'];

	magazine.topics = ['-Investigacion', '-Ciencia', '-Guatemala'];
	magazine.copies = 50;
	magazine.available = 45;

	let magazineExist = await Magazine.find({
		$or: [{ edicion: magazine.edicion }],
	});
	if (magazineExist && magazineExist.length >= 1) return { message: 'Magazine alredy exists' };
	else {
		let magazineSave = await magazine.save();
		if (!magazineSave) return { menssage: 'Error register magazine' };
		else {
			return { magazineSave };
		}
	}
};

const createMagazine2 = async () => {
	const magazine = Magazine();
	magazine.author = 'Universidad del Valle de Guatelama';
	magazine.title = 'RedLE';
	magazine.edicion = 'RedLEI: Una apuesta regional por la Lectoescritura inicial';
	magazine.description =
		'Su propósito principal es la formación de capacidades para la producción de investigación contextualizada';
	magazine.frequencyActs = 'Menusual';
	magazine.specimens = 39;
	magazine.keywords = [
		'-Parodia',
		'-Sátira',
		'-Novela-picaresca',
		'-Farsa',
		'-Novela-gráfica',
		'-Ficción-de-aventuras',
	];

	magazine.topics = [
		'-Parodia',
		'-Sátira',
		'-Novela-picaresca',
		'-Farsa',
		'-Novela-gráfica',
		'-Ficción-de-aventuras',
	];
	magazine.copies = 50;
	magazine.available = 45;

	let magazineExist = await Magazine.find({
		$or: [{ edicion: magazine.edicion }],
	});
	if (magazineExist && magazineExist.length >= 1) return { message: 'Magazine alredy exists' };
	else {
		let magazineSave = await magazine.save();
		if (!magazineSave) return { menssage: 'Error register magazine' };
		else {
			return { magazineSave };
		}
	}
};

const createMagazine3 = async () => {
	const magazine = Magazine();
	magazine.author = 'Universidad del Valle de Guatelama';
	magazine.title = 'RedLE';
	magazine.edicion = 'RedLEI: Una apuesta regional por la Lectoescritura inicial';
	magazine.description =
		'Su propósito principal es la formación de capacidades para la producción de investigación contextualizada';
	magazine.frequencyActs = 'Menusual';
	magazine.specimens = 39;
	magazine.keywords = [
		'-Parodia',
		'-Sátira',
		'-Novela-picaresca',
		'-Farsa',
		'-Novela-gráfica',
		'-Ficción-de-aventuras',
	];

	magazine.topics = [
		'-Parodia',
		'-Sátira',
		'-Novela-picaresca',
		'-Farsa',
		'-Novela-gráfica',
		'-Ficción-de-aventuras',
	];
	magazine.copies = 50;
	magazine.available = 45;

	let magazineExist = await Magazine.find({
		$or: [{ edicion: magazine.edicion }],
	});
	if (magazineExist && magazineExist.length >= 1) return { message: 'Magazine alredy exists' };
	else {
		let magazineSave = await magazine.save();
		if (!magazineSave) return { menssage: 'Error register magazine' };
		else {
			return { magazineSave };
		}
	}
};

const createMagazine4 = async () => {
	const magazine = Magazine();
	magazine.author = 'Universidad del Valle de Guatelama';
	magazine.title = 'RedLE';
	magazine.edicion = 'RedLEI: Una apuesta regional por la Lectoescritura inicial';
	magazine.description =
		'Su propósito principal es la formación de capacidades para la producción de investigación contextualizada';
	magazine.frequencyActs = 'Menusual';
	magazine.specimens = 39;
	magazine.keywords = [
		'-Parodia',
		'-Sátira',
		'-Novela-picaresca',
		'-Farsa',
		'-Novela-gráfica',
		'-Ficción-de-aventuras',
	];

	magazine.topics = [
		'-Parodia',
		'-Sátira',
		'-Novela-picaresca',
		'-Farsa',
		'-Novela-gráfica',
		'-Ficción-de-aventuras',
	];
	magazine.copies = 50;
	magazine.available = 45;

	let magazineExist = await Magazine.find({
		$or: [{ edicion: magazine.edicion }],
	});
	if (magazineExist && magazineExist.length >= 1) return { message: 'Magazine alredy exists' };
	else {
		let magazineSave = await magazine.save();
		if (!magazineSave) return { menssage: 'Error register magazine' };
		else {
			return { magazineSave };
		}
	}
};

module.exports = {
	createAdmin,
	createUser1,
	createUser2,
	createUser3,
	createUser4,
	createUser5,
	createBook1,
	createBook2,
	createBook3,
	createBook4,
	createMagazine1,
	createMagazine2,
	createMagazine3,
	createMagazine4,
};
