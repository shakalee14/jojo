var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Ledger Model
 * ==========
 */
var Ledger = new keystone.List('Ledger');

Ledger.add({
	amount: { type: Types.Money, required: true, initial: true},
	deposits: {type: Types.Relationship, ref: 'Deposits'},
	withdrawals: {type: Types.Relationship, ref: 'Withdrawals'},
	startDate: { type: Types.Date, initial: Date.now(), required: true }
});

// Provide access to Keystone
Ledger.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Ledger.defaultColumns = 'name, account, dsr, startDate';
Ledger.register();
