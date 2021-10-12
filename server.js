const express = require("express")
const mongoose = require("mongoose")
const morgan = require('morgan')
const userController = require("./controllers/users")
const sessionsController = require("./controllers/sessions")
const medsController = require("./controllers/meds")
const session = require("express-session")
const isAuthenticated = require('./utils/auth');


const app = express()


require("dotenv").config()
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// Dependencies
const methodOverride = require("method-override")



// Database Configuration
mongoose.connect(DATABASE_URL)

// Database Connection Error / Success
const db = mongoose.connection
db.on("error", (err) => console.log("CODE BLUE! CODE BLUE!"))
db.on("connected", () => console.log("What seems to be the problem?"))
db.on("disconnected", () => console.log("Call back in the morning to let us know how you're feeling"))

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )
app.use(methodOverride("_method"))
app.use(express.static('public'))


app.use("/users", userController)
app.use("/sessions", sessionsController)
app.use("/meds", isAuthenticated, medsController)

// Routes / Controllers

 app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser,
  })
})
app.listen(PORT, () => console.log('The Doctor will see you now'))