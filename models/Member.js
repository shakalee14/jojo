var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Member Model
 * ==========
 */
var Member = new keystone.List('Member');

Member.add({
	name: { 
    type: Types.Name, 
    required: true, 
    index: true 
  },
  image: {
    type: Types.CloudinaryImage
  },
	email: { 
    type: Types.Email, 
    initial: true, 
    required: true, 
    index: true 
  },
	password: { 
    type: Types.Password, 
    initial: true, 
    required: true 
  },
	susus: { 
    type: Types.Relationship, 
    ref: 'Susu', 
    many: true
  },
	checking: { 
    type: Types.Number, 
    initial: true
  },
	deposits: {
    type: Types.Relationship, 
    ref: 'Deposits'
  },
	withdrawals: {
    type: Types.Relationship, 
    ref: 'Withdrawals'
  }
});

Member.relationship({ path: 'susus', ref: 'Susu', refPath: 'members' });


// , 'Permissions', {
//   isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
// }

// Provide access to Keystone
Member.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Member.defaultColumns = 'name, email, isAdmin';
Member.register();


module.exports = Member