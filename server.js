require('dotenv').load();

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mp = require('mongodb-promise');
var path = require('path');
var port = process.env.PORT || 3000;
var db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('web'));

mp.MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds145158.mlab.com:45158/slater407').then(function(database){ 
	
	db = database;
	
	// Start Server
	app.listen(port, function() {
		console.log('Server: Running on port: ' + port);
	});

}, function(err) {
    console.log(err);
});

// All Recipes
app.get('/recipes', function(req, res) {
	return db.collection('recipes').then(function(col) {
		return col.find().each(function(doc) {
            console.log('recipes: ', doc);
        });
	}).fail(function(err) {
		console.log(err)
	});
});

// All Users
app.get('/users', function(req, res) {
	return db.collection('users').then(function(col) {
		return col.find().each(function(doc) {
            console.log('users: ', doc);
        });
	}).fail(function(err) {
		console.log(err)
	});
});

// Specific User
app.get('/specificUser', function(req, res) {
	var user = res.req.body;

	return db.collection('users').then(function(col) {
		return col.find(user).each(function(doc) {
            console.log('users: ', doc);
        });
	}).fail(function(err) {
		console.log(err)
	});
});
