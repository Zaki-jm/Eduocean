var express = require('express');
var router = express.Router();
var article_controller = require('../controllers/articleController');

/* GET home page. */
router.get('/', article_controller.randArt);

module.exports = router;
