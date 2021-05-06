const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5';
const options = {
    method: 'GET',
    headers: {
        'X-CMC_PRO_API_KEY': 'cb701616-6d64-491d-81ed-aecdeff42d99'
    },
};
fetch(url, options).then(res => res.json()).then(json => console.log(json));
    