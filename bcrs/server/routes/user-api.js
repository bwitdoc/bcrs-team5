const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();
const saltRounds = 10;

// find all
router.get('/', function(req, res, next) {
    User.find({}).where('isDisabled').equals(false).exec(function(err, users) {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            console.log(users);
            res.json(users);
        }
    });
});

// find by Id
router.get('/:id', function( req, res, next) {
    User.findOne({'_id': req.params.id}, function(err, user) {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            console.log(user);
            res.json(user);
        }
    })
});

// create User
router.post('/', function(req, res, next) {
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    let u = {
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        email: req.body.email
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

// update User
router.put('/:id', function(req, res, next) {
    User.findOne({'_id': req.params.id}, function(err, user) {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            console.log(user);

            user.set({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                email: req.body.email,
                role: req.body.role
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

// delete user
router.delete('/:id', function(req, res, next) {
    User.findOne({'_id': req.params.id}, function(err, user) {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            console.log(err);

            if (user) {
                user.set({
                isDisabled: true
            });

            user.save(function(err, savedUser) {
                if (err) {
                    console.log(err);
                    return next(err);
                    } else {
                    console.log(savedUser);
                    res.json(savedUser);
                    }
                })
            }
        }
    });
});

module.exports = router;

