const express = require('express');
const BetagDB = require('./../modules/webshop-mariadb');
const http = require('http');

const router = express.Router();
const database = new BetagDB();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html>`);

router.get('/', async (req, res) => {
  if (req.query.hasOwnProperty('emailaddress')) {
    database.createRecord('newsletter', { emailaddress: req.query.emailaddress });
  }

  // setTimeout(() => {
  //   // navigateByUrl('http://localhost:3000');
  //   // window.location.replace('http://localhost:3000');
  //   // window.location.href = ('http://localhost:3000');
  //   res.redirect('http://localhost:3000/projects');
  //   // window.location = 'http://localhost:3000';
  // }, 3000);

  res.render('thankyou', {
    title: 'Hearty thank you',
    user: req.user || {},
  });



});

module.exports = router;
