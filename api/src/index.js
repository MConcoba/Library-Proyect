'use estrict';

const mongoose = require('mongoose');
const app = require('./app');
const generateDate = require('./util/generateData');
mongoose.Promise = global.Promise;

mongoose
	.connect('mongodb://localhost:27017/DB_Library', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Conexion DataBase seccussfull');
		generateDate.createAdmin();

		generateDate.createUser1();
		generateDate.createUser2();
		generateDate.createUser3();
		generateDate.createUser4();
		generateDate.createUser5();

		generateDate.createBook1();
		generateDate.createBook2();
		generateDate.createBook3();
		generateDate.createBook4();

		generateDate.createMagazine1();
		generateDate.createMagazine2();
		generateDate.createMagazine3();
		generateDate.createMagazine4();
		app.set('port', process.env.PORT || 3000);
		app.listen(app.get('port'), () => {
			console.log(`The server is runing in the port: ${app.get('port')}`);
		});
	})
	.catch((err) => console.log(err));
