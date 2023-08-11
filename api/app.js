const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./Routes/memberRoutes')
require('dotenv').config()


const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/v1/', router)


const server = app.listen(port, ()=>{
    console.log(`The Jitu Community Club API is running on port: ${port}`);
})

module.exports = server