const express = require("express");
const bodyParser = require("body-parser");
const path= require("path");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const authenticate = require("./middleware/authenticate");

//const config = require("./config");

const User = require("./models/Users");

// connection to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb://localhost:27017/loginauth",
    { useNewUrlParser: true }
);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'../dist')));


app.post('/register',(req, res) => {
    console.log("name :" + req.body.fullName);
    console.log("email :" + req.body.email);
    console.log("password :" + req.body.password);
    const newUser = new User({
        name: req.body.fullName,
        email: req.body.email        
    })

    newUser.password = newUser.generateHash(req.body.password);
    newUser.save().then({ runValidators: true }, rec => {
        return res.status(201).json(rec);
    })
})

app.post('/login',(req, res) => {
    User.findOne({email: req.body.email}).then(loginUser => {
        //console.log("loginUser :" + loginUser);
        if(!loginUser){ 
           return  res.status(401).json({ message: 'Invalid username and password'})
        }

        if(loginUser.validPassword(req.body.password)){ console.log("password wrong");
            return  res.status(401).json({ message: 'Invalid username and password'})
        }
        
        const withToken = { email: loginUser.email, _id: loginUser._id };
        withToken.token = loginUser.generateJWT();
        return res.status(200).json(withToken)
    })
})

app.get('/getuser', authenticate, (req, res) => {
    User.find().then(rec => {
        return res.status(200).json(rec)
    })
})


app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(3000, ()=> console.log("Listening on port 3000..."));