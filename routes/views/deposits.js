var keystone = require('keystone');
var Deposits = require('../../models/Deposits')


exports = module.exports = {
  index: function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susuId = req.params.susuId
    locals.susuId = susuId;
    view.render('deposits/index');
  },

  new: function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susuId = req.params.susuId

    locals.deposit = new Deposits.model();
    locals.susuId = susuId;

    // Render the view
    view.render('deposits/new');
  },

  create: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var susuId = req.params.susuId
    var amount = req.body.amount
    var recipient = locals.user

    console.log('SUSU?', req.susu)

    var deposit = new Deposits.model({
      recipient:   recipient,
      amount:      amount,
      requestedAt: Date.now(),
      susu:   req.susu
    });


    locals.deposit = deposit;
    locals.susuId = susuId;

    deposit.save(function(error){
      if (error) throw error
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

  show: function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    Deposits.model
      .findById(req.params.depositId)
      .populate('recipient')
      .exec(function(error, deposit){
      if (error) throw error;
      locals.deposit = deposit;
      view.render('deposits/show');
    })
  },

};


