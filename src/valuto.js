const axios=require('axios');

async function getValutoData(){
    try{
        const url='https://valuto.ge/wp-json/rest-currency-list/v3/currencies';
        const response=await axios.get(url);
        const data=response.data.data.currencies;
        const result=filterValutoData(data);
        return result
    }
    catch{
        return []
    }
    
}

function filterValutoData(data){
    const res=[];
     Object.keys(data).map(k=>{
        let newObj={};
        if(k.includes('GEL')){            
            newObj.ISO=data[k].CcFrom,
            newObj.NBGRate= data[k].nbg,
            newObj.NBGRateDiff=data[k]._nbg_diff,
            newObj.AMOUNT_BUY=data[k].buy,
            newObj.AMOUNT_SELL=data[k].sell   
            res.push(newObj);          
        }
    })
    return res       

}

module.exports=getValutoData