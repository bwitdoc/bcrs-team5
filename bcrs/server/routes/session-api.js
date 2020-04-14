const express = require('express');
const User = require('../models/user');
const SecurityQuestion = require('../models/security-questions');
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

// Register User
router.post('/register', function(req, res, next) {
  let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

  let u = {
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      securityQuestion: [req.body.securityQuestion]
  };

  User.create(u, function(err, newUser) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(newUser);

          res.status(200).send({
              type: 'success',
              auth: true,
              username: newUser.username,
              time_stamp: new Date()
          })
      }
  })
});

// Verify User
router.get('/verify/users/:username', function( req, res, next) {
  User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(user);
          res.json(user);
      }
  })
});

//Verify Security Questions
router.get('/verify/users/:username/security-questions', function( req, res, next) {
  User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(user);

          const question = {
            questionId: req.body.questionId,
            answer: req.body.answer
          };

          if(user) {
            let answersAreValid = (req.body.question === user.securityQuestion);

            if (answersAreValid) {
              res.status(200).send({
                type: 'success',
                auth: true,
                question: user.securityQuestion,
                time_stamp: new Date()
              })
            } else {
              console.log(`The answers for username: ${req.body.username} are invalid.`);
              res.status(401).send({
                type: 'error',
                text: 'Invalid answers, please try again.',
                auth: false,
                time_stamp: new Date()
              })
            }
          }
      }
  });
});

// Reset Password
router.put('/users/:username/reset-password', function(req, res, next) {
  let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

  User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(user);

          user.set({
              password: hashedPassword
          });

          user.save(function (err, savedUser) {
              if (err) {
                  console.log(err);
                  return next(err);
              } else {
                  console.log(savedUser);
                  res.json(savedUser);
              }
          })
      }
  })
});

module.exports = router;
