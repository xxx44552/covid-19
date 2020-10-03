const express = require('express');
const router = express.Router();
const Subscriber = require('./../models/subscriber');
const send = require('../mailer');

router.get('/unsubscribe/:email', async function (req, res) {
  try {
    const email = await Subscriber.findOne({email: req.params.email});
    await email.deleteOne();
    send.unSubscribe(req.params.email);
  }catch (e) {
    console.log(e)
  }
  res.redirect('https://covid.webinme.ru/')
});

module.exports = router;