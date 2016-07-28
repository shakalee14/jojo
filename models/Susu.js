var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Susu Model
 * ==========
 */
var Susu = new keystone.List('Susu');

Susu.add({
	title: { 
    type: Types.Text, 
    required: true, 
    index: true , 
    initial: true
  },
	description: { 
    type: Types.Textarea, 
    required: true, 
    index: true, 
    initial: true
  },
	members: { 
    type: Types.Relationship, 
    ref: 'Member', 
    initial: true, 
    many: true
  },
  deposits: { 
    type: Types.Relationship, 
    ref: 'Deposit',
    many: true
  },
	withdrawals: { 
    type: Types.Relationship, 
    ref: 'Withdrawal',
    many: true
  },
	startDate: { 
    type: Types.Date, 
    initial: () => Date.now(), 
    required: true
  },
  invites: {
    type: Types.Text, 
    initial: () => [],
    many: true,
  }
});

// Provide access to Keystone
Susu.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Susu.defaultColumns = 'name, account, dsr, startDate';
Susu.register();


module.exports = Susu