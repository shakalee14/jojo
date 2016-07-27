var keystone = require('keystone');
var Susu = require('../../models/susu')

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

    var susu = new Susu.model({
      title:       attributes.title,
      description: attributes.description,
      startDate:   attributes.startDate,
      share:       attributes.share,
    })

    susu.save(function(error){
      if (error){
        view.render('susu/new', {
          susu: susu,
          error: error,
        })
      }else{
        res.redirect('/susu/'+susu.id)
      }
    })
  },

  show: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    Susu.model.findById(req.params.susuId).exec(function(error, susu){
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