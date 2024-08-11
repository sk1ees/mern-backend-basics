const cookieParser = require('cookie-parser');
const express = require('express')
const app = express();
const path = require('path');
const userModel = require('./models/user')
const bcrypt = require('bcrypt');
const { hash } = require('crypto');
const jwt = require('jsonwebtoken')
//data-handling
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs');
//cookie-parser-setup
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index')
})
app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, results) => {
            let createdUser = await userModel.create({
                username,
                email,
                password: results,
                age,
            })
            let token = jwt.sign({ email }, "async")
            res.cookie('token', token)
            res.send(createdUser);
        })
    })


})

app.get('/login', (req, res) => {

    res.render('login')

})
app.post('/login', async (req, res) => {

    let user = await userModel.findOne({ email: req.body.email })
    // console.log(user);
    // console.log(user.password, req.body.password)
    bcrypt.compare(req.body.password, user.password, (err, results) => {
        if (results) {
            let token = jwt.sign({ email: user.email }, "async")
            res.cookie('token', token)
            res.send('yes you can login')
        } else {
            res.send('something went wrong!')
        }

    })
    if (!user) return res.send('Something went wrong')
})
app.get('/logout', (req, res) => {
    res.cookie('token', "");
    res.redirect('/');
})
app.listen(3000, () => {
    console.log('server started!!');
})
