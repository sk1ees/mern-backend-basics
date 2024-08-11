const cookieParser = require('cookie-parser');
const express = require('express')
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
app.use(cookieParser());

app.get('/', (req, res) => {
    // res.cookie('name', 'deeep')
    res.send('working!');
    // console.log(req.cookies)
})
//encrytion
app.get('/register', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("yuta@", salt, (err, results) => {
            console.log(results);
            res.send('encrypted!')
        })
        // console.log(salt);
    })
})

app.get("/login", (req, res) => {
    bcrypt.compare("deep@", "$2b$10$4asqJfvNrvFRYrft/k3nr.p.i1Ockm0fqLHnzPhLugqWfrU8cwsem", (err, results) => {
        console.log(results);
    })
    res.send('decypting!')
})

app.get('/admin', (req, res) => {
    let token = jwt.sign({ email: 'deep@heelo.in' }, 'secret')
    res.cookie("token", token);
    res.send('done!')
})

app.get('/read', (req, res) => {
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
})
app.listen(3000, () => {
    console.log('servers started!')
})