const bcrypt = require('bcryptjs');

const generatePassword = async (password) => {
	return await new Promise((res, rej) => {
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) rej(err);
			res(hash);
		});
	});
};

function generateUsername(name, lastName, codigo) {
	var nombre = name.slice(0, 1);
	var apellido = lastName.split(' ')[0];
	var userName = nombre + apellido + '-' + codigo;

	return userName.toLocaleLowerCase();
}

function generateUsernameCatedratico(name, lastName) {
	var nombre = name.slice(0, 1);
	var apellido = lastName.split(' ')[0];
	var userName = nombre + apellido;

	return userName.toLocaleLowerCase();
}

function generateEmail(name, lastName, codigo) {
	var nombre = name.slice(0, 1);
	var apellido = lastName.split(' ')[0];
	var email = nombre + apellido + '-' + codigo + '@kinal.edu.gt';

	return email.toLocaleLowerCase();
}

function generateEmailCatedratico(name, lastName) {
	var nombre = name.slice(0, 1);
	var apellido = lastName.split(' ')[0];
	var email = nombre + apellido + '@kinal.org.gt';

	return email.toLocaleLowerCase();
}

function password() {
	var caracteres = 'abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789';
	var contraseña = '';
	for (i = 0; i < 8; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));

	return contraseña;
}

module.exports = { generateUsername, generateUsernameCatedratico, generateEmail, generateEmailCatedratico, password };
