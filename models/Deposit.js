var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Deposits Model
 * ==========
 */
var Deposit = new keystone.List('Deposit');

Deposit.add({
	 susu: { 
    type: Types.Relationship, 
    ref: 'Member', 
    initial: true
  },
  giver: { 
    type: Types.Relationship, 
    ref: 'Member', 
    initial: true,
    required: true
  },
  amount: {
    type: Types.Money, 
    required: true, 
    initial: true
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
