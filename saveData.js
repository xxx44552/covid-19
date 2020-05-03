const send = require('./mailer');
const request = require('request-promise');
const saveData = require('./models/saveData');
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
    const saveData = new SaveData({
      data: {
        data, global
      }
    });
    await saveData.save();
  }catch (e) {
    console.log(e)
  }
  mongoose.connection.close()
}

sendToUser();