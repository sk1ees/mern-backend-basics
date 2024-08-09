//basic setup of express application
const express = require('express')
const app = express()

//MIDDLEWARE - run before the routes

// next() is the method used in the middleware to transfer it to the remaining routes and middleware

app.use((req, res, next) => {
    console.log("First Middleware")
    next();
})
app.use((req, res, next) => {
    console.log("second Middleware")
    next();
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something went wrong!");
})


//Routing in express.js
app.get('/', (req, res, next) => {
    res.send("Hello World!")
})

app.get('/about', (req, res, next) => {
    res.send("Hello About!")
})
app.get('/profile', (req, res, next) => {
    return next(new Error("Server Crashed"))
})

app.listen(3000, () => {
    console.log("Server Connected ✅")
});