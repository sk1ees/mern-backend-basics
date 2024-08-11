const express = require('express')
const app = express();
const path = require('path');
const userModel = require('./models/user');

//form handling
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ejs setup
app.set('view engine', "ejs");

//public folder setup

app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/read', async (req, res) => {
    let users = await userModel.find()
    res.render('read', { users });
})
app.get('/edit/:userId', async (req, res) => {
    let editUser = await userModel.findOne({ _id: req.params.userId })

    res.render("edit", { editUser });
})
app.post('/update/:userId', async (req, res) => {
    let { image, email, name } = req.body;
    await userModel.findOneAndUpdate({ _id: req.params.userId }, { image, name, email }, { new: true })
    res.redirect('/read');
})
app.get('/delete/:userId', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.userId })
    res.redirect('/read');
})
// app.get('/edit/:userId', async (req, res) => {
//     let { image, email, name } = req.body;
//     await userModel.findOneAndUpdate({ _id: req.params.userId }, { image, name, email }, { new: true })
//     res.redirect('/read');
// })
app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    let createdUser = await userModel.create({
        image,
        email,
        name,
    })
    res.redirect('/read');
})
app.listen(3000, () => {
    console.log('server is working!');
})