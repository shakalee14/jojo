var keystone = require('keystone');

exports = module.exports = {
  
  index: function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susuId = req.params.susuId
    locals.susuId = susuId;
    view.render('deposits/index');
  },

  new: function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susuId = req.params.susuId

    locals.deposit = new Deposit.model();
    locals.susuId = susuId;

    view.render('deposits/new');

  },

  create: function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susuId = req.params.susuId
    var amount = req.body.amount
    var giver = locals.user

    console.log('SUSU?', req.susu)

    var deposit = new Deposit.model({
      giver:  giver,
      amount: amount,
    });

    locals.deposit = deposit;
    locals.susuId = susuId;

    deposit.save(function(error){
      req.susu.deposits.push(deposit)
      req.susu.save(function(error){
        if (error){
          locals.error = error;
          view.render('deposits/new');
        }else{
          res.redirect('/susu/'+susuId+'/deposits/'+deposit.id);
        }
      });
    });
  },


  show: function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    Deposit.model
      .findById(req.params.depositId)
      .populate('giver')
      .exec(function(error, deposit){
        if (error) throw error;
        locals.deposit = deposit;
        view.render('deposits/show');
      })
  },
};
