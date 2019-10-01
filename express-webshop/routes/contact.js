var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('contact', {
    title: 'Contacts',
    user: req.user || {},
  });
})
// const showReview=function() {
//   // document.getElementById("review").classList.toggle("show");
// }

// onCancel() {
//   document.getElementById("review").classList.toggle("show");
// }

// leaveReview() {
//   this.product.reviews.push(this.newReview);
//   this.productService.update(this.product).subscribe(
//     response => {
//       document.getElementById("review").classList.toggle("show");
//       this.newReview = {};
//       let nList = document.querySelectorAll("input[type=radio]");
//       console.log(nList);
//       // for (var checkbox of nList) {
//       //   checkbox.checked = false;
//       // };
//       Array.prototype.forEach.call(nList, function (checkbox) {
//         checkbox.checked = false;
//       });
//       this.avg = this.countAvg(this.product);
//     },
//     err => console.error(err)
//   )
// }


// rating: number;
// itemId: number;
// ratingClick: EventEmitter<any> = new EventEmitter<any>();

// inputName: any;

// onClick(rating: number): void {
//   this.newReview.rate = rating;
//   this.rating = rating;
//   this.ratingClick.emit({
//     itemId: this.itemId,
//     rating: rating
//   });
// }
module.exports = router;