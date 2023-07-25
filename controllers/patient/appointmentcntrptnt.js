const doctorshema = require('../../module/doctorShema')
 
const patientshema = require('../../module/patientshema')
const appointment = require('../../module/appointment')
 

const getdocotorByidctrl= async(req,res)=>{
    try {
        const doctor = await doctorshema.findOne({doctor_id:req.body.userId})
        
        res.status(200).send({
            success:true,
            message:" get  singledoctor  info success",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message :"error in single doctor "
        }) 
    }

}



const appointmentctrl =async(req,res)=>{
    try {
        // req.body.date = moment(req.body.date,"DD-MM-YYYY").toISOString()
        // req.body.time = moment(req.body.date,"HH.mm").toISOString()
       req.body.status ='pending'

       const newappointment = new appointment(req.body )
        await newappointment.save()
      console.log(newappointment)
    
        const doctor  = await doctorshema.findOne({ doctor_id:req.body.userId})
      
        
       doctor.notifcation.push({
            type :"new appoinmnet request",
            message:`new appoinmnet request from ${req.body.patientId}`,
            // onclickpath:'/user/appointmnets'
        })
        await doctor.save()
 
        res.status(200).send({
            success:true,
            message:"appoinmnet book succesussfull"
        })

        

    } catch (error) {
        console.log(error)
        error
            res.status(500).send({
                success:false,
                message :"error in appoinmnet "
            }) 
    }
}

 


module.exports = {getdocotorByidctrl, appointmentctrl}