const jwt = require("jsonwebtoken")
const patientshema = require('../module/patientshema')
const doctorshema = require('../module/doctorShema')
 
const ispatient = async (req, res, next) => {
    try {
        const token = await req.headers.authorization
        
        if (!token) return res.status(404).json({ message: 'Token not found' })
       
        // decode token
        const splitToken = token.split(' ')[1]
  
        const decode = jwt.verify(splitToken, process.env.SECRET)
         // find user using token 
        const user = await patientshema.findOne({ $and: [{ _id: decode.id }, { access_token: splitToken }] }, { role: 'patient' }).exec()
      
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        // check role
        if (user.role === 'patient') {
            next()
        } else {
            return res.status(401).json({ message: 'You have no permissions to access' })
        }

    } catch (error) {
        console.log(error)
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(410).json({ message: 'Token expired' })
            }
            return res.status(501).json({ message: 'unauthorized request' })
        }
    }
}

// Doctor Permission
const isdoctor = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
      
        if (!token) return res.status(404).json({ message: 'Token not found' })

        // decode token
      
 
        const decode = await jwt.verify(token , 'SECRET')
        
        // { $and: [{ _id: decode.id }, { access_token: splitToken }] }, { role: 'doctor' }
        // find doctor using token 
        const doctor = await doctorshema.findOne( 
            { $and: [{ _Id: decode.id }] }, { role: 'doctor' }
            // { $and :[{_Id:decode.id},{role:decode.role}]}
            ) 
        if (!doctor) return res.status(401).json({ message: 'Invalid token' })

        // check role
        if (doctor.role === 'doctor')
            next()
        else
            return res.status(401).json({ message: 'You have no permissions to access' })

    } catch (error) {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(410).json({ message: 'Token expired' })
            }
            return res.status(501).json({ message: 'unauthorized request' })
        }
    }
}

module.exports = {
    ispatient,
    isdoctor
}