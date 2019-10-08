const express = require('express');
const Mariadb = require('../modules/webshop-mariadb/mariadb-main');

const database = new Mariadb();
const router = express.Router();

router.get('/', async (req, res) => {
  const reviewList = await database.readRecord('reviews', {
    from: 'INNER JOIN users ON reviews.userid=users.id',
    select: 'reviews.id, reviews.text, reviews.rate, reviews.insdate, users.firstname as firstname, users.lastname as lastname',
    orderBy: 'reviews.insdate DESC',
  });

  res.render('reviews', {
    title: 'Reviews',
    reviews: reviewList,
    user: req.user || {},
  });
});

router.post('/addReview', async (req, res) => {
  if (req.body.text === '' || req.body.rate === undefined) {
    const reviewList = await database.readRecord('reviews', {
      from: 'INNER JOIN users ON reviews.userid=users.id',
      select: 'reviews.id, reviews.text, reviews.rate, reviews.insdate, users.firstname as firstname, users.lastname as lastname',
      orderBy: 'reviews.insdate DESC',
    });
    res.render('reviews', {
      title: 'Reviews',
      reviews: reviewList,
      user: req.user || {},
      wrong: 'Please write a review and rate us :)',
    });
  } else {
    await database.createRecord('reviews', {
      text: req.body.text,
      rate: req.body.rate,
      userid: req.user.id || 0,
    });
    res.redirect('/reviews');
  }
});

router.get('/remove/:id', async (req, res) => {
  await database.deleteRecord('reviews', {
    id: req.params.id,
  });
  res.redirect('/reviews');
});

router.post('/edit/:id', async (req, res) => {
  await database.updateRecord('reviews', {
    id: req.params.id,
  }, {
    text: req.body.text,
  });
  res.redirect('/reviews');
});

module.exports = router;
