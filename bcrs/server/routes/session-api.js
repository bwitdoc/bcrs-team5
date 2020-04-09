const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

//User Sign-in
router.post('/signin', function(req, res, next) {
  console.log(req.body);
  User.findOne({'username': req.body.username}, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);

      if(user) {
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (passwordIsValid) {
          res.status(200).send({
            type: 'success',
            auth: true,
            username: user.username,
            time_stamp: new Date()
          })
        } else {
          console.log(`The password for username: ${req.body.username} is invalid.`);
          res.status(401).send({
            type: 'error',
            text: 'Invalid username/password, please try again.',
            auth: false,
            time_stamp: new Date()
          })
        }
      }
    }
  })
});

module.exports = router;
