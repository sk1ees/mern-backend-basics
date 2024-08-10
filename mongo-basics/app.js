const express = require('express')
const app = express()

const userModel = require('./usermodel')
app.get('/', (req, res) => {
    res.send('server started!');
})

//create
app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        name: 'deep',
        email: "deep@gmail.com",
        username: "sk1ees",
    })

    res.send(createdUser);
})
//update
app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({ username: "sk1ees" }, { name: "deep sarkar" }, { new: true })
    res.send(updatedUser);
})
//read
app.get('/read', async (req, res) => {
    let users = await userModel.find()
    res.send(users)
})
//delete
app.get('/delete', async (req, res) => {
    let deletedUsers = await userModel.findOneAndDelete({ name: "deep" });
    res.send(deletedUsers);
})

app.listen(3000, () => {
    console.log('chal rha hai')
});