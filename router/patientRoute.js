const express = require('express')
const { getalldoctorctrl } = require('../controllers/patient/patientcontrls')
const authmiddleware = require('../middleware/checkid')
const authController = require('../middleware/authController')
const appointment = require('../controllers/patient/appointmentcntrptnt')
 const Router =express.Router()

Router.get('/getalldoctorctrl',authmiddleware,  getalldoctorctrl)
Router.post('/getsigledoctorinfo',authController.ispatient,appointment.getdocotorByidctrl)
Router.post('/bookappointment',authController.ispatient,appointment.appointmentctrl)

module.exports = Router