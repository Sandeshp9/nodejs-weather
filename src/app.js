const path = require('path')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const express = require('express')
const hbs = require('hbs')

const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather app",
        name:"Sandesh"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Sandesh"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:"This is the help page",
        title:"Help page",
        name:"Sandesh"
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"Address needs to be provided"
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }
        
        //console.log('Data:',data)
        forecast(latitude,longitude,(error,Forecastdata)=>{
            if(error){
                return res.send({error})
            }  
            const forecaststring = 'The temperature is '+Forecastdata.main.temp+String.fromCharCode(176)+' Celsius.'
            res.send({
                temp:Forecastdata.main.temp,
                forecast:forecaststring,
                location,
                description:Forecastdata.weather[0].description,
                address
            })
            //console.log(Forecastdata.weather[0].description)
            //console.log("The temperature in "+location+" is "+Forecastdata.main.temp+" degrees.")
        })
    })

    
})


app.get('/pro',(req,res)=>{

    if(!req.query.search){
        console.log("search required")
        return res.send({
            error:"Search is required"
            
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Error 404",
        errormsg:"Help article not found",
        name:"Sandesh"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"Error 404",
        errormsg:"Page not found",
        name:"Sandesh"
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})