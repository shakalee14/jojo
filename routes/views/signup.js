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

  console.log('req.body', req.body)
  console.log('req.params', req.params)
  console.log('req.query', req.query)



  var params = {
    name: {
      first: req.body.firstName,    
      last: req.body.lastName,    
    },
    email: req.body.email,    
    password: req.body.password,  
    image: req.body.image  
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


    user.getUpdateHandler(req).process(req.body, {
      fields: 'image',
      flashErrors: true
    }, function(err) {
      if (error) throw error;
            
      // if (err) {
      //   return next();
      // }
      
      // req.flash('success', 'Your changes have been saved.');
      // return next();

      keystone.session.signinWithUser(user, req, res, function(){
        res.redirect(req.body.goto || '/')
      });
      
    });

  })

};
