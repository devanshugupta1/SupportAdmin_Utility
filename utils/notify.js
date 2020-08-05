const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');


module.exports = async function(msg) {

  var transport = nodemailer.createTransport({
      service: "gmail",
      port: 2525,
      auth: {
        user: process.env.SENDER_EMAIL_ID, 
        pass: process.env.SENDER_EMAIL_PASSWORD
      }
    });

    var mailOptions = {
    from: '"Support Admin" <from@example.com>',
    to: 'devanshu.gupta@comprotechnologies.com, ',
    subject: 'PromoteAdmin Run Results',
    html: 'Support Admin ran successfully for Promote Admin functionality at ' + new Date() + ' . Please find the below results:<br> ' + '<br> ' + JSON.stringify(msg.message)  + '<br> ' + '<br> ' + JSON.stringify(msg.requiredInfo) + '<br> ' + '<br> ' + 'Regards,' +  '<br> ' +  'Support Admin',

};
  transport.sendMail(mailOptions, (error, info) => {
    console.log("inside send mail");
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
});
}