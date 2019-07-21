const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  description: String,
  img_url: String
});

const City = mongoose.model('City', citySchema);

module.exports = City;
