const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000

//Define path for express configurations
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prarabdh Gupta'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Prarabdh Gupta'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Prarabdh Gupta',
        helpText: 'This is some helpful text. '
    });
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const address = req.query.address;

    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Prarabdh Gupta',
        errorMessage: 'Help Article not found. '
    });
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Prarabdh Gupta',
        errorMessage: 'Page not found. '
    });
})
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})