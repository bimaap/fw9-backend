const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    return res.json({
        success: true,
        message: 'Backend is running well'
    })
})

app.use('/', require('./src/routes'))

app.use('*', (req, res)=>{
    return res.status(404).send({
        success: false,
        message: "Resource not found"
    })
})

app.listen(process.env.PORT, ()=>{
    console.log('App is running on port ' + process.env.PORT)
})