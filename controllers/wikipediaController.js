/*
* TODO: 
    * - Create Endpoint that searches wikipedia api for query input
        * - Return json response containing numberOfHits, first hit 

*/
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const url = "https://en.wikipedia.org/w/api.php";

const wikipediaController = {};

wikipediaController.getInfo = async (req, res, next) => {
    console.log("test");
    const params = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: req.body.query,
        format: "json",
        // origin: location.origin
    });

    console.log(`${url}?${params}`);
    try {
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();

        console.log('.then');
        console.log(data);

        const details = {
            "numberOfHits": data.query.searchinfo.totalhits,
            "firstHit": data.query.search[0].snippet
        };

        res.locals.details = details;
        console.log(details);
        next();
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

module.exports = wikipediaController;