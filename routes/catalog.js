var express = require('express');
var router = express.Router();

// Require controller modules.
var article_controller = require('../controllers/articleController');

// GET requrest for list for searching articles
router.get('/search', article_controller.article_search);

// GET request for list of all Genre.
router.get('/create', article_controller.article_create_get);

module.exports = router;