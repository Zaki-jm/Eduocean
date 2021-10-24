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
          genreCreate('Rozwój Osobisty', callback);//4
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
          articleCreate("Kanał Youtube Matemaks", "Serwis The Odin Project uczy jak zostac fullstack developerem.", genres[1], langs[0], "https://www.youtube.com/user/matemaks", cb);
        },
        function(callback){
          articleCreate("The Odin Project", "Serwis The Odin Project uczy jak zostac fullstack developerem.", genres[0], langs[0], "https://www.theodinproject.com/", cb);
        },
        function(callback) {
          articleCreate("Serwis ResearchGate", "ResearchGate jest międzynarodowym, bezpłatnym serwisem społecznościowy, który łączy naukowców wszystkich dziedzin.", genres[6], langs[1], "https://www.researchgate.net/", cb);
        },
        function(callback) {
          articleCreate("Kanał Youtube LangFocus", "Langfocus to anglojęzyczny kanał na którym znajdziesz filmiki związane z obcymi językami.", genres[4], langs[1], "https://www.youtube.com/c/Langfocus", cb);
        },
        function(callback) {
          articleCreate("Kanał Youtube RockYourEnglish", "RockYourEnglish to kanał na którym znajdziesz filmiki związane z nauką języka angielskiego.", genres[4], langs[0], "https://www.youtube.com/c/RockYourEnglish", cb);
        },
        function(callback) {
          articleCreate("Kanał Youtube ElektroPrzewodnik", "ElektroPrzewodnik to kanał na którym znajdziesz filmiki i eksperymenty związane z elektroniką.", genres[0], langs[0], "https://www.youtube.com/user/ElektroPrzewodnik", cb);
        },
        function(callback) {
          articleCreate("Kanał Youtube Biomist", "Biomist to kanał na którym znajdziesz filmiki i eksperymenty związane z chemią.", genres[3], langs[0], "https://www.youtube.com/user/biomist24/videos", cb);
        },
        function(callback) {
          articleCreate("Strona Cmentarza Powązkowskiego", "Nieoficjalna Stronie Cmentarza Powązkowskiego w Warszawie na której są opisane związane z nim informacje.", genres[5], langs[0], "http://starepowazki.sowa.website.pl/", cb);
        },
        function(callback) {
          articleCreate("Wirtualne muzeum Roberta Borzęckiego", "Strona wirtualnego muzeum, na którym znajdziesz opisy i zdjęcia wielu minerałów.", genres[6], langs[0], "http://www.redbor.pl/0_images/menu/0_menu.htm", cb);
        },
        function(callback) {
          articleCreate("Strona Grzegorza Jagodzińskiego", "Prosta strona na której znajdziesz wiele przydatnych informacji na temat polskiej gramatyki wraz z kursami z nią związanymi.", genres[4], langs[0], "http://grzegorz.jagodzinski.prv.pl/gram/index.html", cb);
        },
        function(callback) {
          articleCreate("Aplikacja internetowa WolframpAlpha", "WolframpAlpha jest wielofunkcyjnym przeglądarkowym kalkulatorem.", genres[2], langs[1], "https://www.wolframalpha.com/", cb);
        },
        function(callback) {
          articleCreate("Czasopismo Eliksir", "''Eliksir'' jest czasopismem naukowo-dydaktycznym Wydziału Chemicznego Politechniki Łódzkiej nr 9/2019.", genres[3], langs[0], "http://repozytorium.p.lodz.pl/handle/11652/3244", cb);
        },
        function(callback) {
          articleCreate("Strona Examine", "Examine jest stroną na której znajdziesz działanie i zastosowanie różnorodnych leków i suplementów diety", genres[4], langs[1], "https://www.theodinproject.com/", cb);
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



