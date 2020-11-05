const project = require('./models/model')
mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true});
project.create({
category:'janitorial supplies',
name: 'SAMPLE',
price: 100,
picture: 'SAMPLE PICTURE',
description: 'SAMPLE DESCRIPTION'
}, (error, blogpost) =>{
console.log(error,blogpost)
})
