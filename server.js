const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
        console.log('Unable to append to server log');
    }
    });
    next();
});



app.use(express.static(__dirname + '/public/'));

hbs.registerHelper('screamIt', (textToScream) => {
    return textToScream.toUpperCase()
});

app.get('/', (req, res) => {
    //res.send(`<h2>Hello World, from Express!!</h2>`);
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        currentYear: new Date().toString(),
        welcomeMessage: `Welcome to this website, hope you like it!`
    })
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to respond.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});