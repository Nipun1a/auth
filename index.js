// hey i am doing the next video stufff in this by changing tha app.js to index.js in the package.json lec 16 of sheriyans coding school learning data associations with mongoose
// if you want to run auth project then you need to change the main file in package.json from app.js to index.js
// this is because the main file is the entry point of the application and it should point to the file that starts the server
// so in this case we are changing it to index.js which is the file that starts the server
// this is a simple change but it is important to make sure that the main file is correct



const express = require('express');
const app = express();
const userModel = require('./models/user2');
const postModel = require('./models/post');
const post = require('./models/post');


app.get('/', function (req, res){
    res.send('Hello World!');
});

app.get('/post/create', async function(req, res){
/*let user = await userModel.create({
        username: "yug",
        email: "yug@example.com",
        age: 14,
        posts: []
    });
    res.send(user);*/
    //res.send('working');


    let post = await postModel.create({
        postdata: "This is a post",
        user: "yug",
        data: new Date()
    })
    let user = await userModel.findOne({username: "yug"});
    user.posts.push(post._id);
    await user.save();
    res.send(post, user);
});
// data associations todha kaam samajh aya ha work on it more

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});