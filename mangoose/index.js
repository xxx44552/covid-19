const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/corona-data', {useNewUrlParser: true, useCreateIndex: true});
