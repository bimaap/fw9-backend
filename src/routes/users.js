const users = require('express').Router()

const userController = require('../controllers/users')

users.get('/', userController.getAllUsers)
users.post('/post_body', userController.postUserByIdBody)
users.post('/post_params', userController.postUserByIdParams)
users.put('/put', userController.putUserById)
users.patch('/patch', userController.patchUserById)
users.delete('/delete', userController.deleteUserById)
users.get('/detail', userController.detailUsers)

module.exports = users