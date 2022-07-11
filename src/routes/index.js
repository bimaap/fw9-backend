const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/profile', require('./profile'))
router.use('/transaction', require('./transaction'))
// router.use('/transactionType', require('./transactionType'))
// router.use('/notification', require('./notification'))
router.use('/auth', require('./authentication'))

router.use('/admin', require('./notification'))
router.use('/admin', require('./transactionType'))

module.exports = router