const express = require('express');
const router  = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('index', { GMAPS: process.env.GMAPS });
});

router.post('/', (req, res) => {
  const { name, birthDay, email, city } = req.body;

  const characters ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  const confirmationCode = token;

  if (
    name === "" ||
    birthDay === "" ||
    email === "" ||
    city === ""
  ) {
    res.render("index", {
      message: "Algum dos campos ficou vazio!",
      GMAPS: process.env.GMAPS
    });
    return;
  }

  User.findOne({ email }).then(user => {
    if (user !== null) {
      res.render("index", { message: "Email já foi utilizado", GMAPS: process.env.GMAPS });
      return;
    }

    const newUser = new User({
      name,
      email,
      date: birthDay,
      city,
      token: confirmationCode
    });

    newUser.save().then(info => res.redirect("/")).catch(error => console.log(error));
  })
  .catch(err => {
    res.render("index", { message: "Algo deu errado!", GMAPS: process.env.GMAPS });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  User.find({token: id}).then(user => {

    if(user[0].status === 'Active'){
      res.render('index', {tokenMessage: 'Cupom Já recuperado!', GMAPS: process.env.GMAPS})
    }
  }).catch(err => console.log(err));

  User.findOneAndUpdate({token: id}, {status: "Active"}).then(user => {
    res.render('index', { user, GMAPS: process.env.GMAPS });
  })
  .catch(err => {
    res.render('index', { message: "Something went wrong", GMAPS: process.env.GMAPS});
  });

});


module.exports = router;
