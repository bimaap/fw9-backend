const authentication = require('express').Router()
const authenticationController = require('../controllers/authentication')
const { check } = require('express-validator');
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

const validationRegister = [
    check('username')
        .not().isEmpty().withMessage('Username cannot Empty')
        .isLength({min:4}).withMessage('Username length min 4'),
    check('email')
        .not().isEmpty().withMessage('Email cannot Empty')
        .isEmail().withMessage('Incorrect email format'),
    check('password')
        .not().isEmpty().withMessage('Password cannot Empty')
        .isLength({min:8}).withMessage('Password length min 8')
        .customSanitizer(async (pass)=>{
            return await bcrypt.hash(pass, 1)
        })
]

const validationPin = check('pin')
    .not().isEmpty().withMessage('Pin cannot Empty')
    .isNumeric().withMessage('Pin must be a number')
    .isLength({min:6, max:6}).withMessage('Pin length must be 6')

const validationPassword = check('password')
    .not().isEmpty().withMessage('Password cannot Empty')
    .isLength({min:8}).withMessage('Password length min 8')
    .customSanitizer(async (pass)=>{
        return await bcrypt.hash(pass, 1)
    })

const validationTransfer = [
    check('profile_id')
        .not().isEmpty().withMessage('ID cannot Empty')
        .isNumeric().withMessage('ID must be a number'),
    check('amount')
        .not().isEmpty().withMessage('Balance cannot Empty')
        .isNumeric().withMessage('Balance must be a number')
]

const validationPhone = check('phone_number')
    .not().isEmpty().withMessage('Phone number cannot Empty')
    .isNumeric().withMessage('Pin must be a number')

authentication.get('/login', authenticationController.login)
authentication.post('/register', ...validationRegister, authenticationController.register)
authentication.get('/setPin/:id', validationPin, authenticationController.setPin)
authentication.get('/forgotPassword/:id', validationPassword, authenticationController.forgotPassword)

authentication.get('/profile', auth, authenticationController.profile)
authentication.get('/historyTransactions', auth, authenticationController.historyTransactions)
authentication.get('/transfer', auth, ...validationTransfer, authenticationController.transfer)
authentication.patch('/phone', auth, validationPhone, authenticationController.phone)
authentication.patch('/changePin', auth, validationPin, authenticationController.changePin)
authentication.patch('/changePassword', auth, validationPassword, authenticationController.changePassword)

module.exports = authentication