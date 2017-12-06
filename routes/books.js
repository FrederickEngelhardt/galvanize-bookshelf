'use strict';

const express = require('express');
const knex = require('../knex.js')
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

router.get('/books', (req,res,next) => {
  knex.column('author', 'cover_url as coverUrl', 'updated_at as updatedAt','created_at as createdAt', 'description', 'genre', 'id', 'title').select()
  .from('books')
  .orderBy('title', 'asc')
  .then( (result) => {
    res.send(result)
  })
  // next({error: 'Error 404'}
})
router.get('/books/:id', (req,res,next) => {
  let id = req.params.id
  knex.column('author', 'cover_url as coverUrl', 'updated_at as updatedAt','created_at as createdAt', 'description', 'genre', 'id', 'title').select()
  .from('books')
  .where('books.id', id)
  .then ( result => {
    res.send(result[0])
  })
})
router.post('/books', (req,res,next) => {
  knex('books').insert({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl,
  }, '*')
  .then( result => {
  let resultObj = {
      id: result[0].id,
      title: result[0].title,
      author: result[0].author,
      genre: result[0].genre,
      cover_url: result[0].coverUrl,
      description: result[0].description
  }
  console.log(resultObj);
    res.send(resultObj)
  })
  .catch((err) => {
    next(err)
  })
})
// router.patch('/books/:id', (req,res,next) => {
//   res.send()
// })
router.delete('/books/:id', (req,res,next) => {
  res.send()
})




module.exports = router;
