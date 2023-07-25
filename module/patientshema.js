const {mongoose,Schema } = require('mongoose')

const patientmoduleshema = mongoose.Schema({
    patientId:{
        type:String,
    },
    name :{
            type:String,
            trim :true,
            maxlength:50,
            // required : [true, "name is required"],

        },
        email :{
            type:String,
            trim :true,
            unique:true,
            // required : [true, "name is email "],

        },
        role:{
            type:String,
            default:"patient",
            enum:["patient"]
             
         },
        //  status:{
        //     type:String,
        //     default:"offline",
        //     enum :["online,offline"]
        //  },
         password:{
            type:String,
            trim:true,
            required:true
        },
        image:{
            type:String,
            trim:true,
            default:null
        },
        age:{
            type:Number,
            trim:true,
            dafault:null
        },
        height:{
            type:String,
            trim:true,
            default:null
        },
        weight:{
            type:String,
            trim:true,
            default:null
        },
        bloodPressure:{
            type:String,
            trim:true,
            deafult:true
        },
        // appointmentRequests:[{
        //     type:Schema.Types.ObjectId,
        //     ref:'Appointment'
        // }],
        access_token:{
            type:String,
            trim:true,
            default:null
        },
        notifcation: {
            type: Array,
            default: [],
          },
          seennotification: {
            type: Array,
            default: [],
          },
    },{
        timestamps:true
    })
    module.exports = mongoose.model("patientshema",patientmoduleshema)