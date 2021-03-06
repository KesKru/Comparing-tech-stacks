//-----------------------Modules-----------------------//
//-----------------------Models-----------------------//
const md = require('../models/index');
const errors = {};

//-----------------------Controlers-----------------------//
module.exports = {
  getPosts: (req, res) => {
    res.send('getPostAll route');
  },

  getPost: (req, res) => {
    res.send('getPost route');
    // md.User.findAll({
    //   attributes: ['name', 'email', 'id'],
    //   include: [
    //     {
    //       attributes: ['title', 'body', 'UserId'],
    //       model: md.Post
    //     }
    //   ]
    // }).then((data) => {
    //   res.json(data);
    // });
  },

  createPost: (req, res) => {
    newPost = md.Post.build({
      title: req.body.title,
      body: req.body.body,
      UserId: req.params.id
    });
    newPost
      .save()
      .then((post) => {
        res.json({ post: post });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  updatePost: (req, res) => {
    res.send('updatePost route');
  },

  deletePost: (req, res) => {
    res.send('deletePost route');
  }
};
