const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const dotenv = require('dotenv').config()
const connectdb = require('./db/mongoosDB')
 
const path = require('path')
// import {fileURLTopath} from "url"

const port = process.env.PORT
//middleware 
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
 
//main routers 
 
 
app.use('/api/v1/auth', require ('./router/authrouter'))
app.use('/api/v1/auth',require('./router/doctorrouter'))
app.use('/api/v1/auth',require('./router/patientRoute'))
 
// static faile
// const __filename =fileURLTopath(import.meta.url)
// const __dirname =path.dirname(__filename)
app.use(express.static(path.join(__dirname,"./client/build")))

app.get("*",function(req,res){
res.sendFile(path.join(__dirname,"./client/build/index.html"))
})
app.listen(port,()=>{
    console.log(`server get started ${process.env.DEV_MODEL} ${port}`)
})
