const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const projectSchema= new Schema({
    category:{
        type:String,
        
    }
    
});
const category = mongoose.model('category',projectSchema);
module.exports = category