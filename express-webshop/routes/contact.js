const express = require('express');
const dateFormat = require('dateformat');
const Mariadb = require('../modules/webshop-mariadb');

const database = new Mariadb();
const router = express.Router();

router.get('/', async (req, res) => {
  const reviewList = await database.readRecord('reviews', {
    from: 'INNER JOIN users ON reviews.userid=users.id',
    select: 'reviews.id, reviews.text, reviews.rate, reviews.insdate, users.firstname as firstname, users.lastname as lastname',
  orderBy: 'reviews.insdate DESC'
  });

  res.render('contact', {
    title: 'Contacts',
    reviews: reviewList,
    user: req.user || {},
  });
});

router.post('/reviews/addReview', async (req, res) => {
  await database.createRecord('reviews', {
    text: req.body.text,
    rate: req.body.rate,
    userid: req.user.id || 0,
  });
  res.redirect('/contact');
});

router.get('/reviews/remove/:id', async (req, res) => {
  await database.deleteRecord('reviews', {
    id: req.params.id,
  });
  res.redirect('/contact');
});

router.post('/reviews/edit/:id', async (req, res) => {
  await database.updateRecord('reviews', {
    id: req.params.id,
  }, {
    text: req.body.text,
  });
  res.redirect('/contact');
});

module.exports = router;
