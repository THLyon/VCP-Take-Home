const yahooFinance = require('yahoo-finance2').default;

const marketController = {};

marketController.getInfo = async (req, res, next) => {
    const symbols = req.body.symbols; // Assuming symbols are sent in the request body
    try {
        const data = await yahooFinance.quote(symbols);
        res.locals.details = data;
        console.log(data)
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
};

marketController.assessMarketStatus = (data) => {
    const results = [];

    // Define your threshold for heating and cooling (e.g., 10%)
    const heatingThreshold = 10;
    const coolingThreshold = -10;

    data.forEach((stock) => {
        const { longName, symbol, regularMarketPrice, fiftyTwoWeekHigh, fiftyTwoWeekLow } = stock;
        const highPercentage = ((regularMarketPrice - fiftyTwoWeekHigh) / fiftyTwoWeekHigh) * 100;
        const lowPercentage = ((regularMarketPrice - fiftyTwoWeekLow) / fiftyTwoWeekLow) * 100;

        let status = "Neutral";
        if (highPercentage >= heatingThreshold) {
            status = "Heating";
        } else if (lowPercentage <= coolingThreshold) {
            status = "Cooling";
        }

        results.push({
            longName, 
            symbol,
            status,
            highPercentage,
            lowPercentage,
        });
    });

    // Calculate the overall market health based on individual statuses
    const overallStatus = calculateOverallStatus(results);

    return {
        overall: overallStatus,
        stocks: results,
    };
};

const calculateOverallStatus = (stocks) => {
    // Count the number of stocks in each category
    let heatingCount = 0;
    let coolingCount = 0;
    let neutralCount = 0;

    stocks.forEach((stock) => {
        if (stock.status === "Heating") {
            heatingCount++;
        } else if (stock.status === "Cooling") {
            coolingCount++;
        } else {
            neutralCount++;
        }
    });

    // Determine the overall market status based on the counts
    if (heatingCount > coolingCount && heatingCount > neutralCount) {
        return "Market health for given stocks is Heating";
    } else if (coolingCount > heatingCount && coolingCount > neutralCount) {
        return "Market health for given stocks is Cooling";
    } else {
        return "Market health for given stocks is Neutral";
    }
};

module.exports = marketController;