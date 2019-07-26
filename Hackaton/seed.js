require("dotenv").config();
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect(`${process.env.MONGODB_URI}`);

const goUser = [
    {
        firstName: 'teste',
        lastName: 'teste',
        email: 'killgpc@hotmail.com',
    }
];

User.create(goUser, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${goUser.length} User`);
    mongoose.connection.close();
  });
