const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');


module.exports = async function(msg) {

  const env = JSON.parse(fs.readFileSync('./env.json'));

  var transport = nodemailer.createTransport({
      service: "gmail",
      port: 2525,
      auth: {
        user: process.env.SENDER_EMAIL_ID, 
        pass: process.env.SENDER_EMAIL_PASSWORD
      }
    });

    let modeInfo = process.env.MODE ? 'Running from Semaphore! <br>' : '';

    var mailOptions = {
    from: '"Support Admin" <from@example.com>',
    to: 'devanshu.gupta@comprotechnologies.com, ',
    subject: 'PromoteAdmin Run Results',
    html: modeInfo + 'Support Admin ran successfully for Promote Admin functionality at ' + new Date() + '. ' + '<br> ' +'Please find the below results:<br> ' + '<br> ' + JSON.stringify(msg.message)  + '<br> ' + '<br> ' + JSON.stringify(msg.requiredInfo) + '<br> ' + '<br> ' + 'Regards,' +  '<br> ' +  'Support Admin',
    attachments: [
      {
        filename:'result.png',
        path: path.dirname(require.main.path) + '/promoteAdmin.png',
        cid: 'promoteAdmin.png'
      }
    ]
};
console.log(new Date());
  transport.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
});
}