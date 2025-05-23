// {
//     // ISO: 'AMD',
//     // NBGRate: 6.5882,
//     // NBGRateDiff: 0.0002,
//     // AMOUNT_BUY: 5.3665,
//     // AMOUNT_SELL: 6.7555
//   }
const express = require('express');
const getCrystalData = require('./crystal');
const getValutoData = require('./valuto');
const getGiroData = require('./giro');
const getRicoData = require('./rico');
const getKursiData = require('./kursi');
const app = express();
let allData;
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const valuto = await getValutoData();
    const crystal = await getCrystalData();
    const giro = await getGiroData();
    const rico = await getRicoData();
    const kursi = await getKursiData();
    allData = [{ valuto }, { crystal }, { giro }, { rico }, {kursi}];
    const html=renderPage(allData);
    res.type('html').send(html)    ;
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`app listen port: ${port}...`)

})

function getTopHtml() {
    return `
    <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Currency App</title>
            <style>
                *{
                    margin:0;
                    padding: 0;
                    box-sizing: border-box;
                }
                h1{
                    text-align: center;
                    margin: 20px;
                }
                h2{
                    margin: 10px;
                }
                .cards{
                    display: flex;
                    flex-wrap: wrap;  
                    gap: 10px;   
                    justify-content: center;                
                }
                .card{
                    width:300px;
                    display:flex;
                    flex-direction: column;
                    align-items: center;           
                }
                table,tr,td,th{
                    border-collapse: collapse;
                    border:1px solid black;
                }
                table{
                    width:100%;     
                    font-size: 20px;                   
                }
                tr{
                    cursor: pointer;
                }
                tr:hover{
                    background-color: rgb(172, 155, 155);
                }
                    
                    

            </style>
        </head>

        <body>
            <h1>Currencies</h1>
            <div class="cards">    
    `
}
function getBottomHtml() {
    return `
            </div>

            <script>
                setInterval(()=>{
                    window.location.reload()
                },(5*60*1000))
            </script>
        </body>

        </html>
    `
}

function getTableRows(currencies) {
    let result = ''
    for (let currency of currencies) {
        result += `
                <tr>
                    <td>
                        ${currency.ISO}              
                    </td>
                    <td>
                        ${(+currency.AMOUNT_BUY).toFixed(4)}                
                    </td>
                    <td>
                        ${(+currency.AMOUNT_SELL).toFixed(4)}  
                    </td>
                </tr>
            `
    }
    return result
}

function getMiddleHtml(allData) {
    let result = '';
    for (let company of allData) {
        result += `
                    <div class="card">
                    <h2>${Object.keys(company)[0]}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Currency</th>
                                <th>buy</th>
                                <th>sell</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${getTableRows(Object.values(company)[0])}
                        </tbody>
                    </table>
                </div> 
                `
    }

    return result
}

function renderPage(allData){
    return getTopHtml() + getMiddleHtml(allData) + getBottomHtml();
}

