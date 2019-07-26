const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/user');
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/', (req, res) => {
  res.render('index', { GMAPS: process.env.GMAPS });
});

router.get('/admin', (req, res) => {
  res.render('login');
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/admin", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/admin",
    failureFlash: true,
    passReqToCallback: true})
);

router.get("/dashboard", ensureLogin.ensureLoggedIn("/admin"), (req, res) => {
  User.find().then(users => {
    let userPending = [];
    let userActive = [];
    users.forEach(element => {
      if(element.status === 'Pending'){
        userPending.push(element);
      } else if(element.status === 'Active'){
        userActive.push(element);
      }
    });
    res.render("dashboard", { admin: req.user, users: users , userPending, userActive});
  })
});

router.post('/', (req, res) => {
  const { name, birthDay, email, city , bairro } = req.body;

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
    city === "" ||
    bairro === ""
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
      bairro,
      token: confirmationCode
    });

    newUser.save()
      .then((userNew) => {
        console.log(email);
        const transporter = nodemailer.createTransport({
          host: "smtp.sparkpostmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          authMethod: "LOGIN",
          auth: {
            user: "SMTP_Injection", // generated ethereal user
            pass: "452d52801b88584c40c03c698255951ff9e061c0" ,
            },
        })

        console.log('sendmail');
        transporter.sendMail({
          from:  '"My Awesome Project 👻" <cocogoods@ironhackers.dev>',
          to: email,
          subject: 'Welcome to Lab Nodemail! Please confirm your account.',
          text: `Please, click on the link below to confirm your account: ${process.env.BASE_URL}/${confirmationCode}`,
          html: `
          <h3>Hi, there!</h3>
          <p>Please, click <a href="${process.env.BASE_URL}/${confirmationCode}" target="_blank">here</a> to confirm your account.</p>`,
        });
      
        console.log('sendmail after');
        transporter.verify((error, success) => {
          console.log('verify');
          if (error) {
            console.log(error);
          } else {
            console.log('else');
            console.log('Server is ready to take our messages');
          }
        })

        res.redirect("/");

      })
      .catch(err => {
        res.render("index", { message: "Algo deu errado!", GMAPS: process.env.GMAPS });
      });
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
