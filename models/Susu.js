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
	share: { 
    type: Types.Money, 
    required: true, 
    initial: true
  },
	deposits: { 
    type: Types.Relationship, 
    ref: 'Deposits'
  },
	withdrawals: { 
    type: Types.Relationship, 
    ref: 'Withdrawals'
  },
	startDate: { 
    type: Types.Date, 
    initial: Date.now(), 
    required: true
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