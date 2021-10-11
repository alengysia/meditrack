const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Meds = require('../models/med');
const isAuthenticated = require('../utils/auth');




// Index
router.get("/", (req, res) => {
    Meds.find({}, (err, allMeds) => {
        res.render('meds/index.ejs', {
            meds: allMeds
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
    req.body.morn = !!req.body.morn;
    req.body.noon = !!req.body.noon;
    req.body.night = !!req.body.night;
    Meds.create(req.body, (err, createdMeds) => {
        res.redirect('/')
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