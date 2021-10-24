var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
  {
    title: {type: String, required: true},
    desc: {type: String, required: true},
    genre: {type: String, ref: 'Genre', required: true},
    lang: {type: String, ref: 'Lang', required: true},
    link: {type: String, required: true}
  }
);

//Export model
module.exports = mongoose.model('Article', ArticleSchema);