const express = require('express');
const router = express.Router();

const Listing = require('../models/listing');

router.get('/', async (req, res) => {
    try {
        const allListings = await Listing.find();
        console.log(allListings);
        res.render('listings/index.ejs');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

module.exports = router;