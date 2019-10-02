const express = require('express');
const dateFormat = require('dateformat');
const Mariadb = require('../modules/webshop-mariadb');

const database = new Mariadb();
const router = express.Router();

router.get('/', async (req, res, next) => {
  const reviewList = await database.readRecord('reviews', {
    from: 'INNER JOIN users ON reviews.userid=users.id',
    select: 'reviews.text, reviews.rate, users.firstname as firstname, users.lastname as lastname',
  });

  res.render('contact', {
    title: 'Contacts',
    reviews: reviewList,
    user: req.user || {},

  });
});
router.post('/reviews/addReview', async (req, res) => {
  console.log(req.body.text);
  await database.createRecord('reviews', {
    text: req.body.text,
    rate: req.body.rate,
    userid: req.user.id || 0,
  });
  res.redirect('/contact');
});

module.exports = router;
