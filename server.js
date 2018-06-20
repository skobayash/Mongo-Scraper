var cheerio = require('cheerio');
var request = require('request');
// var mongojs = require('mongojs');
// var express = require('express');

// var app = express();    // Initializing Express

// // DB configuration
// var databaseUrl = 'scraper';
// var collections = ['scrapedNews'];



console.log("Grabbing article headline & link from BBC");

// request('https://www.nytimes.com/', function(error, response, html) {
request('https://neurosciencenews.com/neuroscience-topics/neuroscience/', function(error, response, html) {
    var $ = cheerio.load(html); //loading html into cheerio
    var results = [];

    $('div.cb-meta').each(function(i, element) {
        var title = $(element).children().text();
        var link = $(element).children().children().attr('href');

        $('div.cb-excerpt').each(function(i, element) {
            var excerpt = $(element).text().slice(1, -18);

            results.push({
                title: title,
                link: link,
                excerpt: excerpt
            });

        });
    });


    console.log(results);
})
