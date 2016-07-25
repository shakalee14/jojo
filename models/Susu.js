var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Member Model
 * ==========
 */
var Susu = new keystone.List('Susu');

Susu.add({
	member: { type: Types.Relationship, ref: 'Member' },
	name: { type: Types.Name, required: true, index: true },
	account : { type: Types.Number, initial: null, required: true, index: true },
	startDate: { type: Types.Date, initial: Date.now(), required: true },
	dsr: {type: Types.Money, required: true, initial: 0.0},
	day01: {type: Types.Boolean, required: false},
	day02: {type: Types.Boolean, required: false},
	day03: {type: Types.Boolean, required: false},
	day04: {type: Types.Boolean, required: false},
	day05: {type: Types.Boolean, required: false},
	day06: {type: Types.Boolean, required: false},
	day07: {type: Types.Boolean, required: false},
	day08: {type: Types.Boolean, required: false},
	day09: {type: Types.Boolean, required: false},
	day10: {type: Types.Boolean, required: false},
	day11: {type: Types.Boolean, required: false},
	day12: {type: Types.Boolean, required: false},
	day13: {type: Types.Boolean, required: false},
	day14: {type: Types.Boolean, required: false},
	day15: {type: Types.Boolean, required: false},
	day16: {type: Types.Boolean, required: false},
	day17: {type: Types.Boolean, required: false},
	day18: {type: Types.Boolean, required: false},
	day19: {type: Types.Boolean, required: false},
	day20: {type: Types.Boolean, required: false},
	day21: {type: Types.Boolean, required: false},
	day22: {type: Types.Boolean, required: false},
	day23: {type: Types.Boolean, required: false},
	day24: {type: Types.Boolean, required: false},
	day25: {type: Types.Boolean, required: false},
	day26: {type: Types.Boolean, required: false},
	day27: {type: Types.Boolean, required: false},
	day28: {type: Types.Boolean, required: false},
	day29: {type: Types.Boolean, required: false},
	day30: {type: Types.Boolean, required: false},
	day31: {type: Types.Boolean, required: false},
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
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
