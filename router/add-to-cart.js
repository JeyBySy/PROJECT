const express = require('express')
const products = require('./../models/model')
const Orders = require('./../models/orders-model')
const Category = require('./../models/category-model')
// const Cart_Orders = require('./../models/cart-model')
const Cart = require('./Cart')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const router = express.Router()
router.use(express.urlencoded({extended:false}))

router.post('/add-to-cart/:id',async(req,res)=>{
  // console.log(req.body.quantity)
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items:{}} )
   await products.findById(productId,async function(err,product){
    if(err){  
      return res.redirect('/store')
    }
    // else if((Number(req.body.quantity)+ Number(cart.qtyProduct)) > product.stocks){
    //   req.flash('maxLimit','Max Quantity of ( '+product.name+' ) is limited to ('+ product.stocks +')')
    //   return res.redirect('/store')
    // }
    // console.log(cart.qtyProduct)
    // console.log(Number(req.body.quantity)+ Number(cart.qtyProduct))
    cart.add(product,product._id,req.body.quantity,req.body.name)
    req.session.cart = cart;
    console.log(req.session.cart)
    return res.redirect('/store')
  })

})

router.get('/reduce/:id',async(req,res,next)=>{
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {})
  await cart.removeOne(productId)
  req.session.cart = cart
  return res.redirect('/cart')
})

router.get('/addOne/:id',async(req,res,next)=>{
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {})
  await cart.addOne(productId)
  req.session.cart = cart
  return res.redirect('/cart')
})

router.get('/remove/:id',async(req,res,next)=>{
   var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {})
  await cart.removeAll(productId)
  req.session.cart = cart
  return res.redirect('/cart')
})

router.post('/place-order',async(req,res)=>{
  // console.log(req.body.productQty[1])
   var cart = new Cart(req.session.cart ? req.session.cart : {})
  //  var min_stocks = products.find({stocks:'100'})
  if(req.body.name != "" && req.body.email != "" && req.body.contact != "" && req.body.address != ""){
  for(let i =0; i < Object.entries(req.session.cart.items).length;i++){
  // console.log(-req.body.productQty[i]/2)
   await products.findOneAndUpdate(
     {
     name:req.body.productName[i].trim()
     },
      {  
        "$inc":{
          "stocks":-req.body.productQty[i]/2
        }
      },(error, result) =>{ 
        if(error){
           console.log(error)
        }
        console.log(result)
       
      }
   )
  }

    var order = new Orders({
    cart:cart,
    name:req.body.name,
    email:req.body.email,
    productName:req.body.productName,
    productQty:req.body.productQty,
    contact:req.body.mobileNumber,
    address:req.body.shippingAddress,
    receive:req.body.receiveOption
  })
  
  order.save(function(err,result){
     if(err){
      console.log(err)
      req.flash('msg','PROCES OF ORDER FAILED')
      return res.redirect('/cart') 
    }
    console.log(result)
    req.flash('msg','ORDER SUCCESS')
    req.session.cart = null
    return res.redirect('/store') 
})
  }else{
    req.flash('msg','PROCES OF ORDER FAILED')
    return res.redirect('/cart') 
  }
})

router.get('/search/:search',async(req,res)=>{
  console.log(req.params.search)
  const search = req.params.search
  const product = await products.find({name:search})

 
  const category = await Category.find({})
  if(!req.session.cart){
    return  res.render('shop.ejs',{category,product,products:null, msg: req.flash('msg'),maxLimit: req.flash('maxLimit')})
  }
   var cart = new Cart(req.session.cart)
  res.render('shop.ejs',{
    category,
    product,
    msg: req.flash('msg'),  
    maxLimit: req.flash('maxLimit'),
    products:cart.generateArray(),
    totalPrice:cart.totalPrice
  })
  return
})
module.exports = router