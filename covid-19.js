const express = require('express');
const config = require('./config');
const Subscriber = require('./models/subscriber');
const send = require('./mailer');
const path = require('path');
const app = express();
require('./mangoose');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.json());

app.post('/subscribe', async function (req, res) {
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

app.get('/unsubscribe/:email', async function (req, res) {
  try {
    const email = await Subscriber.findOne({email: req.params.email});
    await email.deleteOne();
    send.unSubscribe(req.params.email);
  }catch (e) {
    console.log(e)
  }
  res.redirect('https://covid.webinme.ru/')
});

app.get("*", function(req, res){
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(config.port, function () {
  console.log(`Start on port ${config.port}!`);
});