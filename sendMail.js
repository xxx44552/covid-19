const send = require('./mailer');
const request = require('request-promise');
const Subscriber = require('./models/subscriber');
const mongoose = require('mongoose');
require('./mangoose');

async function sendToUser() {
  let getYesterday = await saveData.findOne().sort({createdAt: -1});
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
    //fix if empty yesterday data
    if(!getYesterday) {
      console.log('Empty yesterday data')
      getYesterday = {
        globalData: global,
        countryData: data
      }
    }
    const users = await Subscriber.find();
    await users.forEach(({email, countries}) => {
      let arr = [];
      countries.forEach(country => {
        JSON.parse(data).forEach(el => {
          if(el.country === country) arr.push(el)
        })
      });
      send.sendMailToSubscriber(email, arr, JSON.parse(global), getYesterday)
    });
    const yesterday = new saveData({
      globalData: global,
      countryData: data
    });
    await yesterday.save();
  }catch (e) {
    console.log(e)
  }
  mongoose.connection.close()
}

sendToUser();