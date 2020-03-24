const express = require('express');
const config = require('./config');
const Subscriber = require('./models/subscriber');
const send = require('./mailer');
const app = express();
require('./mangoose');

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
    }
    res.send({success: true});
  }catch (e) {
    res.sendStatus(500);
  }

});

app.get('/test', async function (req, res) {
  const data = await Subscriber.find()
  res.send(data)
})

app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}!`);
});