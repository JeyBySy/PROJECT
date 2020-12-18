const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

//Sending Question
router.post('/send-question-confirmation',(req,res)=>{
  if(req.body.name == '' || req.body.email == '' || req.body.number =='' || req.body.message == '' || !Number(req.body.number)){
   req.flash('msg_failed','Process Failed: Please complete and check all the required information if correct')
  return res.redirect('/contact'); // {msg:'email sent'}
    
  }
   const send = `
     <div style="font-size:25px;">
    <p>SOMEONE MESSAGE US</p>
    Name: <strong><u>${req.body.name}</u></strong>
    <br>
    Email: <strong><u>${req.body.email}</u></strong>
    <br>
    Mobile Number: <strong><u>${req.body.number}</u></strong>
    <br>
    <p>Message: <strong><u>${req.body.message}</u></p></strong>
    </div>
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
    from:req.body.email,
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
if(req.body.name == '' || req.body.email == '' || req.body.number =='' || req.body.address == '' || req.body.message == '' || !Number(req.body.number)){
   req.flash('msg_failed','Process Failed: Please complete and check all the required information if correct')
  return res.redirect('/services'); // {msg:'email sent'}
    
  }
    const send = `
     <div style="font-size:25px;">
    <p>AVAILING OF SERVICE</p>
    Name: <strong><u>${req.body.name}</u></strong>
    <br>
    Email: <strong><u>${req.body.email}</u></strong>
    <br>
    Mobile Number: <strong><u>${req.body.number}</u></strong>
    <br>
    Address of Place to be Clean: <strong><u>${req.body.address}</u></strong>
    <br>
    <p>Message: <strong><u>${req.body.message}</u></p></strong>
    </div>
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
     from:req.body.email,
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

router.post('/send-service-confirmation-home',(req,res)=>{
  // console.log(req.body)
  if(req.body.name == '' || req.body.email == '' || req.body.number =='' || req.body.address == '' || req.body.message == '' || !Number(req.body.number)){
   req.flash('msg_failed','Process Failed: Please complete and check all the required information if correct')
  return res.redirect('/'); // {msg:'email sent'}
    
  }
    const send = `
     <div style="font-size:25px;">
    <p>AVAILING OF SERVICE</p>
    Name: <strong><u>${req.body.name}</u></strong>
    <br>
    Email: <strong><u>${req.body.email}</u></strong>
    <br>
    Mobile Number: <strong><u>${req.body.number}</u></strong>
    <br>
    Address of Place to be Clean: <strong><u>${req.body.address}</u></strong>
    <br>
    <p>Message: <strong><u>${req.body.message}</u></p></strong>
    </div>
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
    from:req.body.email,
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
  res.redirect('/'); // {msg:'email sent'}
   });
});


module.exports = router