var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Deposits Model
 * ==========
 */
var Deposit = new keystone.List('Deposit');

Deposit.add({
	amount: { 
    type: Types.Money, 
    required: true, 
    initial: true
  },
  susu: { 
    type: Types.Relationship, 
    ref: 'Susu', 
    required: true,
    initial: null
  },
  recipient: { 
    type: Types.Relationship, 
    ref: 'Member', 
    initial: true,
    required: true
  },
  requestedAt: {
    type: Types.Date,
    initial: () => Date.now(),
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

module.exports = Deposit