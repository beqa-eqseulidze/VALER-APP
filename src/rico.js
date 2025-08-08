const cheerio = require('cheerio');
const got = require('got');

async function getRicoData() {
    try{
        let url = 'https://www.rico.ge/';
        const response = await got(url);
        const $ = cheerio.load(response.body);
        const result = [];
        const res = $('.first-table-body');
        res.find('tr').map(function (el) { 
                const tds=$(this).find('td').map(function(td){ return $(this).text().trim()}).toArray();
                result.push(tds.reduce((a,b,i)=>{
                    let obj = {};
                    switch (i) {
                        case 0:
                            obj.ISO = b;
                        case 1:
                            obj.AMOUNT_BUY = b;
                        case 2:
                            obj.AMOUNT_SELL = b;
                    }
                    return { ...a, ...obj }
                },{ NBGRate: null, NBGRateDiff: null }))
                return $(this).text() 
            })        
        return result;
    }catch (error){      
        console.log(error)
        return []  
    }
    
};

module.exports = getRicoData;


