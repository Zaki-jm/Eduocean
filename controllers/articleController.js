var Article = require('../models/article');

const {
    body,
    validationResult
} = require('express-validator');
const MiniSearch = require("minisearch");

var isEmpty = function (obj) {
    return Object.keys(obj).length === 0;
}

exports.article_search = function (req, res, next) {
    body('query').trim().isEmpty().escape() // Validate input using express-validator

    Article.find({}).exec(function (err, list_articles) { //Search all the articles in db
        if (err) {
            return next(err);
        }
        let miniSearch = new MiniSearch({
            fields: ["title", "desc", "genre", "lang"],
            storeFields: ['title', 'desc', 'genre', 'lang', 'link'],
            fuzzy: 0.2
        });
        miniSearch.addAll(list_articles)
        let results = miniSearch.search(req.query.query) //Search article matching query
        if (!isEmpty(results)) { // Got results
            res.render('article_list', {
                articles_list: results
            })
        } else {
            var message = "Nie znaleziono artykułu"
            res.render('error', {
                message
            })
        }
    });
}

// Get random genre article
const randomArticles = async () => {
    const categoryByTemplateKey = {
        randInf: 'Informatyka',
        randMath: 'Matematyka',
        randBiol: 'Biologia',
        randChem: 'Chemia',
        randRoz: 'Rozwój Osobisty',
        randHis: 'Historia',
    };

    const articles = {};
    for (let [key, categoryName] of Object.entries(categoryByTemplateKey)) {
        articles[key] = await Article.findOne({genre: categoryName}).exec();
    }
    return articles;
};

exports.randArt = function(req, res, next) {
    randomArticles().then(articles => {
        res.render('index', articles);
    });
};

// Display Article create form on GET.
exports.article_create_get = function(req, res) {
    res.send('NIE ZAIMPLEMENTOWANE: Article create GET przepraszamy:(');
};

// Handle Article create on POST.
exports.article_create_post = function(req, res) {
    res.send('NIE ZAIMPLEMENTOWANE: Article create POST przepraszamy:(');
};