const cheerio = require('cheerio');
const got = require('got');

function stringToCurrencyObj(inputString) {
    // Regular expressions to extract values
    const regexCurrency = /<tdclass="currency">(.*?)<\/td>/;
    const regexBuyPrice = /<tdclass="buy_price">(.*?)<\/td>/;
    const regexSellPrice = /<tdclass="sell_price">(.*?)<\/td>/;
    const regexNBGRate = /<tdclass="nbg_rate">(.*?)<\/td>/;

    // Extracting values
    const isoMatch = inputString.match(regexCurrency);
    const buyPriceMatch = inputString.match(regexBuyPrice);
    const sellPriceMatch = inputString.match(regexSellPrice);
    const nbgRateMatch = inputString.match(regexNBGRate);

    // Constructing the object
    return {
        ISO: isoMatch ? isoMatch[1] : '',
        AMOUNT_BUY: buyPriceMatch ? parseFloat(buyPriceMatch[1]) : 0,
        AMOUNT_SELL: sellPriceMatch ? parseFloat(sellPriceMatch[1]) : 0,
        NBGRate: nbgRateMatch ? parseFloat(nbgRateMatch[1]) : 0,
        NBGRateDiff: 0 // Assuming NBGRateDiff is always 0 initially
    };
}


async function getGiroData() {
    let url = 'https://girocredit.ge/web/';
    let result;
    try {
        const response = await got(url);
        const $ = cheerio.load(response.body);
        const res = $('form tbody');
        let tableRows = res.find('tr').map(function (el) {
            return $(this).html();
        }).toArray();
        result = tableRows.map((tr) => {
            const str = tr.replaceAll(' ', '').replaceAll('</td>', '</td>,')
            let res = stringToCurrencyObj(str)
            return res

        });
        return result
    } catch {
        return []
    }

};

module.exports = getGiroData;


