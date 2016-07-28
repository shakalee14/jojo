var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Deposits Model
 * ==========
 */
var Deposit = new keystone.List('Deposit');

Deposit.add({
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
Deposit.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Deposit.defaultColumns = 'name, account, dsr, startDate';
Deposit.register();
