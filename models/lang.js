var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Lang = new Schema(
  {
    name: {type: String, required: true, min: 3, max: 40},
  }
);

//Export model
module.exports = mongoose.model('Lang', Lang);