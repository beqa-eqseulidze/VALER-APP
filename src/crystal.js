const axios=require('axios');

async function getCrystalData(){
    const url='https://crystal.ge/api/wi/rate/v1/cryst?key=52ef35743f3c4f5027d82f051c258241'
    const response=await axios.get(url);
    const data=JSON.parse(response.data.data).data.CurrencyRate;
    return data
        
};

module.exports=getCrystalData;
