var nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://mailer.learnersguild@gmail.com:tensionresolved@smtp.gmail.com');

var susuInviteEmail = transporter.templateSender({
    subject: 'Join Susu: {{susuname}}!',
    text: 'Hello, {{username}}, Join Susu: {{susuname}}. Follow this link to join: {{invitelink}}',
    html: (
      '<p>Hello, <strong>{{username}}</strong> Join Susu: <strong>{{susuname}}</strong></p>'+
      '<p><a href="{{invitelink}}">Click here</a> to join</p>'
    )
}, {
    from: 'robot@jojo.org',
});


var mailer = {
  sendMail: function(options, callback){
    return transporter.sendMail(options, callback)
  },

  sendSusuInvites: function(susu, invites, options, callback){
    return invites.map(function(invite){
      if (!invite || !invite.name || !invite.email) return;
      console.log('sending susu invite email to '+invite.name)

      var invitelink = options.protocol+'://'+options.host+'/susu/'+susu.id+'/invites/'+invite.inviteCode

      susuInviteEmail(
        {
          to: invite.email, 
        },
        {
          invitelink: invitelink,
          susuname: susu.title,
          username: invite.name,
        },
        function(error, info){
          if (error) throw error;
          console.log('Susu invite sent', info)
        }
      )
    })
  }
}

module.exports = mailer