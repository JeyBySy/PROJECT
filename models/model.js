const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
const projectSchema= new Schema({
image:{
    type:String,
    default:"default.jpg"
},
category:{
    type:String
},
name:{
    type:String
},
price: {
    type:Number
},
stocks: {
    type:Number
},
description:{
    type:String
},
size:{
    type:String
},
color:{
    type:String
},
date:{
    type:Date,
    default:()=>Date.now("YYYY-mm-dd")
}

});
const project= mongoose.model('products',projectSchema);
module.exports = project