var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var adminRoutesViews = keystone.import('node_modules/keystone/admin/routes/views')
var URL = require('url');
var Susu = require('../models/Susu')

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};


var requireAuthentication = function(req, res, next){
	console.log('requireAuthentication', req.url, req.user)
	if (req.user){
		next();
	}else{
		var from = URL.parse(req.url, true).query.from
		var signingUrl = URL.format({
			pathname: '/signin',
			query: {from: from || req.url},
		})
		console.log('AUTH FAIL! redirecting to '+signingUrl)
		req.flash('error', 'Please sign in to access this page.');
		res.redirect(signingUrl)
	}
}

var requireSusuMembership = function(req, res, next){
	Susu.model.findById(req.params.susuId).populate('members withdrawals').exec(function(error, susu){
		if (error) throw error;
		if (!susu) return res.status(404).send('Not Found')
		var member = susu.members.find(function(member){
			return member.id === req.user.id;
		})
		if (member) {
			req.susu = susu
			next();
		}else{
			res.status(404).send('Not Found (your not a member)')
		}
	});
}

// Setup Route Bindings
exports = module.exports = function (app) {
	
	// Views
	app.get('/', routes.views.index);
	app.all('/signin', adminRoutesViews.signin);
	app.all('/signup', routes.views.signup);


	// Authenticated Routes
	app.use(requireAuthentication)

	app.get('/account', routes.views.account);
	app.get('/signout', adminRoutesViews.signin);
	app.get('/loan', routes.views.loan);

	app.get('/dashboard', routes.views.dashboard);
	app.get('/deposits', routes.views.deposits);
	// app.get('/withdrawal/test', routes.views.withdrawals);
	app.get('/calculator', routes.views.calculator);

	// index
	app.get('/susu', routes.views.susu.index)
	// new
	app.get('/susu/new', routes.views.susu.new)
	// create
	app.post('/susu', routes.views.susu.create)


	// You must be a member of the SUSU to visit the Routes beyond this point
	app.use('/susu/:susuId', requireSusuMembership)
	app.use('/susu/:susuId/*', requireSusuMembership)

	// show
	app.get('/susu/:susuId', routes.views.susu.show)
	// edit
	app.get('/susu/:susuId/edit', routes.views.susu.edit)
	// update
	app.post('/susu/:susuId', routes.views.susu.update)
	// delete
	app.delete('/susu/:susuId', routes.views.susu.delete)
	
	app.all('/susu/:susuId/invites/:inviteCode', routes.views.susu.invites)



	app.get( '/susu/:susuId/withdrawals', routes.views.withdrawals.index);
	app.get( '/susu/:susuId/withdrawals/new', routes.views.withdrawals.new);
	app.post('/susu/:susuId/withdrawals', routes.views.withdrawals.create);
	app.get( '/susu/:susuId/withdrawals/:withdrawalId', routes.views.withdrawals.show);
};
