const express = require('express');
const config = require('./config');
const Subscriber = require('./models/subscriber');
const app = express();
require('./mangoose');

app.use(express.json());

app.post('/subscribe', async function (req, res) {
  try {
    const find = await Subscriber.findOne({email: req.body.email});
    if(find) {
      find.countries = req.body.countries;
      find.sendGlobalInfo = req.body.sendGlobalInfo;
      await find.save();
    }else {
      const subscriber = new Subscriber({
        countries: req.body.countries,
        email: req.body.email,
        sendGlobalInfo: req.body.sendGlobalInfo
      });
      await subscriber.save()
    }
    res.sendStatus(200);
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