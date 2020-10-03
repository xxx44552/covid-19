const express = require('express');
const router = express.Router();
const Subscriber = require('./../models/subscriber');
const send = require('../mailer');

router.post('/subscribe', async function (req, res) {
  try {
    const find = await Subscriber.findOne({email: req.body.email});
    if(find) {
      find.countries = req.body.countries;
      await find.save();
      send.welcome(req.body.email, req.body.countries);
    }else {
      const subscriber = new Subscriber({
        countries: req.body.countries,
        email: req.body.email
      });
      await subscriber.save();
      send.welcome(req.body.email, req.body.countries);
      send.newSubscriber(req.body.email, req.body.countries);
    }
    res.send({success: true});
  }catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;