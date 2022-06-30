const profile = require('express').Router()

const profileController = require('../controllers/profile')
const { check } = require('express-validator');

const validationUser = [
    check('full_name').not().isEmpty().withMessage('Full name cannot Empty'),
    check('phone_number').not().isEmpty().withMessage('Phone number cannot Empty'),
    check('balance').isInt().withMessage('Balance must be Number'),
    check('picture').not().isEmpty().withMessage('Picture cannot Empty'),
]

profile.get('/', profileController.getAllProfile)
profile.post('/post', ...validationUser, profileController.postProfile)
profile.patch('/patch', ...validationUser, profileController.patchProfile)
profile.delete('/delete', profileController.deleteProfile)
profile.get('/detail', profileController.detailProfile)

module.exports = profile