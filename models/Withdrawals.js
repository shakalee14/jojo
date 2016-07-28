var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Withdrawals Model
 * ==========
 */
var Withdrawals = new keystone.List('Withdrawals');

Withdrawals.add({
	members: { type: Types.Relationship, ref: 'Member', initial: true},
	amount: { type: Types.Money, required: true, initial: true},
	startDate: { type: Types.Date, initial: Date.now(), required: true},
  description: { type: Types.Text, required: true, initial: true},
});

// Provide access to Keystone
Withdrawals.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Withdrawals.defaultColumns = 'name, account, dsr, startDate';
Withdrawals.register();
