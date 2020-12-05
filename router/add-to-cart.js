const express = require('express')
const products = require('./../models/model')
const Cart = require('./../public/js/cart')
const router = express.Router()

router.get('/add-to-cart/:id',(req,res)=>{
  res.render('/store')
})

module.exports = router