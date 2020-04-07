const express = require('express');
const SecurityQuestion = require('../models/security-questions');

router = express.Router();

//Find all questions
router.get('/', function(req, res, next) {
  SecurityQuestion.find({}).where('isDisabled').equals(false).exec(function(err, securityQuestions) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestions);
      res.json(securityQuestions);
    }
  })
});

//Find by ID
router.get('/:id', function(req, res, next) {
  SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  })
});

//Create Security Question
router.post('/', function(req, res, next) {
  let = sq = {
    text: req.body.text
  };

  SecurityQuestion.create(sq, function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  })
});

//Update Security Question
router.post('/:id', function(req, res, next) {
  SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      securityQuestion.set({
        text: req.body.text
      });

      SecurityQuestion.save(function(err, securityQuestion) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(securityQuestion);
          res.json(securityQuestion);
        }
      })
    }
  })
});

//Delete Security Question
router.delete('/:id', function(req, res, next) {
  SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      if (securityQuestion) {
        securityQuestion.set({
          isDisabled: true
        });
      } else {
        console.log(savedSecurityQuestion);
        res.json(savedSecurityQuestion);
      }
    }
  });
});

module.exports = router;
