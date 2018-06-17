const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const tweets     = require('./routes/tweets');


const app = express();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, `../client/build`)));


// ===== ROUTES ===== //
app.use('/linqia', tweets);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(PORT, () => console.log('Starting on ' + PORT))