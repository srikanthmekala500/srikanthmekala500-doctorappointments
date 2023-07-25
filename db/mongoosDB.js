const mongoose = require('mongoose')
const connectdb = mongoose.connect('mongodb://srikanth:srikanth@ac-azirweb-shard-00-00.btkhj6y.mongodb.net:27017,ac-azirweb-shard-00-01.btkhj6y.mongodb.net:27017,ac-azirweb-shard-00-02.btkhj6y.mongodb.net:27017/doctorappointment?ssl=true&replicaSet=atlas-swdu7d-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(()=>{
    console.log("connect successful")
}).catch((err)=>{
    console.log(err)
})

module.exports = connectdb