const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const projectSchema= new Schema({
    cart:{
        type:Object,
       
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    contact:{
        type:Number,
         require:true
    },
    address:{
        type:String,
         require:true
    },
    receive:{
        type:String,
         require:true
    }
    
});
const orders = mongoose.model('orders',projectSchema);
module.exports = orders