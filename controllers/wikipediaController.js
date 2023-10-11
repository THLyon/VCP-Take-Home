/*
* TODO: 
    * - Create Endpoint that searches wikipedia api for query input
        * - Return json response containing numberOfHits, first hit 

*/

// const fetch = require('node-fetch');

let url = "https://en.wikipedia.org/w/api.php"; 

// let params = new URLSearchParams({
//     action: "query", 
//     list: "search", 
//     srsearch: req.body.query, 
//     format: "json", 
//     origin: location.origin
// })

const wikipediaController = {}; 

wikipediaController.getInfo = (req, res, next) => {
    let params = new URLSearchParams({
        action: "query", 
        list: "search", 
        srsearch: req.body.query, 
        format: "json", 
    })

    fetch(`${url}?${params}`)
    .then((data) => data.json())
    .then((data) => {
        const details = {
            "numberOfHits": data.query.searchinfo.totalhits, 
            "firstHit": data.query.search.snippet 
        }
        res.locals.details = details; 
        console.log(details); 
        return next() 
    })
    .catch(err => {
        console.error(err); 
        return next(err)
    })
}

module.exports = wikipediaController;