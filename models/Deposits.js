var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Deposits Model
 * ==========
 */
var Deposits = new keystone.List('Deposits');

Deposits.add({
	members: { 
    type: Types.Relationship, 
    ref: 'Member', 
    initial: true
  },
	amount: { 
    type: Types.Money, 
    required: true, 
    initial: true
  },
	startDate: { 
    type: Types.Date, 
    initial: Date.now(), 
    required: true
  }
});

// Provide access to Keystone
Deposits.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Deposits.defaultColumns = 'name, account, dsr, startDate';
Deposits.register();
