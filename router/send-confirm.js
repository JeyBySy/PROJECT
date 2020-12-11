const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

//Sending Question
router.post('/send-question-confirmation',(req,res)=>{
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
  req.flash('msg','Send Successfully')
 res.redirect('/contact'); // {msg:'email sent'}
   });
})

//sending email 
router.post('/send-service-confirmation',(req,res)=>{
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
  req.flash('msg','Send Successfully')
  res.redirect('/services'); // {msg:'email sent'}
   });
});


module.exports = router