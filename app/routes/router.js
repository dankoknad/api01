var express  = require('express');        // call express
var router   = express.Router();              // get an instance of the express Router
var Card     = require('../models/card');
var colors   = require('colors');


// ROUTES FOR OUR API
// =============================================================================

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.'.cyan);
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/')
  .get( function(req, res) {
    res.json({ message: 'hooray! welcome to our api no2!' });   
});

router.route('/cards')
  .post(function(req, res) {

        var card = new Card();      // create a new instance of the Card model
        card.name = req.body.name;  // set the cards name (comes from the request)
        card.age = req.body.age;

        // save the card and check for errors
        card.save(function(err) {
            if (err)
                res.send(err);

            res.json(card);
        });

    })

  .get(function(req, res) {
        Card.find(function(err, cards) {
            if (err)
                res.send(err);

            res.json(cards);
        });
    })

router.route('/cardsuppername')
      .get(function(req, res) {
        Card.find(function(err, cards) {

            if (err)
                res.send(err);

            var newCards = cards.map(function(card){
              var newName = card.name.toUpperCase()
              card.name = newName
              return card
            })

            res.json(cards);
        });
    })

router.route('/cards/:card_id')

  // get the card with that id (accessed at GET http://localhost:8080/api/cards/:card_id)
  .get(function(req, res) {
      Card.findById(req.params.card_id, function(err, card) {
          if (err)
              res.send(err);
          res.json(card);
      });
  })

  .put(function(req, res) {

    // use our card model to find the card we want
    Card.findById(req.params.card_id, function(err, card) {


        if (err){
          res.send(err);
        }

        card.name = req.body.name || card.name;  // update the cards info
        card.age = req.body.age || card.age;
        // save the card
        card.save(function(err) {
            if (err){
              res.send(err);
            }

            res.json({ message: 'Card updated!' });
        });

    });
  })

  .delete(function(req, res) {
        Card.remove({
            _id: req.params.card_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Card is successfully deleted' });
        });
    });


module.exports = router;    