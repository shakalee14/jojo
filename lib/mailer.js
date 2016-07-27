var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://mailer.learnersguild@gmail.com:tensionresolved@smtp.gmail.com');

// // setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"Jojo" <jojo@learnersguild.com>', // sender address
//     to:  "johnthopkins@gmail.com",// list of receivers
//     subject: 'This is a test email of the JoJo system', // Subject line
//     text: 'This is just a test.  If it were a real email some money would be exchanging hands!', // plaintext body
//     html: '<b>Hello world 🐴</b>' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });


var mailer = {
  sendMail: function(options, callback){
    return transporter.sendMail(options, callback)
  },

  sendSusuInvites: function(susu, members, callback){
    var mailings = members.map(function(member){
      console.log('name?', member, member.name)
      console.log('sending susu invite email to '+member.name.full)
      return mailer.sendMail({
        from:    '"Jojo" <jojo@learnersguild.com>',
        to:      member.email, 
        subject: 'Join My Susu: '+susu.title,
        text:    'This is just a test.  If it were a real email some money would be exchanging hands!',
        html:    '<b>Hello world 🐴</b>'
      }, function(error){
        if (error) throw error;
      })
    })

    return mailings;
  }
}

module.exports = mailer