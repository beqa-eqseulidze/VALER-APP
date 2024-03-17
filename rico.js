const cheerio = require('cheerio');
const got = require('got');

async function getRicoData() {
    let url = 'https://www.rico.ge/';
    const response = await got(url);
    const $ = cheerio.load(response.body);
    const res = $('#block-currencyblock');
    let tableRows = res.find('tr').map(function (el) { return $(this).text() }).toArray();
    const result = [];
    tableRows.forEach((tr) => {
        let i = 0;
        let res = tr.split(' ').reduce((a, b) => {
            if (b !== '' && b !== '\n' && b.trim() !== 'ყიდვა' && b.trim() !== 'გაყიდვა') {
                b = b.replace('\n', '');
                let obj = {};
                switch (i) {
                    case 0:
                        obj.ISO = b;
                    case 1:
                        obj.AMOUNT_BUY = b;
                    case 2:
                        obj.AMOUNT_SELL = b;
                }
                i++;
                return { ...a, ...obj }
            }
            return a
        }, { NBGRate: null, NBGRateDiff: null });
        if ((res.ISO && res.AMOUNT_BUY && res.AMOUNT_SELL)) result.push(res);
    });
    return result;
};

module.exports = getRicoData;


