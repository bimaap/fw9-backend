const notification = require('express').Router()

const notificationController = require('../controllers/notification')

notification.get('/', notificationController.getAllNotification)
notification.post('/post', notificationController.postNotification)
notification.patch('/patch', notificationController.patchNotification)
notification.delete('/delete', notificationController.deleteNotification)
notification.get('/detail', notificationController.detailNotification)

module.exports = notification