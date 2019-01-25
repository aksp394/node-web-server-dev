const express = require('express');
const hbs = require('hbs');
var port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());


app.get('/', (req, res) => {
    res.send('Hello Express!!');
});

app.get('/about', (req, res) =>{
 res.render('about.hbs', {
     welcomeMessage : 'About page'
 });
});

app.get('/home', (req, res) => {
 res.render('home.hbs', {
    welcomeMessage : 'Welcome Arun'
 })
});

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});