const axios = require('axios');

async function getKursiData() {
    try {
        const url = 'https://api.kursi.ge:8080/api/public/currencies';
        const response = await axios.get(url);
        const data = response.data;
        const result = filterData(data);
        return result
    }
    catch {
        console.error('error with getKursiData methid ')
        return []
    }

}

function filterData(data) {       
    return data.filter(el=>el.baseCurrencyCode==='GEL').map(k => {
        return {
            ISO:k.secondaryCurrencyCode,
            NBGRate: k.nbgRate,
            NBGRateDiff: k.diff,
            AMOUNT_BUY: k.buyRate,
            AMOUNT_SELL: k.sellRate
        }        
    })

    
}

module.exports = getKursiData