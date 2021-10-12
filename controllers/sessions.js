// Dependencies
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const User = require("../models/user.js")



// New (login page)
router.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {
      currentUser: req.session.currentUser,
    })
  })
// Delete (logout route)
router.delete("/", (req, res) => {
    req.session.destroy((error) => {
      res.redirect("/")
    })
  })
// Create (login route)
router.post('/', (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {

        if(!foundUser) {
            return res.render('sessions/new.ejs', {error: 'Invalid Credentials'});
        }

        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isMatched) {
            return res.render('sessions/new.ejs', {error: 'Invalid Credentials'});
        }

        req.session.user = foundUser._id;

        res.redirect('/users/dashboard')
    });
});
// Export Sessions Router
module.exports = router