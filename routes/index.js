var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
var auth_path = keystone.import('node_modules/keystone/admin/routes/views');

var auth_path = keystone.import('node_modules/keystone/admin/routes/views')

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
	app.get('/signin', auth_path.signin);
	app.get('/signout', auth_path.signout);
	// app.get('/susu', routes.views.susu);
	app.get('/loan', routes.views.loan);

	app.get('/dashboard', routes.views.dashboard);
	app.get('/deposit', routes.views.deposit);
	app.get('/withdraw', routes.views.withdraw);
	app.get('/calculator', routes.views.calculator);


	// index
	app.get('/susu', routes.views.susu.index)
	// new
	app.get('/susu/new', routes.views.susu.new)
	// create
	app.post('/susu', routes.views.susu.create)
	// show
	app.get('/susu/:susuId', routes.views.susu.show)
	// edit
	app.get('/susu/:susuId/edit', routes.views.susu.edit)
	// update
	app.post('/susu/:susuId', routes.views.susu.update)
	// delete
	app.delete('/susu/:susuId', routes.views.susu.delete)

};
