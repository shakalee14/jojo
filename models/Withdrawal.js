var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Withdrawal Model
 * ==========
 */
var Withdrawal = new keystone.List('Withdrawal');

Withdrawal.add({
  susu: { 
    type: Types.Relationship, 
    ref: 'Member', 
    initial: true
  },
	recipient: { 
    type: Types.Relationship, 
    ref: 'Member', 
    initial: true,
    required: true
  },
	amount: {
    type: Types.Money, 
    required: true, 
    initial: true
  },
	requestedAt: {
    type: Types.Date, 
    initial: () => Date.now(), 
    required: true
  },
  approvedAt: {
    type: Types.Date,
    required: false,
  },
  rejectedAt: {
    type: Types.Date,
    required: false,
  }
});

// Provide access to Keystone
Withdrawal.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Withdrawal.defaultColumns = 'name, account, dsr, startDate';
Withdrawal.register();

module.exports = Withdrawal;
