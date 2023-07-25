const express = require('express')
const router = express.Router()
const authController = require('../middleware/authController')
const doctorprofilecntlr = require('../controllers/doctor/doctorprofilecntlr')
 const notifcation = require("../controllers/doctor/appointmentController")
 const authmiddleware = require('../middleware/checkid')

router.post('/itsme',doctorprofilecntlr.itsme)
router.post('/profile',authController.isdoctor,doctorprofilecntlr.upadteProfile)
router.post('/profile',authController.isdoctor,doctorprofilecntlr.upadteProfile)
router.post('/get-all-notification', authController.isdoctor,notifcation.getallnotidoctorcontroller )

router.post('/delete-all-notification',authController.isdoctor,notifcation.deleteallnotidoctorcontroller)

router.get('/appointment',authController.isdoctor,notifcation.patientappoinmnt)

router.post('/status',authController.isdoctor,notifcation.statusupadatecontrl)




module.exports = router