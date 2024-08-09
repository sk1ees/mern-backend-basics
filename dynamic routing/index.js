const express = require('express')
const app = express();
const path = require('path');
//setting up parsers for form handling
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//setting up to use static file like images, css,etc
app.use(express.static(path.join(__dirname, 'public')))

//setting up to use ejs file
app.set('view engine', 'ejs');

//routes
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/profile/:name', (req, res) => {
    res.send(`Welcome ${req.params.name}`);
})
app.get('/author/:name/:age', (req, res) => {
    res.send(`Welcome My Author - ${req.params.name} at the age of ${req.params.age}`);
})

app.listen(3000, () => {
    console.log("server started!")
});