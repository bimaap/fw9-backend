const transactionType = require('express').Router()

const transactionTypeController = require('../controllers/transactionType')
const { check } = require('express-validator');

const validationUser = [
    check('name').not().isEmpty().withMessage('Name cannot Empty'),
    check('description').not().isEmpty().withMessage('Description cannot Empty')
]

transactionType.get('/transactionType/', transactionTypeController.getAllTransactionType)
transactionType.post('/transactionType/', ...validationUser, transactionTypeController.postTransactionType)
transactionType.patch('/transactionType/:id', ...validationUser, transactionTypeController.patchTransactionType)
transactionType.delete('/transactionType/:id', transactionTypeController.deleteTransactionType)
transactionType.get('/transactionType/:id', transactionTypeController.detailTransactionType)

module.exports = transactionType