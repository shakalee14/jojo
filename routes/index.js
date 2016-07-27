var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/account', routes.views.account);
	app.get('/signup', routes.views.signup);
	app.get('/signin', routes.views.signin);
	app.get('/signout', routes.views.signout);
	app.get('/susu', routes.views.susu);
	app.get('/loan', routes.views.loan);
	app.get('/dashboard', routes.views.dashboard);
	app.get('/deposit', routes.views.deposit);
	app.get('/withdraw', routes.views.withdraw);
	app.get('/calculator', routes.views.calculator);
};
