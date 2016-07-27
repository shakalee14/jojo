var keystone = require('keystone');
var Susu = require('../../models/susu')
var Member = require('../../models/member')

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

    Susu.model.find().exec(function(error, susus){
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
    var emails = attributes.members.map(member => member.email);
    
    Member.model.find().where('email').in(emails).exec(function(error, members){
      if (error){
        res.send('ERROR: '+JSON.stringify(error))
        return
      }
      var susu = new Susu.model({
        title:       attributes.title,
        description: attributes.description,
        startDate:   attributes.startDate,
        share:       attributes.share,
        members:     members
      })

      susu.save(function(errors){
        if (errors){
          res.send('ERRORs: '+JSON.stringify(errors))
          return
        }
        
        res.redirect('/susu/'+susu.id)
      });
    }); 
  },

  show: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    Susu.model.findById(req.params.susuId).populate('members').exec(function(error, susu){
      if (error) throw error;
      view.render('susu/show', {
        susu: susu,
      })
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

}