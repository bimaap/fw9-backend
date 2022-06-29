const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/profile', require('./profile'))
router.use('/transaction', require('./transaction'))
router.use('/transactionType', require('./transactionType'))
router.use('/notification', require('./notification'))

module.exports = router