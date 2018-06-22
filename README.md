# Mongo-Scraper

## Overview

Mongo-Scraper is an app that scrapes articles from Neuroscience News (https://neurosciencenews.com/neuroscience-topics/neuroscience/) and lets users save articles and leave comments on the latest articles.

A live version can be found here: https://mighty-coast-77800.herokuapp.com/

![Website](https://github.com/skobayash/Mongo-Scraper/blob/master/public/images/readme.png)

![Website](https://github.com/skobayash/Mongo-Scraper/blob/master/public/images/comments.png)

## Installation
### Clone to your local repository
To clone Mongo-Scraper to your local repository, enter the following in your terminal/bash window:
``` git clone https://github.com/skobayash/Mongo-Scraper.git ```

### Install dependencies
Install the following dependencies for Mongo-Scraper: ``` npm install ```
Dependencies:
* axios
* body-parser
* cheerio
* ejs
* express
* mongoose
* morgan

### Initialize
#### Local server:
* To run on a local server, navigate to your local Mongo-Scraper repository in your terminal/bash window and enter the following: ``` node server.js ```
* In your preferred browser, navigate to PORT 3000 by typing the following in your url: http://localhost:3000

#### OR Heroku:
* A live version of Mongo-Scraper can also be found at: https://mighty-coast-77800.herokuapp.com/

## How It Works

1. Scrape articles by clicking on the "Scrape Articles" button.
3. Add commments to an article by clicking on the article. A comment card will appear to the right of the article and click save to view them later.
