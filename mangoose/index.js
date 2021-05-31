const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(`mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}:27017/corona-data`, {useNewUrlParser: true, useCreateIndex: true});
