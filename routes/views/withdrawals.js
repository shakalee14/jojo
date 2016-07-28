var keystone = require('keystone');
var Withdrawal = require('../../models/Withdrawal')


exports = module.exports = {
  index: function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susuId = req.params.susuId
    locals.susuId = susuId;
    view.render('withdrawals/index');
  },

  new: function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susuId = req.params.susuId

    locals.withdrawal = new Withdrawal.model();
    locals.susuId = susuId;

    // Render the view
    view.render('withdrawals/new');
  },

  create: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susuId = req.params.susuId
    var amount = req.body.amount
    var recipient = locals.user

    console.log('SUSU?', req.susu)

    var withdrawal = new Withdrawal.model({
      recipient:   recipient,
      amount:      amount,
      requestedAt: Date.now(),
    });


    locals.withdrawal = withdrawal;
    locals.susuId = susuId;

    withdrawal.save(function(error){
      req.susu.withdrawals.push(withdrawal)
      req.susu.save(function(error){
        if (error){
          locals.error = error;
          view.render('withdrawals/new');
        }else{
          res.redirect('/susu/'+susuId+'/withdrawals/'+withdrawal.id);
        }
      });
    });
  },

  show: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    Withdrawal.model
      .findById(req.params.withdrawalId)
      .populate('recipient')
      .exec(function(error, withdrawal){
      if (error) throw error;
      locals.withdrawal = withdrawal;
      view.render('withdrawals/show');
    })
  },

};


