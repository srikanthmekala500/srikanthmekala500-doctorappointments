const {mongoose,Schema }= require('mongoose')

const appointmentshema = mongoose.Schema({
    userId:{
        type:String,
         

    },
 
    doctorId:{
        type:Schema.Types.ObjectId,
        ref:'doctorshema'
    },
    
    patientId:{
        type:Schema.Types.ObjectId,
        ref:'patientshema'
    },
    patientinfo:{
        type:String,
    },
       patient:{
            name:{
                type:String,
                trim:true,
                // required:true
            },
            phone:{
                type:String,
                trim:true,
            // required:true
        },
        age:{
            type:String,
            trim:true,
            // required:true
        },
        height:{
            type:String,
            trim:true,
            // required:true
        },
        weight:{
            type:String,
            trim:true,
            // required:true
        },
        bloodPressure: {
            type:String,
            trim:true,
            // required:true
        },
        problemShortInfo:{
            type:String,
            trim:true,
            // required:true
        }
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending" , "approved" , "expried"]
    },
    schedule:{
        day:{
            type:String,
            trim:true,
            default:null
        },
        startTime:{
            type:String,
            trim:true,
            default:null
        }
    }
},{
    timestamps:true
})

module.exports = mongoose.model("appointment",appointmentshema)