const express = require('express')

const authcontrl = require('../controllers/auth/authcontrl')




const router = express.Router()

router.post('/register',authcontrl.register)
router.post('/login',authcontrl.login)
router.post('/reset',authcontrl.Reset)
router.get('/loginout',authcontrl.loginout)

module.exports = router