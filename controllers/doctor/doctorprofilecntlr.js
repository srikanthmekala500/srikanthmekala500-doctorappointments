const JWT = require("jsonwebtoken")
const doctorShema = require("../../module/doctorShema")
const councilshema = require ('../../module/council')
 const unlinkdelete = require('../../fileuse/filedelete')
const upload = require('../../fileuse/fileupload')

const hostURL  = require('../../fileuse/hosturl')
 
 

const itsme = async(req,res,next)=>{
            try {
      // Split token

      const token = await req.headers.authorization.split(' ')[1]
    //   
     
      if (!token) return res.status(404).json({ message: 'Token not found' })

      // decode token


      const decode = await JWT.verify(token, 'SECRET')
                 // const token = req.headers.authorization
                // const decode = JWT.verify(token,'SECRET')
                  
 // Find account using account id and role
                const account = await doctorShema.findOne({
                    $and :[{_Id:decode.id},{role:decode.role}]
                },
                
                {access_token:0,password:0}).populate('councilHour').exec()
              
                if (!account){
                    return res.status(400).send({
                        status: false,
                        message: 'Invalid token'
                    })
                }
                    for( const property in account){
                        if (property === "image"){
                            account[property] = hostURL(req) + 'uploads/doctor/profiles/' + account[property]
                        }
                    }
                    return res.status(200).json({
                        status: true,
                        data: account
                    })
            

            } catch (error) {
                    if(error) next(error)
                
            }
        }
// Update Profile
const upadteProfile = async(req,res)=>{  
    try {
        const doctor = await doctorShema.findOneAndUpdate(
          { doctorId : req.body.userId } ,
          // {id: req.body.userId},
           req.body,{new:true}
        // findOneAndUpdate
      
        );
        console.log(doctor)
        res.status(201).send({
          success: true,
          message: "Doctor Profile Updated",
          data: doctor,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Doctor Profile Update issue",
          error,
        });
      }
    

//     
    // try {
    //     let fliename
    // const {
    //     name,
    //     college,
    //     passingYear,
    //     specialist,
    //     currentHospital,
    //     country,
    //     city,
    //     currentAddress,
        
    //     day,
    //     startTime,
    //     endTime
    // } = req.body  
    
    // const doctor = await doctorShema.findOneAndUpdate({Id:req.body.Id})
        
                   
    //     if(req.files){
    //                 await unlinkdelete.filedalete('./uploads/doctor/profiles/', doctor.image)
               
              
    //             fliename = upload.fileupload(req.files.image, './uploads/doctor/profiles/')

    //             const updateData = {
    //                 name: name,
    //                 image: fliename,
    //             }
    //             const updateDoctor = await doctorShema.updateOne(
    //                 { $set: updateData },
    //                 { new: true }
    //             )
    //             if (!updateDoctor) {
    //                 return res.status(501).json({
    //                     message: 'Update error'
    //                 })
    //             }
    
    //             return res.status(200).json({
    //                 status: true,
    //                 message: 'Successfully  complete image.'
    //             })

    //         }
              
    //         else if( college &&
    //             passingYear &&
    //             specialist &&
    //             currentHospital &&
    //             country &&
    //             city &&
    //             currentAddress){
    //                 const updateData = {
    //                     college:college,
    //                     passingYear:passingYear,
    //                     specialist:specialist,
    //                     currentHospital:currentHospital,
    //                     country:country,
    //                     city:city,
    //                     currentAddress:currentAddress
    //                 }

    //                 const updateDoctor = await doctorShema.updateOne(
    //                     { $set: updateData },
    //                     { new: true }
    //                 ).exec()
    //                 if (!updateDoctor) {
    //                     return res.status(501).json({
    //                         message: 'Update error'
    //                     })
    //                 }
        
    //                 return res.status(200).json({
    //                     status: true,
    //                     message: 'Successfully  complete  .'
    //                 })



    //             }else if(day&&
    //                 startTime&&
    //                 endTime){
    //                     const newconcil = new councilshema({
    //                         doctor :doctor._id,
    //                         schedule :{day: day, startTime: startTime, endTime: endTime}
    //                         })
    //                         let council = await newconcil.save()
    //                         const updateDoctor = await doctor.updateOne(
    //                             {
    //                                 $set: {
    //                                     updateRange: 100,
    //                                     updateStep: 6,
    //                                     isApproved: 'submitted',
    //                                     'councilHour': [council._id]
    //                                 }
    //                             },
    //                             { new: true }
    //                         ).exec()
                
    //                         if (council && updateDoctor) {
    //                             return res.status(200).json({
    //                                 status: true,
    //                                 message: 'Successfully all steps completed.'
    //                             })
    //                         }
    //                 }


      

    // } catch (error) {
    //     console.log(error)
    //     res.status(500).send({
    //         success:false,
    //         message :"error in fetching doctor "
    //     }) 
    // }  
            

}




module.exports = {
        itsme,upadteProfile 
  }