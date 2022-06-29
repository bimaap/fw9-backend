const profile = require('express').Router()

const profileController = require('../controllers/profile')

profile.get('/', profileController.getAllProfile)
profile.post('/post', profileController.postProfile)
profile.patch('/patch', profileController.patchProfile)
profile.delete('/delete', profileController.deleteProfile)
profile.get('/detail', profileController.detailProfile)

module.exports = profile