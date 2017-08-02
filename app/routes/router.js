var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var Card     = require('../models/card');

// ROUTES FOR OUR API
// =============================================================================

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/')
  .get( function(req, res) {
    res.json({ message: 'hooray! welcome to our api no2!' });   
});

router.route('/cards')
  .post(function(req, res) {

        var card = new Card();      // create a new instance of the Bear model
        card.name = req.body.name;  // set the bears name (comes from the request)

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
    });

router.route('/cards/:card_id')

    // get the card with that id (accessed at GET http://localhost:8080/api/bears/:card_id)
    .get(function(req, res) {
        Card.findById(req.params.card_id, function(err, card) {
            if (err)
                res.send(err);
            res.json(card);
        });
    });

module.exports = router;    