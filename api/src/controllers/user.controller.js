'use strict';

var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var util = require('../util/genereatesParams');

const newUser = async (req, res) => {
  const user = User();
  var params = req.body;
  var isAdmin = req.user.sub;

  let confirmAdmin = await User.findOne({ _id: isAdmin });
  if (confirmAdmin.role == 'admin') {
    if (params.role == 'catedratico' || params.role == 'estudiante') {
      if (params.name && params.lastName && params.role && params.password) {
        user.name = params.name;
        user.lastName = params.lastName;
        user.carnet = params.carnet;
        user.dpi = params.dpi;
        user.password = params.password;
        user.role = params.role;

        if (params.carnet && params.role == 'estudiante') {
          user.userName = util.generateUsername(
            params.name,
            params.lastName,
            params.carnet
          );
          user.email = util.generateEmail(
            params.name,
            params.lastName,
            params.carnet
          );

          let userExist = await User.find({
            $or: [{ carnet: user.carnet }],
          });
          if (userExist && userExist.length >= 1)
            return res.status(200).send({ message: 'User alredy exists' });
          else {
            let hash = await bcrypt.hashSync(params.password, null, null);
            /* user.password = hash; */
            let accountCreated = await user.save();
            if (!accountCreated)
              return res
                .status(200)
                .send({ menssage: 'Error creating account' });
            else {
              return res.status(202).send(accountCreated);
            }
          }
        } else if (params.dpi && params.role == 'catedratico') {
          user.userName = util.generateUsernameCatedratico(
            params.name,
            params.lastName
          );
          user.email = util.generateEmailCatedratico(
            params.name,
            params.lastName
          );

          let userExist = await User.find({
            $or: [{ userName: user.userName }, { dpi: user.dpi }],
          });
          if (userExist && userExist.length >= 1)
            return res.status(200).send({ message: 'User alredy exists' });
          else {
            let hash = await bcrypt.hashSync(params.password, null, null);
            /* user.password = hash; */
            let accountCreated = await user.save();
            if (!accountCreated)
              return res
                .status(200)
                .send({ menssage: 'Error creating account' });
            else {
              return res.status(202).send(accountCreated);
            }
          }
        } else {
          return res.status(202).send({
            menssage:
              'The relationship parameters are not valid if the user is a student, then the required parameter is canert or if the user is the master of the required parameter is dpi',
          });
        }
      } else {
        return res.status(200).send({ menssage: 'Complet data required' });
      }
    } else {
      return res
        .status(202)
        .send({ menssage: 'That kind of role does not exist' });
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

const login = async (req, res) => {
  var params = req.body;

  if (params.userName) {
    const userFind = await User.findOne({ userName: params.userName });
    if (!userFind) {
      return res.status(500).send({ message: 'Error' });
    } else if (userFind.role == 'admin') {
      const compare = await bcrypt.compareSync(
        params.password,
        userFind.password
      );
      if (compare) {
        if (params.getToken) {
          const Token = jwt.createToken(userFind);
          return res.status(202).send({ Token, role: userFind.role });
        } else {
          userFind.password = undefined;
          return res.status(200).send({ user: userFind });
        }
      } else {
        return res.status(404).send({ message: 'Error find user' });
      }
    } else {
      if (userFind.password == params.password) {
        if (params.getToken) {
          const Token = jwt.createToken(userFind);
          return res.status(202).send({ Token, role: userFind.role });
        } else {
          userFind.password = undefined;
          return res.status(200).send({ user: userFind });
        }
      } else {
        return res.status(202).send({ message: 'Password incorected' });
      }
    }
  } else if (params.email) {
    const userFind = await User.findOne({ email: params.email });
    if (!userFind) {
      return res.status(500).send({ message: 'Error' });
    } else {
      if (userFind.password == params.password) {
        if (params.getToken) {
          return res
            .status(202)
            .send({ token: jwt.createToken(userFind), userr: userFind });
        } else {
          userFind.password = undefined;
          return res.status(200).send({ user: userFind });
        }
      } else {
        return res.status(202).send({ message: 'Password incorected' });
      }
    }
  }
};

const userProfile = async (req, res) => {
  var isAdmin = req.user.sub;

  const userFind = await User.findOne({ _id: isAdmin });
  if (!userFind) {
    return res.status(200).send({ menssage: 'Error the user not exist' });
  } else {
    return res.status(202).send(userFind);
  }
};

const getUsers = async (req, res) => {
  var isAdmin = req.user.sub;

  const confirmAdmin = await User.findOne({ _id: isAdmin });
  if (confirmAdmin.role == 'admin') {
    const usersList = await User.find({ $nor: [{ _id: isAdmin }] });
    if (usersList < 1) {
      return res.status(200).send({ menssage: 'No ningun usuario registrado' });
    } else {
      return res.status(202).send(usersList);
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

const getUser = async (req, res) => {
  var isAdmin = req.user.sub;
  var userId = req.params.idUser;

  const confirmAdmin = await User.findOne({ _id: isAdmin });
  if (confirmAdmin.role == 'admin') {
    const userFind = await User.findOne({ _id: userId });
    if (userFind.id == confirmAdmin.id) {
      return res
        .status(200)
        .send({ menssage: 'This user cannot be displayed' });
    }
    if (!userFind) {
      return res.status(200).send({ menssage: 'Error the user not exist' });
    } else {
      return res.status(202).send(userFind);
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

const updateUser = async (req, res) => {
  var isAdmin = req.user.sub;
  var userId = req.params.idUser;
  var params = req.body;

  const confirmAdmin = await User.findOne({ _id: isAdmin });
  if (confirmAdmin.role == 'admin') {
    const userFind = await User.findOne({ _id: userId });
    if (userFind.id == confirmAdmin.id) {
      return res.status(200).send({ menssage: 'This user cannot be edited' });
    }
    if (!userFind) {
      return res.status(200).send({ menssage: 'Error the user not exist' });
    } else {
      if (userFind.role == 'estudiante') {
        if (params.name) {
          params.userName = util.generateUsername(
            params.name,
            userFind.lastName,
            userFind.carnet
          );
          params.email = util.generateEmail(
            params.name,
            userFind.lastName,
            userFind.carnet
          );
        }
        if (params.lastName) {
          params.userName = util.generateUsername(
            userFind.name,
            params.lastName,
            userFind.carnet
          );
          params.email = util.generateEmail(
            userFind.name,
            params.lastName,
            userFind.carnet
          );
        }
        if (params.carnet) {
          params.userName = util.generateUsername(
            params.name,
            params.lastName,
            userFind.carnet
          );
          params.email = util.generateEmail(
            params.name,
            params.lastName,
            userFind.carnet
          );
        }
        if (params.name && params.lastName) {
          params.userName = util.generateUsername(
            params.name,
            params.lastName,
            userFind.carnet
          );
          params.email = util.generateEmail(
            params.name,
            params.lastName,
            userFind.carnet
          );
        }
        if (params.name && params.carnet) {
          params.userName = util.generateUsername(
            params.name,
            userFind.lastName,
            params.carnet
          );
          params.email = util.generateEmail(
            params.name,
            userFind.lastName,
            params.carnet
          );
        }
        if (params.lastName && params.carnet) {
          params.userName = util.generateUsername(
            userFind.name,
            params.lastName,
            params.carnet
          );
          params.email = util.generateEmail(
            userFind.name,
            params.lastName,
            params.carnet
          );
        }
      }
      if (userFind.role == 'catedratico') {
        if (params.name) {
          params.userName = util.generateUsernameCatedratico(
            params.name,
            userFind.lastName
          );
          params.email = util.generateEmailCatedratico(
            params.name,
            userFind.lastName
          );
        }
        if (params.lastName) {
          params.userName = util.generateUsernameCatedratico(
            userFind.name,
            params.lastName
          );
          params.email = util.generateEmailCatedratico(
            userFind.name,
            params.lastName
          );
        }
        if (params.name && params.lastName) {
          params.userName = util.generateUsernameCatedratico(
            params.name,
            params.lastName
          );
          params.email = util.generateEmailCatedratico(
            params.name,
            params.lastName
          );
        }
      }
    }
    delete params.password;
    const userUpdate = await User.findOneAndUpdate({ _id: userId }, params, {
      new: true,
    });
    if (!userUpdate) {
      return res.status(200).send({ menssage: 'Error the user not exist' });
    } else {
      return res.status(202).send(userUpdate);
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

const deleteUser = async (req, res) => {
  var isAdmin = req.user.sub;
  var userId = req.params.idUser;

  const confirmAdmin = await User.findOne({ _id: isAdmin });
  if (confirmAdmin.role == 'admin') {
    const userDelete = await User.findOneAndDelete({ _id: userId });
    if (userFind.id == confirmAdmin.id) {
      return res.status(200).send({ menssage: 'This user cannot be deleted' });
    }
    if (!userDelete) {
      return res.status(200).send({ menssage: 'Error the user not exist' });
    } else {
      return res
        .status(202)
        .send({ menssage: 'User was successfully removed' });
    }
  } else {
    return res.status(200).send({ menssage: 'Access denied' });
  }
};

module.exports = {
  newUser,
  login,
  getUsers,
  getUser,
  userProfile,
  updateUser,
  deleteUser,
};
