const express = require('express');
const config = require('./config');
const path = require('path');
const app = express();
require('./mangoose');
const subscribeRoute = require('./routers/subscribe')
const unSubscribeRoute = require('./routers/unsubscribe')

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.json());

//routers----
app.use(subscribeRoute);
app.use(unSubscribeRoute);


app.get("*", function(req, res){
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(config.port, function () {
  console.log(`Start on port ${config.port}!`);
});