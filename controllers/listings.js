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

router.get('/new', async (req, res) => {
    res.render('listings/new.ejs');
});

module.exports = router;