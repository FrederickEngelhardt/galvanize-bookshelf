'use strict';

const boom = require('boom');
// const bcrypt = require('bcrypt-as-promised');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys } = require('humps');
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.post('/token', (req,res,next) => {
  let user;
  knex('users')
    .where('email', req.body.Email)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad email or password')
      }
      user = camelizeKeys(row)
      return bcrypt.compare(req.body.password, user.hashedPassword)
    })
})

router.get('/token', (req,res,next) => {
  jwt.verfiy(req.cookies.token, process.env.JWT_KEY, (err, _payload) => {
    if (err) {
      return res.send(false);
    }
    res.send(true)
  })
})


module.exports = router;
