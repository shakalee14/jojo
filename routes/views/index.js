var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

  console.log('req.user',req.user)

  // Render the view
  if (locals.user){
    view.render('loggedinhomepage');
  }else{
    view.render('loggedouthomepage');
  }
};
