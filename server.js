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
let port = process.env.PORT || 3001;
mongoose.connect('mongodb+srv://admin123:zRIkqj9Pk8Uz2A5I@cluster0.p1ih6.mongodb.net/project', {useNewUrlParser: true,useUnifiedTopology: true }) 
// mongodb+srv://admin123:zRIkqj9Pk8Uz2A5I@cluster0.p1ih6.mongodb.net/test mongodb://localhost/project
const Products = require('./models/model')
// const Cart_Session = require('./models/cart-session')
const addToCart = require('./router/add-to-cart')
const send_confirm = require('./router/send-confirm')

const session = require('express-session');
var cookieParser = require('cookie-parser')

const flash = require('express-flash');
const { send } = require('process');
const Cart = require('./router/Cart');
// const con_flash = require('connect-flash')
const MongoDBStore = require('connect-mongo')(session);

app.use(session({
  secret: 'secret session key',
  resave: false,
  saveUninitialized: true, //flase
  store: new MongoDBStore({
  mongooseConnection: mongoose.connection,
  collection:'sessions'
}),
  cookie:{maxAge:1000 * 60* 60 * 15}, //24hours false
  unset: 'destroy',
  name: 'session-cookie-name'
}));
app.use(flash())
// app.use(con_flash())
app.engine('html', exphbs());
app.set('view engine','html');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/public',express.static(path.join(__dirname,'/public')));
app.use('/store',addToCart)
app.use('/contact',send_confirm)
app.use('/services',send_confirm)
app.use(cookieParser())

app.use((req,res,next)=>{
  res.locals.session = req.session
  // res.locals.cart = new Cart(req.session.cart || []);
  next()
})

//Rendering index.html
app.get('/',(req,res)=>{
    res.render('index.ejs',{msg: req.flash('msg'),msg_failed:req.flash('msg_failed')})
})

//Rendering store.html
app.get('/store',addToCart,async(req,res)=>{
  // const cart = await Cart_Session.find({cartID:req.session},{})
  const db = await Products.find({})
 
  if(!req.session.cart){
    return  res.render('shop.ejs',{db,products:null, msg: req.flash('msg'),maxLimit: req.flash('maxLimit')})
  }
   var cart = new Cart(req.session.cart)
  res.render('shop.ejs',{msg: req.flash('msg'), maxLimit: req.flash('maxLimit'),db,products:cart.generateArray(),totalPrice:cart.totalPrice})
  return
})
app.get('/cart',async(req,res)=>{
   const db = await Products.find({})
  if(!req.session.cart){
    return  res.render('cart.ejs',{products:null,msg: req.flash('msg')})
  }
   var cart = new Cart(req.session.cart)
  res.render('cart.ejs',{
    products:cart.generateArray(),
    totalPrice:cart.totalPrice,
    msg: req.flash('msg'),
    db
  })
  return
})

app.get('/checkout',(req,res)=>{
  
  if(!req.session.cart){
      return  res.redirect('/cart')
  }
  var cart = new Cart(req.session.cart)
  res.render('cart.ejs',{
    products:cart.generateArray(),
    totalPrice:cart.totalPrice, 
    msg: req.flash('msg')})
  return
})

//Rendering services.html
app.get('/services',(req,res)=>{
    res.render('service.ejs',{msg: req.flash('msg'),msg_failed:req.flash('msg_failed')})
})

//Rendering contact.html
app.get('/contact',(req,res)=>{
    res.render('contact.ejs',{msg: req.flash('msg'),msg_failed:req.flash('msg_failed')})
})

//Rendering about.html
app.get('/about',(req,res)=>{
    res.render('about.html',{layout: false})
})

app.listen(port,() => {
    console.log("Success to 3001")
})