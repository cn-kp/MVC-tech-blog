const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const Auth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    console.log(req.session)
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const post = postData.map((post) =>
      post.get({
        plain: true,
      })
    );
      console.log(post)
    res.render("homepage", {
      post,
      logged_in: req.session.logged_in,
      userName: req.session.userName,
      userEmail: req.session.userEmail,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({
      plain: true,
    });

    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", Auth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });
    const post = postData.map((post) => post.get({ plain: true }));
    console.log(post.comments)
    res.render("dashboard", {
      post,
      logged_in: true,
      userName: req.session.userName,
      userEmail: req.session.userEmail,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    //or redirect to home
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

module.exports = router;
