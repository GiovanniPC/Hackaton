require("dotenv").config();
const mongoose = require('mongoose');
const Admin = require('./models/admin');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const salt = bcrypt.genSaltSync(bcryptSalt);

mongoose.connect(`${process.env.MONGODB_URI}`);

const goAdmin = [
    {
        username: 'admin',
        password: bcrypt.hashSync('admin', salt)
    }
];

Admin.create(goAdmin, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${goAdmin.length} Admin`);
    mongoose.connection.close();
  });