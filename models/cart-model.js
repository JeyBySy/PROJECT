const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const projectSchema= new Schema({
    cart:{
        type:Object,
        required:true,
    }
    
});
const cart_orders = mongoose.model('cart-orders',projectSchema);
module.exports = cart_orders