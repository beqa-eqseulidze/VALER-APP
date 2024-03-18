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
const getGiraoData = require('./giro');
const getRicoData = require('./rico');
const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const valuto = await getValutoData();
    const crystal = await getCrystalData();
    const girao = await getGiraoData();
    const rico = await getRicoData();
    res.render('index', {
        allData: [{ valuto }, { crystal }, { girao }, { rico }]
    })
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`app listen port: ${PORT}...`)

})




