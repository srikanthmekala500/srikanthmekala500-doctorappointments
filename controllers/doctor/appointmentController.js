const doctorShema = require("../../module/doctorShema")
const appoinmnetschema= require('../../module/appointment')






const getallnotidoctorcontroller =async(req,res)=>{
    try {
    const user = await doctorShema.findOne({ doctorId : req.body.userId })
   
    const seennotification = user.seennotification;
   
    const  notifcation =user.notifcation
    seennotification.push(...notifcation) 
    user.notifcation =[]
    user.seennotification =notifcation
    const updateuser = await user.save()
   
    res.status(200).send({
        success:true,
        message :'all notofication are marked red ',
        data :updateuser
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"error applydoctor",
                success:false ,
                error
        })
    }   
}

const deleteallnotidoctorcontroller= async(req,res)=>{
    try {
        const user = await doctorShema.findOne({_id:req.body.userId})
        user.notifcation=[]
        user.seenotification=[]
        const updateuser = await user.save()
        updateuser.password= undefined
        res.status(200).send({
            success:true,
            message:"notification delete",
            data:updateuser
        })
        


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"unable to delete notification"
        })
        
    }
}

const patientappoinmnt =async(req,res)=>{
    try {
        const doctor = await doctorShema.findOne({doctorId :req.body.userId})
      const appoinmnet = await appoinmnetschema.find({doctorId:doctor._id})
      
      res.status(200).send({
        success:true,
        data:appoinmnet
      })
 
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        error,
      })

    }
}


const statusupadatecontrl = async(req,res)=>{
    try {
            const {appointmentsId,status, } =req.body
       
            const newappointment =  await appoinmnetschema.findByIdAndUpdate(appointmentsId,{status})
         
            // const appoinmnets = await appoinmnetschema.findByIdAndUpdate(appointmentsId,{status})
           
        const doctor  = await doctorShema.findOne({doctorId : req.body.userId} )
      
        const notifcation = doctor.notifcation
 
    notifcation.push({
             type :"status update ",
             message:`your appointment update ${status}`,
             // onclickpath:'/user/appointmnets'
         })
         await doctor.save()
  
         res.status(200).send({
             success:true,
             message:"your appointment update "
         })
 

    } catch (error) {
        console.log(error)
    }
}
module.exports = {deleteallnotidoctorcontroller, getallnotidoctorcontroller,patientappoinmnt,statusupadatecontrl}