var keystone = require('keystone');
var Susu = require('../../models/Susu')
var Member = require('../../models/Member')
var mailer = require('../../lib/mailer')
var uuid = require('node-uuid');

// var keystone = require('keystone'),
//     Post = keystone.list('Post');
 
// Post.model.find()
//     .where('state', 'published')
//     .populate('author')
//     .sort('-publishedAt')
//     .limit(5)
//     .exec(function(err, posts) {
//         // do something with posts
//     });

exports = module.exports = {

  index: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // TODO req.user.getSusus ???
    Susu.model.find().where('members').in([req.user.id]).exec(function(error, susus){
      if (error) throw error;
      view.render('susu/index', {
        susus: susus,
      })
    })
  },

  new: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susu = new Susu.model();
    view.render('susu/new', {
      susu: susu,
    })
  },

  create: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var attributes = req.body.susu;
    var invites = attributes.invites
    var inviteEmails = invites.map(invite => invite.email);

    invites.forEach(invite => invite.inviteCode = uuid.v1())
    
    Member.model.find().where('email').in(inviteEmails).exec(function(error, members){
      if (error){
        res.send('ERROR: '+JSON.stringify(error))
        return
      }
      members = [req.user].concat(members)
      var susu = new Susu.model({
        title:       attributes.title,
        description: attributes.description,
        startDate:   attributes.startDate,
        share:       attributes.share,
        members:     members,
        invites:     JSON.stringify(invites),
      })

      susu.save(function(errors){
        if (errors){
          res.send('ERRORs: '+JSON.stringify(errors))
          return
        }
        console.log('susu.invites', susu.invites)
        mailer.sendSusuInvites(susu, invites, {
          protocol: req.protocol,
          host: req.get('host'),
        })
        res.redirect('/susu/'+susu.id)
      });
    }); 
  },

  show: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    Susu.model.findById(req.params.susuId).populate('members withdrawals').exec(function(error, susu){
      if (error) throw error;
      var invites = susu.invites ? JSON.parse(susu.invites) : []

      locals.susu = {
        title:       susu.title,
        description: susu.description,
        deposits:    susu.deposits,
        startDate:   susu.startDate,
        invites:     invites,
        members:     susu.members.map(function(member){
          return {
            name:  member.name,
            email: member.email,
          }
        }),
        withdrawals: susu.withdrawals.map(function(withdrawal){
          var recipient = susu.members.find(function(member){
            return member._id.toString() === withdrawal.recipient.toString()
          })
          return {
            recipient: {
              name:  recipient.name,
              email: recipient.email,
            },
            amount:      withdrawal.amount,
            requestedAt: withdrawal.requestedAt,
            approvedAt:  withdrawal.approvedAt,
            rejectedAt:  withdrawal.rejectedAt,
          }
        })
      };

      console.log(locals)

      view.render('susu/show')
    })
  },

  edit: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;
    view.render('susu/edit')
  },

  update: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;
    view.render('susu/update')
  },

  delete: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;
    view.render('susu/delete')
  },

  invites: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var inviteCode = req.params.inviteCode

    Susu.model.findById(req.params.susuId).populate('members').exec(function(error, susu){
      if (error) throw error;
      var invites = JSON.parse(susu.invites)
      var invite = invites.find(invite => invite.inviteCode == inviteCode)
      if (!invite){
        res.send('ERROR: invalid invite', 400)
        return
      }
      var member = susu.members.find(member => member.email === invite.email)
      if (member){
        res.redirect('/susu/'+susu.id)
        return
      }
      if (req.params.action === 'accept'){
        if (locals.user){
          susu.members.push(locals.user)
          susu.save(function(){
            res.redirect('/susu/'+susu.id)
          })
        }else{
          res.redirect('/signup?goto=/susu/'+susu.id)
        }
      }else if (req.params.action === 'reject'){
        res.send('rejecting invitation')
      }else{
        view.render('susu/invites/show', {
          susu: susu,
          invite: invite,
        })
      }
    })
  },
}
