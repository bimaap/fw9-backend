const users = require('express').Router()
const userController = require('../controllers/users')
const { check } = require('express-validator');
const bcrypt = require('bcrypt')

const validationUser = [
    check('username').isLength({min:4}).withMessage('Username length min 4'),
    check('email').isEmail().withMessage('Incorrect email format'),
    check('password')
        .isLength({min:6}).withMessage('Password length min 6')
        .customSanitizer(async (pass)=>{
            return await bcrypt.hash(pass, 1)
        }),
    check('pin').isLength({min:6, max:6}).withMessage('Pin length must be 6')
]

users.get('/', userController.getUsers)
users.post('/', ...validationUser, userController.postUser)
users.patch('/:id', ...validationUser, userController.patchUser)
users.delete('/:id', userController.deleteUser)
users.get('/:id', userController.detailUser)

module.exports = users