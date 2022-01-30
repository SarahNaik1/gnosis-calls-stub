var cors = require('cors')
const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

let count = 2;

const readFileAndSendRes = (fileName, res) => {
    fs.readFile( `${__dirname}/stub-calls/${fileName}.json`, 'utf-8', (err, data) => {
        res.end(data);
    });
};

app.use(cors());

app.get('/', (req, res) => res.send('Hello World'));

app.get('/v1/chains', (req, res) => {
    readFileAndSendRes('chains-stub-call', res);
});

app.post('/v3', (req, res) => {
    let content = JSON.parse(fs.readFileSync(`${__dirname}/stub-calls/rinkeby-infuria-call.json`, 'utf8'));
    content.id = count;
    console.log(count);
    count++;
    fs.writeFileSync(`${__dirname}/stub-calls/rinkeby-infuria-call.json`, JSON.stringify(content));
    readFileAndSendRes('rinkeby-infuria-call', res);
});

app.get('/v1/chains/4/safes/:id', (req, res) => {
    readFileAndSendRes('safes-call', res);
});

app.get('/v1/chains/4/safes/:id/balances/USD', (req, res) => {
    readFileAndSendRes('safe-balances-call', res);
});

app.get('/v1/chains/4/safes/:id/collectibles', (req, res) => {
    readFileAndSendRes('safes-collectibles-call', res);
});

app.get('/v1/chains/4/safes/:id/transactions/history', (req, res) => {
    readFileAndSendRes('safes-transaction-history-call', res);
});

app.get('/v1/chains/4/safes/:id/transactions/queued', (req, res) => {
    readFileAndSendRes('safes-transaction-queued-call', res);
});

app.get('/v1/balances/supported-fiat-codes', (req, res) => {
    readFileAndSendRes('supported-fiat-codes', res);
});

app.get('/api', (req, res) => {
    readFileAndSendRes('rinkeby-api-etherscan', res);
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
