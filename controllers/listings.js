const express = require('express');
const router = express.Router();

const Listing = require('../models/listing');

router.get('/', async (req, res) => {
    try {
        const populatedListings = await Listing.find().populate('owner');
        // console.log('Populated Listings:', populatedListings);
        res.render('listings/index.ejs', {
            listings: populatedListings,
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

router.get('/new', async (req, res) => {
    res.render('listings/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        await Listing.create(req.body);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

router.get('/:listingId', async (req, res) => {
    try {
        const populatedListings = await Listing.findById(req.params.listingId).populate('owner');
        res.render('listings/show.ejs', {
            listing: populatedListings,
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

router.delete('/:listingId', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.listingId);
        if (listing.owner.equals(req.session.user._id)) {
            await listing.deleteOne();
            res.redirect('/listings');
        } else {
            res.send('You don\'t have permission to do that.');
        };
    } catch (err) {
        console.log(err);
        redirect('/');
    };
});

router.get('/:listingId/edit', async (req, res) => {
    try {
        const currentListing = await Listing.findById(req.params.listingId);
        res.render('listings/edit.ejs', {
            listing: currentListing,
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

router.put('/:listingId', async (req, res) => {
    try {
        const currentListing = await Listing.findById(req.params.listingId);
        if (currentListing.owner.equals(req.session.user._id)) {
            await currentListing.updateOne(req.body);
            res.redirect('/listings');
        } else {
            res.send('You don\'t have permission to do that.');
        };
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

router.post('/:listingId/favorited-by/:userId', async (req, res) => {
    try {
        console.log('userId: ', req.params.userId);
        console.log('lsitingId: ', req.params.listingId);
        res.send(`request to favorite ${req.params.listingId}`);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
})

module.exports = router;