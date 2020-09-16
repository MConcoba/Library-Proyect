'use strict';

var Magazine = require('../models/magazine.model');
var User = require('../models/user.model');

const newMagazine = async (req, res) => {
  var magazine = Magazine();
  var isAdmin = req.user.sub;
  var params = req.body;

  const confirmAdmin = await User.findOne({ _id: isAdmin });
  if (confirmAdmin.role == 'admin') {
    var paralabrasClaves = '-' + params.keywords.replace(/ /g, '-');
    var temas = '-' + params.topics.replace(/ /g, '-');

    if (params.copies >= params.available) {
      magazine.author = params.author;
      magazine.title = params.title;
      magazine.edicion = params.edicion;
      magazine.description = params.description;
      magazine.frequencyActs = params.frequencyActs;
      magazine.specimens = params.specimens;
      magazine.topics = temas.split(',');
      magazine.keywords = paralabrasClaves.split(',');
      magazine.copies = params.copies;
      magazine.available = params.available;

      let magazineExist = await Magazine.find({
        $or: [{ edicion: magazine.edicion }],
      });
      if (magazineExist && magazineExist.length >= 1)
        return res.status(200).send({ message: 'Magazine alredy exists' });
      else {
        let magazineSave = await magazine.save();
        if (!magazineSave)
          return res.status(200).send({ menssage: 'Error register magazine' });
        else {
          return res.status(202).send(magazineSave);
        }
      }
    } else {
      return res
        .status(200)
        .send({ menssage: 'ERRO: the aviable is incorrect to the copies' });
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

const getMagazines = async (req, res) => {
  const magazineList = await Magazine.find();
  if (!magazineList) {
    return res.status(404).send({ menssage: 'ERROR: Magazine not exists' });
  } else {
    return res.status(202).send(magazineList);
  }
};

const getMagazine = async (req, res) => {
  var magazineID = req.params.idMagazine;

  const magazineView = await Magazine.findOne({ _id: magazineID });
  if (!magazineView) {
    return res.status(404).send({ menssage: 'ERROR: Magazine not exists' });
  } else {
    return res.status(202).send(magazineView);
  }
};

const getMagazineLendUser = async (req, res) => {
  var isAdmin = req.user.sub;
  /* const booksList = await Book.find({}, { _id: 1 }); */
  const userMagazine = await User.findOne({ _id: isAdmin }).populate({
    path: 'magazines_borrowed.magazine',
  });
  /* 	const booksList = await Book.find({ $nor: [{ _id: userMagazine.books_borrowed._id }] }); */
  if (!userMagazine) {
    return res.status(404).send({ menssage: 'ERROR: Magazine not exists' });
  } else {
    return res.status(202).send(userMagazine.magazines_borrowed);
  }
};

const updateMagazine = async (req, res) => {
  var isAdmin = req.user.sub;
  var params = req.body;
  var magazineID = req.params.idMagazine;

  const confirmAdmin = await User.findOne({ _id: isAdmin });
  if (confirmAdmin.role == 'admin') {
    if (params.copies && params.available && params.keywords && params.topics) {
      const magazineView = await Magazine.findOne({ _id: magazineID });
      if (!magazineView) {
        return res.status(404).send({ menssage: 'ERROR: Magazine not exists' });
      } else {
        const magazineUpdated = await Magazine.findOneAndUpdate(
          { _id: magazineID },
          params,
          { new: true }
        );
        if (!magazineUpdated) {
          return res
            .status(404)
            .send({ menssage: 'ERROR: Magazine not exists' });
        } else {
          return res.status(202).send(magazineUpdated);
        }
      }
    } else if (!params.keywords || !params.keywords) {
      const magazineView = await Magazine.findOne({ _id: magazineID });
      if (!magazineView) {
        return res.status(404).send({ menssage: 'ERROR: Magazine not exists' });
      } else {
        var k = params.keywords.split(', ').map(Number);
        var t = params.keywords.split(', ').map(Number);
        params.keywords = k;
        params.topics = t;

        const magazineUpdated = await Magazine.findOneAndUpdate(
          { _id: magazineID },
          params,
          { new: true }
        );
        if (!magazineUpdated) {
          return res
            .status(404)
            .send({ menssage: 'ERROR: Magazine not exists' });
        } else {
          return res.status(202).send(magazineUpdated);
        }
      }
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

const deleteMagazine = async (req, res) => {
  var isAdmin = req.user.sub;
  var magazineID = req.params.idMagazine;

  const confirmAdmin = await User.findOne({ _id: isAdmin });
  if (confirmAdmin.role == 'admin') {
    const magazineDelete = await Magazine.findOneAndDelete({ _id: magazineID });
    if (!magazineDelete) {
      return res.status(404).send({ menssage: 'ERROR: Magazine not exists' });
    } else {
      return res
        .status(202)
        .send({ menssage: 'Magazine was successfully removed' });
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

const searchTitle = async (req, res) => {
  var params = req.body;

  const magazineFound = await Magazine.find({
    title: { $regex: params.title, $options: 'i' },
  });
  if (!magazineFound) {
    return res.status(404).send({ menssage: 'No match found in titles' });
  } else {
    return res.status(202).send(magazineFound);
  }
};

const searchKeywords = async (req, res) => {
  var params = req.body;
  var paralabrasClaves = '-' + params.keywords.replace(/ /g, '-');

  const magazineFound = await Magazine.find({
    keywords: { $regex: paralabrasClaves, $options: 'i' },
  });
  if (!magazineFound) {
    return res.status(404).send({ menssage: 'No match found in titles' });
  } else {
    return res.status(202).send(magazineFound);
  }
};

const lendMagazine = async (req, res) => {
  var isAdmin = req.user.sub;
  var magazineID = req.params.idMagazine;

  const userLogin = await User.findOne({ _id: isAdmin });
  if (userLogin.role != 'admin') {
    const magazineSelected = await Magazine.findOne({ _id: magazineID });
    if (!magazineSelected) {
      return res.status(404).send({ menssage: 'ERROR: Magazine not exists' });
    } else if (magazineSelected.available >= 1) {
      const userMagazine = await User.findOne(
        { _id: userLogin.id },
        {
          magazines_borrowed: {
            $elemMatch: { magazine: magazineSelected._id },
          },
        }
      );
      if (userMagazine.magazines_borrowed == 0) {
        const magazineBorrow = await Magazine.findOneAndUpdate(
          { _id: magazineID },
          { $inc: { available: -1 } }
        );
        if (magazineBorrow) {
          const userBorrowing = await User.findOneAndUpdate(
            { _id: isAdmin },
            {
              $push: { magazines_borrowed: { magazine: magazineSelected._id } },
              $inc: { amount_magazines_borrowed: 1 },
            },
            { new: true }
          );
          if (userBorrowing) {
            const userView = await User.findOne(
              { _id: isAdmin },
              { password: 0, role: 0, magazines_borrowed: 0 }
            ).populate({
              path: 'magazines_borrowed.magazine',
              select: { title: 1, author: 1, _id: 0 },
            });
            return res.status(202).send(userView);
          }
        }
      } else {
        return res
          .status(200)
          .send({ menssage: 'You have already borrowed this magazine' });
      }
    } else {
      return res
        .status(200)
        .send({ menssage: 'Does not have magazines available' });
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

const returnMagazine = async (req, res) => {
  var isAdmin = req.user.sub;
  var magazineID = req.params.idMagazine;

  const userLogin = await User.findOne({ _id: isAdmin });
  if (userLogin.role != 'admin') {
    const magazinekBorrow = await User.findOne(
      { _id: isAdmin },
      { magazines_borrowed: { $elemMatch: { magazine: magazineID } } }
    );
    if (!magazinekBorrow) {
      return res.status(404).send({ menssage: 'ERROR: Magazine not exists' });
    }

    if (magazinekBorrow.magazines_borrowed != 0) {
      const magazineMoficate = await Magazine.findOneAndUpdate(
        { _id: magazineID },
        { $inc: { available: 1 } }
      );
      if (!magazineMoficate) {
        return res.status(404).send({ menssage: 'ERROR: Magazine not exists' });
      } else {
        const magazineReturn = await User.findOneAndUpdate(
          { _id: magazinekBorrow.id },
          {
            $pull: { magazines_borrowed: { magazine: magazineMoficate.id } },
            $inc: { amount_magazine_borrowed: -1 },
          },
          { new: true }
        );
        if (magazineReturn) {
          return res.status(200).send(magazineReturn);
        }
      }
    } else {
      return res
        .status(200)
        .send({ menssage: 'I did not borrow this magazine' });
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

module.exports = {
  newMagazine,
  getMagazines,
  getMagazine,
  getMagazineLendUser,
  updateMagazine,
  deleteMagazine,
  searchTitle,
  searchKeywords,
  lendMagazine,
  returnMagazine,
};
