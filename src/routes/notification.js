const notification = require('express').Router()

const notificationController = require('../controllers/notification')
const { check } = require('express-validator');

const validationUser = [
    check('amount')
        .not().isEmpty().withMessage('Amount cannot Empty')
        .isNumeric().withMessage('Amount must be a number'),
    check('notes')
        .not().isEmpty().withMessage('Notes cannot Empty')
]

notification.get('/notification/', notificationController.getAllNotification)
notification.post('/notification/', ...validationUser, notificationController.postNotification)
notification.patch('/notification/:id', ...validationUser, notificationController.patchNotification)
notification.delete('/notification/:id', notificationController.deleteNotification)
notification.get('/notification/:id', notificationController.detailNotification)

module.exports = notification