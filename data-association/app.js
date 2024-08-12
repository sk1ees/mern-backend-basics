const express = require('express')
const app = express()

const UserModel = require('./models/user')
const postModel = require('./models/post');


app.get('/', (req, res) => {
    res.send('working')
})

app.get('/create', async (req, res) => {
    let user = await UserModel.create({
        username: "deep",
        age: 17,
        email: "deep@hello.in",

    })
    res.send(user);
})

app.get('/post/create', async (req, res) => {

    let post = await postModel.create({
        postdata: "welcome",
        user: "66ba151200686426d46d03ec",
    })
    let user = await UserModel.findOne({ _id: '66ba151200686426d46d03ec' })
    user.posts.push(post._id);
    await user.save();
    res.send({ post, user });
})


app.listen(3000, () => {
    console.log('server started')
})