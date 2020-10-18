const express = require('express')
const nodemailer = require('nodemailer')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path')
const { urlencoded } = require('body-parser');
const { info } = require('console');

const app = express();
let port = 3000;

app.engine('html', exphbs());
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/public',express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port, () => {
    console.log("Success to 3000")
})