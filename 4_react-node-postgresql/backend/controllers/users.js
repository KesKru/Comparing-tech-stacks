//-----------------------Modules-----------------------//
const path = require('path');
//-----------------------Models-----------------------//
const md = require('../models/index');
const errors = {};

//-----------------------Controlers-----------------------//
module.exports = {
  getUsers: (req, res) => {
    md.User.findAll({
      attributes: ['name', 'email', 'id'],
      include: [
        {
          attributes: ['title', 'body'],
          model: md.Post
        }
      ]
    }).then((data) => {
      res.json(data);
    });
  },

  getUser: (req, res) => {
    md.User.findByPk(req.params.id, {
      attributes: ['name', 'email', 'id'],
      include: [
        {
          attributes: ['title', 'body'],
          model: md.Post
        },
        {
          attributes: ['field1', 'field2', 'field3'],
          model: md.Profile
        }
      ]
    }).then((data) => {
      res.json(data);
    });
  },

  createUser: (req, res) => {
    newUser = md.User.build({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    newUser.hashPassword().then((hash) => {
      newUser.password = hash;
      newUser
        .save()
        .then((user) => {
          res.json({ user: user });
        })
        .catch((err) => {
          res.send(err);
        });
    });
  },

  updateUser: (req, res) => {
    const userUpdate = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    md.User.update(userUpdate, {
      returning: true,
      where: { id: req.params.id }
    })
      .then(([updatedRows, [updatedUser]]) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  deleteUser: (req, res) => {
    md.User.destroy({
      where: { id: req.params.id }
    })
      .then((nr) => {
        res.json({ numberOFProfilesDetroyd: nr });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};
