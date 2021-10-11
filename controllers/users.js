const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const isAuthenticated = require('../utils/auth');


// INDEX
router.get("/", (req, res) => {
    res.render('index.ejs')
})
// NEW
router.get("/new", (req, res) => {
    res.render("users/new.ejs", {
      currentUser: req.session.currentUser,
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



module.exports = router;