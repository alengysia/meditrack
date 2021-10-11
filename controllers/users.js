const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Meds = require('../models/med');
const isAuthenticated = require('../utils/auth');



// INDEX
router.get("/", (req, res) => {
        res.render('index.ejs')
    })
    
// NEW
router.get("/new", (req, res) => {
    res.render("users/new.ejs", {
      currentUser: req.session.user,
    })
  })
// DELETE

// UPDATE

// CREATE
router.post("/", (req, res) => {
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  
    User.create(req.body, (error, createdUser) => {
      res.redirect("/")
    })
  })

// EDIT

// SHOW

router.get('/dashboard', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        console.log(req.session.user)
        Meds.find({author: user._id}, (err, meds) => {
            res.render('dashboard.ejs', { user, meds });
        })
    });
});


module.exports = router;