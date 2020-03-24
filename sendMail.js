const send = require('./mailer');
const request = require('request-promise');
const Subscriber = require('./models/subscriber');
const mongoose = require('mongoose');
require('./mangoose');

async function sendToUser() {
  let data;
  let global;
  try {
    data = await request({
      method: 'GET',
      uri: 'https://coronavirus-19-api.herokuapp.com/countries'
    });
    global = await request({
      method: 'GET',
      uri: 'https://coronavirus-19-api.herokuapp.com/all'
    })
  }catch (e) {
    console.log(e)
  }
  try {
    const users = await Subscriber.find();
    await users.forEach(({email, countries}) => {
      let arr = [];
      countries.forEach(country => {
        JSON.parse(data).forEach(el => {
          if(el.country === country) arr.push(el)
        })
      });
      send.sendMailToSubscriber(email, arr, JSON.parse(global))
    });
  }catch (e) {
    console.log(e)
  }
  mongoose.connection.close()
}

sendToUser();