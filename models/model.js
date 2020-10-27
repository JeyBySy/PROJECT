const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const projectSchema= new Schema({
category:String,
name: String,
price: Number,
picture: String,
description: String
});
const project= mongoose.model('product',projectSchema);
module.exports = project