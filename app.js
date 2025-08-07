const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user'); // Importing the user model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.set('view engine', 'ejs'); // this sets the view engine to ejs

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/login', async function(req, res) {
    let { username, password, email} = req.body;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).send('Error generating salt');
        } else {
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) {
                    return res.status(500).send('Error hashing password');
                } else {
                    try {
                        let createdUser = await userModel.create({
                            username,
                            password: hash,
                            email,
                            
                        });
                        // Generate JWT token after user creation
                        let token = jwt.sign({ email }, 'sdfhifskddnf', { expiresIn: '1h' });
                        res.cookie('token', token);
                        res.send('User created successfully and token set in cookie');
                    } catch (e) {
                        res.status(500).send('Error creating user');
                        console.error(e); // Log the error for debugging
                    }
                }
            });
        }
    });
});


app.get('/signin', function(req, res) {
    res.render('signin'); // Render the signin view
});

app.post('/signin', function(req, res) {
  let user = userModel.findOne({ email: req.body.email });
  if (user){
    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
        if (err) {
            return res.status(500).send('Error comparing passwords');
        }
        if (isMatch) {
            // Passwords match, generate JWT token
            let token = jwt.sign({ email: user.email }, 'sdfhifskddnf', { expiresIn: '1h' });
            res.cookie('token', token);
            res.send('Login successful and token set in cookie');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
  }
})


// Move logout route outside of /login
app.get('/logout', function(req, res) {
    res.cookie('token', '');
    res.redirect('/');
});

app.listen(3000, function() {
    console.log('Server is running on port 3000'); // this is on the port http://localhost:3000
});