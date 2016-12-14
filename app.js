'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./knexfile.js')['development'];
var knex = require('knex')(db);

app.use(bodyParser.json());

app.get('/dogs', (req, res, next) => {
  knex('dogs')
    .orderBy('breed')
    .then((dogs) => {
      res.send(dogs);
    })
    .catch((err) => {
      next(err);
    });
});


app.post('/dogs', (req, res, next) => {
    knex('dogs')
      .insert({
        breed: req.body.breed,
        name: req.body.name
      })
      .then(
        res.send('dog created')
      )
      .catch((err) => {
        next(err);
      });

});


app.patch('/dogs/:id', (req, res, next) => {
  var id = Number.parseInt(req.params.id);
  console.log(id);
  if (Number.isNaN(id)) {
      res.send("error");
    }
  knex('dogs')
    // .first()
    .then((dog) => {
      if (!dog) {
        res.send("not found");
        return next();
      } return knex('dogs')
    .update({
      name: req.body.name,
      breed: req.body.breed
    }, '*')
      .where('id', id);
    })
    .then((results) => {
      console.log('test');
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
  });



app.delete('/dogs/:id', (req, res, next) => {
  var id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    res.send("error");
  }

  var dog;

  knex('dogs')
    .where('id', id)
    .first()
    .then((result) => {
      if (!result) {
          return next();
        }
      dog = result;

      return knex('dogs')
        .del()
        .where('id', id);
    })
    .then(() => {
      delete dog.id;
      res.send(dog);
    })
    .catch((err) => {
      next(err);
    });
});


app.listen('3000', () => {
    console.log('Listening on port');
  });
