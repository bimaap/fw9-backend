const profile = require('express').Router()
const profileController = require('../controllers/profile')

const { check } = require('express-validator');

const validationUser = [
    check('full_name').not().isEmpty().withMessage('Full name cannot Empty'),
    check('phone_number').not().isEmpty().withMessage('Phone number cannot Empty'),
    check('balance').isInt().withMessage('Balance must be Number'),
    // check('picture').not().isEmpty().withMessage('Picture cannot Empty'),
]

profile.get('/', profileController.getAllProfile)
profile.post('/', ...validationUser, profileController.postProfile)
profile.patch('/:id', ...validationUser, profileController.patchProfile)
profile.delete('/:id', profileController.deleteProfile)
profile.get('/:id', profileController.detailProfile)

module.exports = profile