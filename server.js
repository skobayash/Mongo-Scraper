/* Dependencies */
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");   // Require all models js files

/* Setting Port */
var PORT = process.env.PORT || 3000;

/* Express Configuring */
var app = express();    // Initializing Express
app.use(logger("dev")); // Configuring morgan & bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');  // Setting EJS as view
app.use(express.static("public"));  // Making public static


/* Connecting to mongodb */
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/neuronews", {});


/* Routes */

// Setting index.ejs as landing
app.get('/', function (req, res) {
    res.render('pages/index');
});

// Scraping Neuro News Website
app.get("/scrape", function (req, res) {

    axios.get('https://neurosciencenews.com/neuroscience-topics/neuroscience/').then(function (response) {

        var $ = cheerio.load(response.data);    // Loading html/response into cheerio

        $('article.cb-blog-style-a').each(function (i, element) {    // Anchoring scrape in all article sections
            var result = {};

            result.title = $(this).children().children('h2').text();
            result.link = $(this).children().children('a').attr('href');
            result.excerpt = $(this).children().children('.cb-excerpt').text().slice(0, -18);
            result.image = "https:" + $(this).find('img').attr('src');

            db.Article.create(result)   // Creating new article schema object from result object
                .then(function (newArticle) {
                    console.log(newArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });

        });
        res.send("Successfully Scraped.");
    });
});


// Grabbing all neuro articles
app.get("/articles", function (req, res) { 
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Finding particular article & populating with saved comments
app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("comment")    // Populating article with its saved comments
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Creating & updating comments
app.post("/articles/:id", function (req, res) {
    db.Comment.create(req.body)     // Creating new comment schema object
        .then(function (dbComment) {    // Finding & updating comment
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});


app.listen(PORT, function () {
    console.log("App running on http://localhost:" + PORT);
});
