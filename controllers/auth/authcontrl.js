const doctorShema =require('../../module/doctorShema')
const patientShema = require('../../module/patientshema') 
const JWT = require('jsonwebtoken')

const bcrypt = require('bcrypt')

// Register Account
    const register =async(req,res,next)=>{
        try {
            const {name ,email,role ,password}= req.body
           
             
            //check the doctor
            if( role === "doctor") {
                    const check = await doctorShema.findOne({email:email}).exec()
                    if (check){
                        return res
                        .status(208)
                        .send({
                            success: false,
                            message: 'This email already used.'
                        })
                    }
                    
                      // Password Hash
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password,salt)
                    req.body.password = hashedPassword;
                     // Create account object
                     const newacount  = new doctorShema({
                        name:name,
                        email:email,
                        role: role,
                        password:hashedPassword
                     })
                       // Save information
                     const saveaccount = await newacount.save()
                     if(saveaccount){
                        return res.status(200).send({
                            success: true,
                            message: ' Successfully doctor account Registered'
                        })
                     }




            }
        // Patient Check
       if(role ==="patient"){
        
            const check = await patientShema.findOne({email:email})
                if (check){
                    return res
                        .status(208)
                        .send({
                            success: false,
                            message: 'This email already used.'
                        })

                }
           // Password Hash
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password,salt)
                req.body.password = hashedPassword;
            // Create account object
                const newacount  = new patientShema({
                    role: role,
                    name:name,
                    email:email,
                 password:hashedPassword
                 })

         // Save information
         const saveaccount = await newacount.save()
         if(saveaccount){
            return res.status(200).send({
                success: true,
                message: ' Successfully Patient account Registered'
            })
         }

    }




        } catch (error) {
          if(error) next(error)
        }
    }
    //Login Account
    const login =async(req,res,next) =>{
         try {
          const {email,password,role} = req.body

    // Doctor Check
        if(role==="doctor"){
            const user = await doctorShema.findOne({email}).exec()
            if(!user){
                return res.status(400).send({
                    success:false,
                    message:'invdied email error  '
                })
            }

            const ismach = await bcrypt.compare(req.body.password, user.password)
                if(!ismach){
                    return res.send({
                        success:false,
                        message:'invdied email error '
                    })
                }

                const token = JWT.sign({_Id:user._id, name: user.name, role: user.role },
                    'SECRET', { expiresIn: '1d' })
            res.status(200).send({
                         success:true,
                        message:'doctor login successfull',
                        user:{
                            _id :user._id,
                            name :user.name,
                            email:user.email,
                        },
                        token


            })
            
            if(!user){
                const result  = await bcrypt.compare(password,account.password)
                if(result){
    // Generate JWT token
    // In MongoDB, the $set operator is used to replace the value of a field to the specified value. 
                    const token = await JWT.sign(
                        {id :user._id},process.env.JWT_SECRET,{expiresIn:"1d"}
                    )
                    // Update JWT token   // $set operator is used to replace the value of a field to the specified value. 
                    // This method if it finds a match in the string returns the first match or it will return null.
                    const  Updatetoken = await  doctorShema.findOneAndUpdate(
                           { _id: account._id, },{
                             $set :{'access_token': token, 'status': 'online' },
                           },{new:true}).exec()
                           if(Updatetoken){
                            return res.status(200).send({
                                success: true,
                                message:'doctor login successfull',
                             token
                            })
                          
                           }
                           return res.status(400).send({
                            success: false,
                            message: 'Invalid e-mail or password'
                           })
 
                }
            }

        }
            
    // Patient Check
        if(role==="patient"){
            const account = await patientShema.findOne({email}).exec()
      // Compare with password

            if(account){
                    const result = await bcrypt.compare(password,account.password)
        // Generate JWT token
                    if (result){
                        const token = await JWT.sign(
                            { id :account._id, name :account.name,role:account.role,},process.env.SECRET,{expiresIn:"1d"}
                        )
 // Update JWT token 
                const Updatetoken = await patientShema.findOneAndUpdate(
                    { _id: account._id },{
                        $set :{'access_token': token, 'status': 'online' },
                      },{new:true}).exec()
                      if(Updatetoken){
                        return res.status(200).send({
                            success: true,
                            message:'patient login successfull',
                           token
                        })
                      
                       }
                       return res.status(400).send({
                        success: false,
                        message: 'Invalid e-mail or password'
                       })


                    }
            }
        }



        } catch (error) {
            if (error) next(error)
        }
    }

    //loginout 

    const loginout =async(req,res,next)=>{
        try {
    // Split token
            const token = req.headers.authorization.split(' ')[1]
            const decode = JWT.verify(token,'SECRET')
 // Doctor Logout
            if(decode.role==='doctor'){
  // Find account using account id and role
                let account = await doctorShema.findOne({
                    $and :[
                        {_id:decode.id},
                        {role:decode.role}
                    ]
                })
                if(!account){
                    return res.status(404).json({
                        status: false,
                        message: 'Invalid token'
                    })
                }
  // Find account and null token field 
                    const updatetoken = await doctorShema.findByIdAndUpdate(
                        {id:decode.id}, 
                        { $set: { 'access_token': null, 'status': 'offline' } })


                        if (!updatetoken) {
                            return res.status(404).json({
                                status: false,
                                message: 'Invalid token'
                            })
                        }
            
                        res.status(200).json({
                            status: true,
                            message: 'Successfully logged out'
                        })

            }
 // Patient Logout
            if(decode.role==="patient"){
  // Find account using account id and role
                const account = await patientShema.findOne({
                    $and :[
                        {_id:decode.id},
                        {role:decode.role}
                    ]
                })
                if(!account){
                    return res.status(404).json({
                        status: false,
                        message: 'Invalid token'
                    })
                }
                    
                const updatetoken = await patientShema.findByIdAndUpdate(
                    {_id:decode.id}, 
                    { $set: { 'access_token': null, 'status': 'offline' } })


                    if (!updatetoken) {
                        return res.status(404).json({
                            status: false,
                            message: 'Invalid token'
                        })
                    }
        
                    res.status(200).json({
                        status: true,
                        message: 'Successfully logged out'
                    })




            } 



        } catch (error) {
          if(error)next(error)  
        }
    }
// Reset Password
const Reset = async (req, res, next) => {
    try {
        const { email } = req.body

        console.log({ email, password })
    } catch (error) {
        if (error) next(error)
    }
}
    module.exports = {
        Reset,
        loginout,
        register,
        login
    }