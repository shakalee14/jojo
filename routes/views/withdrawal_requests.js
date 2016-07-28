var keystone = require('keystone');
var Withdrawals = require('../../models/withdrawals')

exports = module.exports = {
   function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Withdrawals.model.find().exec(function(error, withdrawals){
  //     if (error) throw error;
  //     view.render('/withdrawal_requests', {
  //       withdrawals: withdrawals,
  //     })
  },


  function(req, res) {
      var view = new keystone.View(req, res);
      var locals = res.locals;

      view.render('withdrawals/withdrawal_requests')
  }

//   // locals.section is used to set the currently selected
//   // item in the header navigation.
//   locals.section = 'home';

//   // Render the view
//   view.render('withdrawal_requests');
// };

// create: function(req, res){
//     var view = new keystone.View(req, res);
//     var locals = res.locals;
//     var attributes = req.body.withdrawal_requests;
//     var emails = attributes.members.map(member => member.email);
    
//     Member.model.find().where('email').in(emails).exec(function(error, members){
//       if (error){
//         res.send('ERROR: '+JSON.stringify(error))
//         return
//       }
//       var withdrawal_requests = new withdrawal_requests.model({
//         members:     members,
//         description: attributes.description,
//         startDate:   attributes.startDate,
//         amount:      attributes.amount 
//       })

//       withdrawal_requests.save(function(errors){
//         if (errors){
//           res.send('ERRORs: '+JSON.stringify(errors))
//           return
//         }
        
//         res.redirect('/susu/'+susu.id)
//       });
//     }); 
// },
  

// show: function(req, res){
//     var view = new keystone.View(req, res);
//     var locals = res.locals;

//     withdrawal_requests.model.findById(req.params.withdrawal_requests).populate('withdrawals').exec(function(error, withdrawals){
//       if (error) throw error;
//       view.render('withdrawal_requests', {
//         withdrawal_requests: withdrawal_requests,
//       })
//     })
//   }
}

