'use strict';

var Book = require('../models/book.model');
var User = require('../models/user.model');

const newBook = async (req, res) => {
	var book = Book();
	var isAdmin = req.user.sub;
	var params = req.body;

	const confirmAdmin = await User.findOne({ _id: isAdmin });
	if (confirmAdmin.role == 'admin') {
		var paralabrasClaves = '-' + params.keywords.replace(/ /g, '-');
		var temas = '-' + params.topics.replace(/ /g, '-');
		if (params.copies) {
			book.author = params.author;
			book.title = params.title;
			book.edicion = params.edicion;
			book.keywords = paralabrasClaves.split(',');
			book.description = params.description;
			book.topics = temas.split(',');
			book.copies = params.copies;
			book.available = params.available;

			let bookExist = await Book.find({
				$or: [{ title: book.title }, { author: book.author }],
			});
			if (bookExist && bookExist.length >= 1) return res.status(200).send({ message: 'Book alredy exists' });
			else {
				let bookSave = await book.save();
				if (!bookSave) return res.status(200).send({ menssage: 'Error register book' });
				else {
					return res.status(202).send({ book: bookSave });
				}
			}
		} else {
			return res.status(200).send({ menssage: 'ERRO: the aviable is incorrect to the copies' });
		}
	} else {
		return res.status(200).send({ menssage: 'Access denied' });
	}
};

const getBooks = async (req, res) => {
	const booksList = await Book.find();
	if (!booksList) {
		return res.status(404).send({ menssage: 'ERROR: Book not exists' });
	} else {
		return res.status(202).send(booksList);
	}
};

const getBooksAviablesUser = async (req, res) => {
	var isAdmin = req.user.sub;
	const booksList = await Book.find({}, { _id: 1 });
	const userBook = await User.findOne({ _id: isAdmin });
	/* 	const booksList = await Book.find({ $nor: [{ _id: userBook.books_borrowed._id }] }); */
	if (!userBook) {
		return res.status(404).send({ menssage: 'ERROR: Book not exists' });
	} else {
		for (let x = 0; x < userBook.books_borrowed.length; x++) {
			if (userBook.books_borrowed[x].book != booksList) {
				const userBookAll = userBook.books_borrowed[x].book;
				const userBookAll2 = userBook.books_borrowed[++x].book;
				const userBookAll3 = userBook.books_borrowed[++x].book;
				const userBookAll4 = userBook.books_borrowed[++x].book;
				const booksList = await Book.find({
					$nor: [{ _id: userBookAll }, { _id: userBookAll2 }, { _id: userBookAll3 }, { _id: userBookAll4 }],
				});
				return res.status(202).send(booksList);
			}
			return res.status(202).send(booksList);
		}
	}
};

const getBooksLendUser = async (req, res) => {
	var isAdmin = req.user.sub;
	const booksList = await Book.find({}, { _id: 1 });
	const userBook = await User.findOne({ _id: isAdmin }).populate({
		path: 'books_borrowed.book',
	});
	/* 	const booksList = await Book.find({ $nor: [{ _id: userBook.books_borrowed._id }] }); */
	if (!userBook) {
		return res.status(404).send({ menssage: 'ERROR: Book not exists' });
	} else {
		return res.status(202).send(userBook.books_borrowed);
	}
};

const getBook = async (req, res) => {
	var bookId = req.params.idBook;

	const bookView = await Book.findOne({ _id: bookId });
	if (!bookView) {
		return res.status(404).send({ menssage: 'ERROR: Book not exists' });
	} else {
		return res.status(202).send(bookView);
	}
};

const updateBook = async (req, res) => {
	var isAdmin = req.user.sub;
	var params = req.body;
	var bookId = req.params.idBook;

	const confirmAdmin = await User.findOne({ _id: isAdmin });
	if (confirmAdmin.role == 'admin') {
		if (params.copies && params.available && params.keywords && params.topics) {
			const bookView = await Book.findOne({ _id: bookId });
			if (!bookView) {
				return res.status(404).send({ menssage: 'ERROR: Book not exists' });
			} else {
				const bookUpdated = await Book.findOneAndUpdate({ _id: bookId }, params, { new: true });
				if (!bookUpdated) {
					return res.status(404).send({ menssage: 'ERROR: Book not exists' });
				} else {
					return res.status(202).send(bookUpdated);
				}
			}
		} else if (!params.keywords || !params.keywords) {
			const bookView = await Book.findOne({ _id: bookId });
			if (!bookView) {
				return res.status(404).send({ menssage: 'ERROR: Book not exists' });
			} else {
				var k = params.keywords.split(', ').map(Number);
				var t = params.keywords.split(', ').map(Number);
				params.keywords = k;
				params.topics = t;

				const bookUpdated = await Book.findOneAndUpdate({ _id: bookId }, params, { new: true });
				if (!bookUpdated) {
					return res.status(404).send({ menssage: 'ERROR: Book not exists' });
				} else {
					return res.status(202).send(bookUpdated);
				}
			}
		}
	} else {
		return res.status(200).send({ menssage: 'Access denied' });
	}
};

const deleteBook = async (req, res) => {
	var isAdmin = req.user.sub;
	var bookId = req.params.idBook;

	const confirmAdmin = await User.findOne({ _id: isAdmin });
	if (confirmAdmin.role == 'admin') {
		const bookDelete = await Book.findOneAndDelete({ _id: bookId });
		if (!bookDelete) {
			return res.status(404).send({ menssage: 'ERROR: Book not exists' });
		} else {
			return res.status(202).send({ menssage: 'Book was successfully removed' });
		}
	} else {
		return res.status(200).send({ menssage: 'Access denied' });
	}
};

const searchTitle = async (req, res) => {
	var params = req.body;

	const bookFound = await Book.find({ title: { $regex: params.title, $options: 'i' } });
	if (!bookFound) {
		return res.status(404).send({ menssage: 'No match found in titles' });
	} else {
		return res.status(202).send(bookFound);
	}
};

const searchKeywords = async (req, res) => {
	var params = req.body;
	var paralabrasClaves = '-' + params.keywords.replace(/ /g, '-');

	const bookFound = await Book.find({ keywords: { $regex: paralabrasClaves, $options: 'i' } });
	if (!bookFound) {
		return res.status(404).send({ menssage: 'No match found in titles' });
	} else {
		return res.status(202).send(bookFound);
	}
};

const lendBook = async (req, res) => {
	var isAdmin = req.user.sub;
	var bookId = req.params.idBook;

	const userLogin = await User.findOne({ _id: isAdmin });
	if (userLogin.role != 'admin') {
		const bookSelected = await Book.findOne({ _id: bookId });
		if (!bookSelected) {
			return res.status(404).send({ menssage: 'ERROR: Book not exists' });
		} else if (bookSelected.available >= 1) {
			const userBook = await User.findOne(
				{ _id: userLogin.id },
				{ books_borrowed: { $elemMatch: { book: bookSelected._id } } }
			);

			if (userBook.books_borrowed == 0) {
				const bookBorrow = await Book.findOneAndUpdate({ _id: bookId }, { $inc: { available: -1 } });
				if (bookBorrow) {
					const userBorrowing = await User.findOneAndUpdate(
						{ _id: isAdmin },
						{ $push: { books_borrowed: { book: bookSelected._id } }, $inc: { amount_book_borrowed: 1 } },
						{ new: true }
					);
					if (userBorrowing) {
						const userView = await User.findOne(
							{ _id: isAdmin },
							{ password: 0, role: 0, magazines_borrowed: 0 }
						).populate({
							path: 'books_borrowed.book',
							select: { title: 1, author: 1, _id: 0 },
						});
						return res.status(202).send(userView);
					}
				}
			} else {
				return res.status(200).send({ menssage: 'You have already borrowed this book' });
			}
		} else {
			return res.status(200).send({ menssage: 'Does not have books available' });
		}
	} else {
		return res.status(200).send({ menssage: 'Access denied' });
	}
};

const returnBook = async (req, res) => {
	var isAdmin = req.user.sub;
	var bookId = req.params.idBook;

	const userLogin = await User.findOne({ _id: isAdmin });
	if (userLogin.role != 'admin') {
		const bookBorrow = await User.findOne({ _id: isAdmin }, { books_borrowed: { $elemMatch: { book: bookId } } });
		if (!bookBorrow) {
			return res.status(404).send({ menssage: 'ERROR: Book not exists' });
		}

		if (bookBorrow.books_borrowed != 0) {
			const bookMoficate = await Book.findOneAndUpdate({ _id: bookId }, { $inc: { available: 1 } });
			if (!bookMoficate) {
				return res.status(404).send({ menssage: 'ERROR: Book not exists' });
			} else {
				const bookReturn = await User.findOneAndUpdate(
					{ _id: bookBorrow.id },
					{ $pull: { books_borrowed: { book: bookMoficate.id } }, $inc: { amount_book_borrowed: -1 } },
					{ new: true }
				);
				if (bookReturn) {
					return res.status(200).send(bookReturn);
				}
			}
		} else {
			return res.status(200).send({ menssage: 'I did not borrow this book' });
		}
	} else {
		return res.status(200).send({ menssage: 'Access denied' });
	}
};

module.exports = {
	newBook,
	getBooks,
	getBooksAviablesUser,
	getBooksLendUser,
	getBook,
	updateBook,
	deleteBook,
	searchTitle,
	searchKeywords,
	lendBook,
	returnBook,
};
