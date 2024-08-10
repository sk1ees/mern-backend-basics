const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static(path.join(__dirname, "public")));



app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {

        res.render('index', { files: files })

    })
})
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('').slice(0, 10)}.txt`, req.body.details, (err) => {
        res.redirect("/")
    });
})
app.get(`/file/:filename`, (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, files) => {
        res.render('show', { filename: req.params.filename, filedesc: files });
    })
})
app.get(`/edit/:filename`, (req, res) => {
    res.render('edit', { filename: req.params.filename });
})
app.post('/edit', (req,res) => {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}.txt`, () => {
        res.redirect('/')
    })
})
app.listen(3000, () => {
    console.log("Server started!")
})