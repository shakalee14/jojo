var keystone = require('keystone');
var Member = require('../../models/member')

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
  locals.goto = req.query.goto

  if (req.method === "GET"){
    view.render('signup');
    return 
  }

  var params = {
    name: {
      first: req.body.firstName,    
      last: req.body.lastName,    
    },
    email: req.body.email,    
    password: req.body.password,    
  }

  if (params.password !== req.body.passwordConfirmation){
    locals.error = "Passwords do not match"
    locals.name = params.name,    
    locals.email = params.email,    
    locals.password = params.password,    
    view.render('signup');
    return
  }

  var user = new Member.model(params)
  user.save(function(error){
    if (error) throw error;
    keystone.session.signinWithUser(user, req, res, function(){
      res.redirect(req.body.goto || '/')
    });
  })

};
