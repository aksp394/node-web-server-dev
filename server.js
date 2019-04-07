const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
var port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/template/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/template/views')
app.use(express.static(__dirname + '/public'))
 
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

app.get('/',(req, res) =>{
    res.render('index',{
        title:'Weather'
    })
})


app.get('/Weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address, (error, data ={}) => {
        if(error){
            return res.send({title:'Weather',error})
        }

        forecast(data.latitude, data.longitude, (error, forecastData = {}) => {
            if(error){
                return res.send({title:'Weather',error})
            }

            res.send({
                title:'Weather',
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
    

});

app.get('/about', (req, res) =>{
 res.render('about', {
     title : 'About'
 });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
       helpMessage: 'Help page is not available'
    })
   });

   app.get('*', (req, res) => {
    res.render('404', {
        title:'Error',
       ErrorMessage: '404 Error!'
    })
   });
   

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});