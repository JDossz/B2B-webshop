let express = require('express');
const Mariadb = require('../modules/webshop-mariadb')
const database = new Mariadb();
let router = express.Router();

router.get('/', async (req, res, next) => {
  // const reviewList = await database.readRecord('reviews', {});
  // let newReview = {
  //   text: '',
  //   rate: '',
  //   from: ''
  // };
  // let rating;
  // let itemId;
  // let ratingClick;
  // let inputName;


  // function onClick(rating) {
  //   this.newReview.rate = rating;
  //   this.rating = rating;
  //   this.ratingClick.emit({
  //     itemId: this.itemId,
  //     rating: rating
  //   });
  // }
  res.render('contact', {
    title: 'Contacts',
    reviews: reviewList,
    user: req.user || {},
  });
});
router.post('/:id', async (req, res) => {
  await database.createRecord('baskets', {
    projectid: req.params.id,
    userid: req.user.id || 0,
    quantity: 1,
  });
  res.redirect('/baskets');
});
router.post('/addReview', async (req,res,next)=>{
await database.createRecord('reviews',{})
})
module.exports = router;