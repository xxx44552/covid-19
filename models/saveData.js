const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
      data: {
        type: Object,
        required: true,
      },
    },{
      timestamps: true
    });

const SaveData = mongoose.model("SaveData", userScheme);

module.exports = SaveData;
