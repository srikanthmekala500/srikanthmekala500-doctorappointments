const { Schema, mongoose } = require("mongoose")

const councilshema = mongoose.Schema({
    doctor:{
        type:Schema.Types.ObjectId,
        ref:'doctorShema'
    },
    schedule:{
        day:{
            type:String,
            trim:true,
            required:true
        },
        startTime:{
            type:String,
            trim:true,
            required:true
        },
        endTime:{
            type:String,
            trim:true,
            required:true
        }
    }
})
module.exports =mongoose.model('council',councilshema)