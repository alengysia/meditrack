const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Meds = require('../models/med');





// Index
router.get("/", (req, res) => {
    const query = req.session.user ? {author: req.session.user } : {};
    Meds.find(query, (err, meds) => {
        
        res.render('meds/index.ejs', { 
            meds, 
            user : req.session.user
            
            
        })
    })
})

// New
router.get("/new", (req, res) => {
    res.render('meds/new.ejs')
})

// Delete
router.delete('/:id', (req, res) =>{
    Meds.findByIdAndRemove(req.params.id, (err, data) =>{
        res.redirect('/')
    })
})

// Update
router.put("/:id", (req, res) => {
    Meds.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
        },
        (err, updateMeds) => {
            res.redirect(`/meds/${req.params.id}`)
        })
})

// Create
router.post("/", (req, res) => {
    req.body.author = req.session.user;
    req.body.morn = !!req.body.morn;
    req.body.noon = !!req.body.noon;
    req.body.night = !!req.body.night;
    Meds.create(req.body, (err, createdMeds) => {
        res.redirect('/meds')
    })
})

// Edit
router.get('/:id/edit', (req, res) => {
    Meds.findById(req.params.id, (err, getMeds) => {
        res.render('meds/edit.ejs', {
            meds: getMeds
        })
    })
})

// Show
router.get("/:id", (req, res) => {
    Meds.findById(req.params.id, (err, showMeds) => {
        res.render("meds/show.ejs", {
            meds: showMeds
        })
    })
})


module.exports = router