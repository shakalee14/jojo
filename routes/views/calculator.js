
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Render the view
	view.render('calculator');
};

function calcpayments() {

//establish variables

var rent=document.forms[0].rent.value*1;
var tax=document.forms[0].tax.value*1;
var earn=document.forms[0].earn.value*1;

//This is the formula that does the math

var result=(earn*(tax/100 +1)-rent);

// result=Math.round(result*100) /100;

//The line below shows the result in the box

document.getElementById(“sugpayment”).innerHTML=result;

}

