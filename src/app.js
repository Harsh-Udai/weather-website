const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast =require('./utils/forecast.js');



// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));

const app = express();
const partialsPath = path.join(__dirname,'../views/partials');


app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../views/view'))
hbs.registerPartials(partialsPath);


//serving the static file
app.use(express.static(path.join(__dirname,'../public')));

app.get('/',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name: "Harsh Udai"
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Harsh Udai'
    });
})
 
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Harsh Udai'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "No address"
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error})
        }
    
        forecast(latitude, longitude, (error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            
            else{
                return res.send ({
                    location: location,
                    forecastData: forecastData,
                    address: req.query.address
                })
            }
        })
    })
     
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }

    console.log(req.query);
    res.send({
        prodcuts: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404_error',{
        title:'404',
        error:"Help article not found!",
        name: "Harsh Udai"
    })
})

app.get('*',(req,res)=>{
    res.render('404_error',{
        title:'404',
        error:"Page Not Found!",
        name: "Harsh Udai"
    });
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000!");
});