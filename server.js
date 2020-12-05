const express = require('express')
const nodemailer = require('nodemailer')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const ejs = require('ejs');
const { urlencoded } = require('body-parser');
const { info } = require('console');
const { model } = require('./models/model');
const app = express();
let port = 3001;
mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true,useUnifiedTopology: true })
const products = require('./models/model')
const addToCart = require('./router/add-to-cart')

const session = require('express-session');
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo')(session);

app.use(session({
  secret: 'secret session key',
  resave: false,
  saveUninitialized: true, //flase
  store: new MongoDBStore({
  mongooseConnection: mongoose.connection,
  collection:'sessions'
}),
  cookie:{maxAge:1000 * 60* 60 * 24}, //24hours
  unset: 'destroy',
  name: 'session-cookie-name'
}));
app.use(flash())

app.engine('html', exphbs());
app.set('view engine','html');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/public',express.static(path.join(__dirname,'/public')));
app.use('/store',addToCart)

// app.use((req,res,next)=>{
//   res.locals.session = req.session
//   next()
// })

//Rendering index.html
app.get('/',(req,res)=>{
    res.render('index.html',{layout: false})
})
//Rendering confirm message
app.get('/confirm',(req,res)=>{
    res.render('confirm.html',{layout: false})
})

//Rendering store.html
app.get('/store',addToCart,async(req,res)=>{
  //  if(!req.session.test) {
  //   req.session.test = 'OK';
  //   res.send('OK');
  // }
  // console.log(req.session)
  const db = await products.find({})
  res.render('shop.ejs',{db})
})

//Rendering services.html
app.get('/services',(req,res)=>{
    res.render('service.html',{layout: false})
})

//Rendering contact.html
app.get('/contact',(req,res)=>{
    res.render('contact.html',{layout: false})
})

//Rendering about.html
app.get('/about',(req,res)=>{
    res.render('about.html',{layout: false})
})

//sending email 
app.post('/send-service-confirmation',(req,res)=>{
//   console.log(req.body)
    const send = `
    <p>You have new contact request</p>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Mobile Number: ${req.body.number}</li>
    <li>Address of Place to be Clean: ${req.body.address}</li>
    </ul>
    <p>Message: ${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'companybeylands@gmail.com',
      pass: 'beylandsofficial'
  },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    // from:'njcocosa@gmail.com',
    to: 'companybeylands@gmail.com', // list of receivers
    subject: "[ IMPORTANT ] AVAILING OF SERVICE", // Subject line
    // text: "Hello world?", // plain text body
    html: send, // html body
  };
  transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
      return console.log(error)
    }
 
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // res.redirect('/confirm')
  res.render('confirm.html',{layout: false}); // {msg:'email sent'}
   });
});

//Sending Question
app.post('/send-question-confirmation',(req,res)=>{
 const send = `
    <p>You have new contact request</p>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Mobile Number: ${req.body.number}</li>
    </ul>
    <p>Message: ${req.body.message}</p>
    `;
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'companybeylands@gmail.com',
      pass: 'beylandsofficial'
  },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    // from:'njcocosa@gmail.com',
    to: 'companybeylands@gmail.com', // list of receivers
    subject: "[ MESSAGE ] WANT TO REACH OUT", // Subject line
    // text: "Hello world?", // plain text body
    html: send, // html body
  };
  transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
      return console.log(error)
    }
 
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // res.redirect('/confirm')
  res.render('confirm.html',{layout: false}); // {msg:'email sent'}
   });
})

app.listen(port,() => {
    console.log("Success to 3001")
})