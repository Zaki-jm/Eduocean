#! /usr/bin/env node
// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var Article = require('./models/article')
var Genre = require('./models/genre')
var Lang = require('./models/lang')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var genres = []
var articles = []
var langs = []

function genreCreate(name, cb) {
  genredetail = { 
    name: name
  }

  var genre = new Genre(genredetail);    
  genre.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Genre: ' + genre);
      cb(err, null)
      return
    }
    console.log('New Genre: ' + genre);
    genres.push(name)
    cb(null, articles)
  });
}

function articleCreate(title, desc, genre, lang, link, cb) {
  articledetail = { 
    title: title,
    desc: desc,
    genre: genre,
    lang: lang,
    link: link,
  }
  if (genre != false) articledetail.genre = genre
    
  var article = new Article(articledetail);    
  article.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Article: ' + article);
    articles.push(article)
    //cb(null, article)
  });
}


function langCreate(name, cb) {
  langdetail = { 
    name: name
  }

  var lang = new Lang(langdetail);    
  lang.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Lang: ' + lang);
      cb(err, null)
      return
    }
    console.log('New Lang: ' + lang);
    langs.push(name)
    cb(null, articles)
  });
}


function createGenre(cb) {
    async.series([
        function(callback) {
          genreCreate('Informatyka', callback);//0
        },
        function(callback) {
          genreCreate('Matematyka', callback);//1
        },
        function(callback) {
          genreCreate('Biologia', callback);//2
        },
        function(callback) {
          genreCreate('Chemia', callback);//3
        },
        function(callback) {
          genreCreate('Rozw??j Osobisty', callback);//4
        },
        function(callback) {
          genreCreate('Historia', callback);//5
        },
        function(callback) {
          genreCreate('Inne', callback);//6
        }
        ],
        // optional callback
        cb);
}

function createLang(cb) {
  async.series([
      function(callback) {
        langCreate('Polski', callback)
      },
      function(callback) {
        langCreate('Angielski', callback)
      },
      function(callback) {
        langCreate('Niemiecki', callback)
      },
      function(callback) {
        langCreate('Francuski', callback)
      }
      ],
      // Optional callback
      cb);
}

function createArticles(cb) {
    async.parallel([
        function(callback){
          articleCreate("Kana?? Youtube Matemaks", "Serwis The Odin Project uczy jak zostac fullstack developerem.", genres[1], langs[0], "https://www.youtube.com/user/matemaks", cb);
        },
        function(callback){
          articleCreate("The Odin Project", "Serwis The Odin Project uczy jak zostac fullstack developerem.", genres[0], langs[0], "https://www.theodinproject.com/", cb);
        },
        function(callback) {
          articleCreate("Serwis ResearchGate", "ResearchGate jest mi??dzynarodowym, bezp??atnym serwisem spo??eczno??ciowy, kt??ry ????czy naukowc??w wszystkich dziedzin.", genres[6], langs[1], "https://www.researchgate.net/", cb);
        },
        function(callback) {
          articleCreate("Kana?? Youtube LangFocus", "Langfocus to angloj??zyczny kana?? na kt??rym znajdziesz filmiki zwi??zane z obcymi j??zykami.", genres[4], langs[1], "https://www.youtube.com/c/Langfocus", cb);
        },
        function(callback) {
          articleCreate("Kana?? Youtube RockYourEnglish", "RockYourEnglish to kana?? na kt??rym znajdziesz filmiki zwi??zane z nauk?? j??zyka angielskiego.", genres[4], langs[0], "https://www.youtube.com/c/RockYourEnglish", cb);
        },
        function(callback) {
          articleCreate("Kana?? Youtube ElektroPrzewodnik", "ElektroPrzewodnik to kana?? na kt??rym znajdziesz filmiki i eksperymenty zwi??zane z elektronik??.", genres[0], langs[0], "https://www.youtube.com/user/ElektroPrzewodnik", cb);
        },
        function(callback) {
          articleCreate("Kana?? Youtube Biomist", "Biomist to kana?? na kt??rym znajdziesz filmiki i eksperymenty zwi??zane z chemi??.", genres[3], langs[0], "https://www.youtube.com/user/biomist24/videos", cb);
        },
        function(callback) {
          articleCreate("Strona Cmentarza Pow??zkowskiego", "Nieoficjalna Stronie Cmentarza Pow??zkowskiego w Warszawie na kt??rej s?? opisane zwi??zane z nim informacje.", genres[5], langs[0], "http://starepowazki.sowa.website.pl/", cb);
        },
        function(callback) {
          articleCreate("Wirtualne muzeum Roberta Borz??ckiego", "Strona wirtualnego muzeum, na kt??rym znajdziesz opisy i zdj??cia wielu minera????w.", genres[6], langs[0], "http://www.redbor.pl/0_images/menu/0_menu.htm", cb);
        },
        function(callback) {
          articleCreate("Strona Grzegorza Jagodzi??skiego", "Prosta strona na kt??rej znajdziesz wiele przydatnych informacji na temat polskiej gramatyki wraz z kursami z ni?? zwi??zanymi.", genres[4], langs[0], "http://grzegorz.jagodzinski.prv.pl/gram/index.html", cb);
        },
        function(callback) {
          articleCreate("Aplikacja internetowa WolframpAlpha", "WolframpAlpha jest wielofunkcyjnym przegl??darkowym kalkulatorem.", genres[2], langs[1], "https://www.wolframalpha.com/", cb);
        },
        function(callback) {
          articleCreate("Czasopismo Eliksir", "''Eliksir'' jest czasopismem naukowo-dydaktycznym Wydzia??u Chemicznego Politechniki ????dzkiej nr 9/2019.", genres[3], langs[0], "http://repozytorium.p.lodz.pl/handle/11652/3244", cb);
        },
        function(callback) {
          articleCreate("Strona Examine", "Examine jest stron?? na kt??rej znajdziesz dzia??anie i zastosowanie r????norodnych lek??w i suplement??w diety", genres[4], langs[1], "https://www.theodinproject.com/", cb);
        },
        ]);
}


async.series([
    createLang,
    createGenre,
    createArticles
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Langs: '+ langs);
        console.log('Genres: '+ genres);
        console.log('Articles: '+ articles); 
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



