const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

//parse request of content-type app/json
app.use(bodyParser.json())

//config for db
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
require('./app/routes/note.routes.js')(app);
mongoose.Promise = global.Promise;

//establishing a connectin to the db
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true 
}).then(() => {
    console.log("Successfully connected to the db");
}).catch(err => {
    console.log("Cannot connect to the db. Exiting now", err);
    process.exit();
});

//define a root
app.get('/', (req,res) => {
    res.json({"Message": "OK"});
});


//listen for requests
app.listen(3000, () => {
    console.log("Listenning on port 3000");
});