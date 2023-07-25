const patientshema = require('../../module/patientshema')
const docotorshema = require('../../module/doctorShema')
const getalldoctorctrl =async(req,res)=>{
    try {
        const doctor =await docotorshema.find({})
        res.status(200).send({
            success:true,
            message:"doctor list",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"unable to get doctor info"
        })  
    }
}

module.exports ={ getalldoctorctrl}