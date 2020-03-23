const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userScheme = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  countries: {
    type: Object,
    require: true
  }
}
,{
  timestamps: true
});

const Subscriber = mongoose.model("Subscriber", userScheme);

module.exports = Subscriber;
