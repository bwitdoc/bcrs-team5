const express = require('express');
const SecurityQuestion = require('../models/security-question');

router = express.Router;

// find all API
router.get('/', function(req, res, next){
    SecurityQuestion.find({}).where('isDisabled').equals(false).exec(function(err, securityQuestions){
        if(err){
            console.log(err);
            return next(err);
        } else {
            console.log(securityQuestions);
            res.json(securityQuestions);
        }
    })
});

// find by Id
router.get('/:id', function(req, res, next){
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
        if(err){
            console.log(err);
            return next(err);
        } else {
            console.log(securityQuestion);
            res.json(securityQuestion);
        }
    })
});

// create security question API
router.post('/', function(req, res, next){
let = sq = {
    text: req.body.text,
};
    SecurityQuestion.create(sq, function(err, securityQuestion){
        if(err){
            console.log(err);
            return next(err);
        } else {
            console.log(securityQuestion);
            res.json(securityQuestion);
        }
    })
});

// update security question
router.post('/', function(req, res, next){
SecurityQuestion.findOne({'_id': req.params.id}), function(err, securityQuestion){
    if(err){
        console.log(err);
        return next(err);
    } else {
        console.log(securityQuestion);
        securityQuestion.set({
            text: req.body.text
        });

SecurityQuestion.save(function(err, securityQuestions){
    if(err){
        console.log(err);
        return next(err);
    } else {
        console.log(securityQuestions);
        res.json(securityQuestions);
    }
});

// delete security question
router.delete('/:id', function(req, res, next){
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
        if(err){
            console.log(err);
            return next(err);
        } else {
            console.log(securityQuestion);
            if(securityQuestion){
                securityQuestion.set({
                    isDisabled: true
                });
            }
            else {
                console.log(savedSecurityQuestion);
                res.json(savedSecurityQuestion);
            }
        }
    });
});

module.exports = router;