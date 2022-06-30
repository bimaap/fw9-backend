const notification = require('express').Router()

const notificationController = require('../controllers/notification')
const { check } = require('express-validator');

const validationUser = [
    check('amount').isInt().withMessage('Amount must be number'),
    check('notes').isLength({min:1}).withMessage('Note cannot empty')
]

notification.get('/', notificationController.getAllNotification)
notification.post('/post', ...validationUser, notificationController.postNotification)
notification.patch('/patch', ...validationUser, notificationController.patchNotification)
notification.delete('/delete', notificationController.deleteNotification)
notification.get('/detail', notificationController.detailNotification)

module.exports = notification