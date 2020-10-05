var express = require('express');
const nodemailer =require('nodemailer');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res) {

    // +++++++++++++++ NODE MAILER +++++++++++++++++
    const output =`
      <div>
      <h1>New Inquiry </h1>
      <li> <strong>Name:</strong> ${req.body.name}</li>
      <li> <strong>Email:</strong> ${req.body.email}</li>
      <li> <strong>Mobile:</strong> ${req.body.phone}</li>
      <li> <strong>Message:</strong> ${req.body.message}</li>
      </ul>
      </div>
      `;
      // create reusable transporter object using the default SMTP transport
      // transporter
      let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        service:"gmail",
        port: 587,
        secure: false,  // true for 465, false for other ports{587}
        auth: {
          user: 'digital.visiting.card.in@gmail.com', 
          pass: `#DigitalCard66!`  
        },
        tls:{
          rejectUnauthorized:false
        }
      });
      // transporter ends
      
      // setup email data with unicode symbols
        // mailoptions
        let mailOptions = {
          from: "'BM site Inquiry'",
          to: `${req.body.clientMail}`,
          cc:"ppkbit@gmail.com",
          subject: 'Contact Request', // Subject line
          text: 'inquiry', // plain text body
          html: output // html body
        };
        // mailoptions ends
        
        
        // sendmail
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(`sendMail error: ${error}`);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          
          // res.render('main',{layout:false});
         
          res.end();
        });
        // sendmail ends
        
        
        
        console.log(req.body);
        // res.send(
        //   `Dear ${req.body.name}, We have recieved your message and we will contact you soon.`,
        //   );
          res.redirect('/')
          // +++++++++++++++ NODE MAILER +++++++++++++++++
             
       // +++++++++++++++ JSON +++++++++++++++++
    let incomingData={
      "clientId": `${req.body.clientId}`,
      "name": `${req.body.name}`,
      "email": `${req.body.email}`,
      "phone": `${req.body.phone_no}`,
      "msg": `${req.body.msg}`
      
    }
    var clientId_text= incomingData.clientId;
    // console.log(`clientId_text: ${incomingData.clientMail}`)
    // import json file
    var jsonStr = fs.readFileSync(`./routes/inquiry/${clientId_text}.json`);
    
    //make it in string
    var obj = JSON.parse(jsonStr);
    //push new data
    obj['LEAD'].push(incomingData);
    //make it back in parse
    jsonStr = JSON.stringify(obj,null,2); 
    //write json file
    fs.writeFile(`./routes/inquiry/${clientId_text}.json`, jsonStr, (err) => {
      if (err) throw err;
      console.log('Data written to file');
      return;
    });
    
    // +++++++++++++++ JSON +++++++++++++++++
    
    
          
          });

module.exports = router;