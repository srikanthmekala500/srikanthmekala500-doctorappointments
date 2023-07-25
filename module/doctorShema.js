
const { Schema, mongoose } = require("mongoose")

const doctormoduleShema = new mongoose.Schema({
    doctorId:{
        type:String,
    },
        name:{
            type:String,
            trim :true,
            maxlength :50,
            required : [true, "name is required"],

        },
        email:{
            type:String,
            trim :true,
            unique: true,
            required : [true, "EMAIL is required"],

        },
        role: {
            type: String,
            default: "doctor",
            enum: ["doctor"],
            required : [true, "password is required"],
        },
        password: {
            type: String,
            trim: true,
            required : [true, "password is required"],
        }, college: {
            type: String,
            trim: true,
            default: null
        },
        passingYear: {
            type: Date,
            default: null
        },
        specialist: {
            type: String,
            trim: true,
            default: null
        },
        currentHospital: {
            type: String,
            trim: true,
            default: null
        },
        // isApproved: {
        //     type: String,
        //     enum: ["approved", "pending", "submitted", "canceled"],
        //     default: "pending"
        // },
        status:{
            type:String,
            required:true ,
            default:"pending" 
        },
        // status:{
        //     type:String,
        //     default:"offline",
        //     enum :["online,offline"]
        //  },
        councilHour: [{
            type: Schema.Types.ObjectId,
            ref: 'council'
        }],
        appointments: [{
            type: Schema.Types.ObjectId,
            ref: 'appointment'
        }],
        access_token: {
            type: String,
            trim: true,
            default: null
        },
        image: {
            type: String,
            trim: true,
            default: null
        },
        city: {
            type: String,
            trim: true,
            default: null
        },
        country: {
            type: String,
            trim: true,
            default: null
        },
        currentAddress: {
            type: String,
            trim: true,
            default: null
        },
        fees:{
            type: String,
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
    // timestamps:true,
    createdAt: new Date(0), updatedAt: new Date(0) 
})

module.exports =mongoose.model('doctorShema',doctormoduleShema)