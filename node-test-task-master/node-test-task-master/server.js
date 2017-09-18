var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/public', express.static(path.join(__dirname + '/public')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongodb');
var Schema = mongoose.Schema;
// create a schema
var userSchema = new Schema({
  name: String,
  pictures: [],
  email: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/public/" + "userlist.html" );
})

app.get('/addUserPage', function (req, res) {
   console.log("Got a GET request for the adduserpage");
   res.sendFile( __dirname + "/public/" + "addUserPage.html" );
})

app.get('/updateUserPage', function (req, res) {
   console.log("Got a GET request for the updateuserpage");
   res.sendFile( __dirname + "/public/" + "updateUserPage.html" );
})

// This responds a POST request for the /add_user page.
app.post('/add_user', function (req, res) {
   console.log("Got a POST request for the homepage");
   // create a new user
   var newUser = User({
        name: req.body.name,
        email: req.body.email
   });
   // save the user
   newUser.save(function(err) {
        if (err) throw err;
        console.log('User created!');
        res.send("Success");
   });
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user/:id', function (req, res) {
   var _id = req.params.id;
   console.log("Got a DELETE request for /del_user/"+_id);
   User.findByIdAndRemove(_id, function(err) {
    if (err) throw err;

    // we have deleted the user
    console.log('User deleted!');
   });
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;
        // object of all the users
        console.log(users);
        res.json(users);
    });
})

app.get('/get_user/:id', function (req, res) {
   console.log("Got a GET request for /get_user");
   User.findById(req.params.id, function(err, user){
        console.log(user);
        res.json(user);
   });
})

// This responds a PUT request for the /del_user page.
app.put('/update_user', function (req, res) {
   var _id = req.body._id;
   console.log("Got a UPDATE request for /update_user/"+_id);
   User.findById(_id, function(err, user) {
        if (err) throw err;
        user.name = req.body.name;
        user.email = req.body.email;
        // save the user
        user.save(function(err) {
            if (err) throw err;
            console.log('User successfully updated!');
        });
   });
   res.send('Hello PUT');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})