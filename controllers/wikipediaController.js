
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const cheerio = require('cheerio');
const he = require('he'); 

const url = "https://en.wikipedia.org/w/api.php";

const wikipediaController = {};

wikipediaController.getInfo = async (req, res, next) => {
    console.log("test");
    const params = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: req.body.query,
        format: "json",
    });

    try {
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();

        const details = {
            "numberOfHits": data.query.searchinfo.totalhits,
            "firstHit": data.query.search[0].snippet
        };

        details.firstHit = he.decode(details.firstHit); //trying to decode the html coming in 

        const $ = cheerio.load(details.firstHit);
        details.firstHit = $.text();

        res.locals.details = details;
        next();
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

module.exports = wikipediaController;