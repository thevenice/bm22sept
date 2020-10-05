"use strict"
// i will comment all progress nowwards
// get express from module
const express = require("express");
const exphbs= require('express-handlebars');
// make app of express
const app = express();
const mailer= require('./mailer')
// const sitemap= require('./public/sitemap.xml')
// var xml2js = require('xml2js');
// var parser = new xml2jns.Parser();
// var extractedData ="";

app.use(express.urlencoded())
//set view engine
//in this setup it will be handlebars
app.set('view engine', "handlebars")
// or instead of full form we can use "hbs"

app.engine("handlebars", exphbs({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "main",
    partialsDir: __dirname + '/views/partials/'
}))

// post req
app.use('/api/contact', mailer);
// sitemap starts
// parser.parseString(sitemap, function(err, result){
//     extractedData = result['config']['data'];
//     console.log(extractedData)
// })
// sitemap ends

// --
//Serves static files (we need it to import a css file)
app.use(express.static( __dirname +'/public'))
//set routes
//app dot get() to get files from server configs

// index page 
app.get('/', function(req, res) {
    res.render("main", {layout: "index"} );
    // res.render("main");
});
// about page 
app.get('/about', function(req, res) {
    res.render("main", {layout: "about"} );
    // res.render("main");
});
// services page 
app.get('/services', function(req, res) {
    res.render("main", {layout: "services"} );
    // res.render("main");
});
// contact page 
app.get('/contact', function(req, res) {
    res.render("main", {layout: "contact"} );
    // res.render("main");
});
// signup page 
app.get('/signup', function(req, res) {
    res.render("main", {layout: "signup"} );
    // res.render("main");
});
// signin page 
app.get('/signin', function(req, res) {
    res.render("main", {layout: "signin"} );
    // res.render("main");
});
// letstalk page 
app.get('/letstalk', function(req, res) {
    res.render("main", {layout: "letstalk"} );
    // res.render("main");
});
// survey page 
app.get('/survey', function(req, res) {
    res.render("main", {layout: "survey"} );
    // res.render("main");
});


//app dot listen to run this file on specific port
app.listen(8000, console.log('running on 8000'));
