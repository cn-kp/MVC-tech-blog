const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const Auth = require("../../utils/auth");

router.get("/:id", Auth, async (req, res) => {
    try {
      const postData = Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [
          {
            model: Comment,
            include: {
              model: User,
              attributes: ["name", "email"],
            },
          },
        ],
      });
      const post = postData.map((post) => post.get({ plain: true }));
      res.render("dashboard", {
        post,
        loggedIn: true,
        userName: req.session.userName,
        userEmail: req.session.userEmail,
      });
      const user = userData.get({
        plain: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/", Auth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });
  
  router.delete("/:id", Auth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.put("/:id", Auth, async (req, res) => {
    try {
      const updatePost = await Post.update(
        {
          ...req.body,
          user_id: req.session.user_id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
module.exports = router;