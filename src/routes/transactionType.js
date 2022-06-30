const transactionType = require('express').Router()

const transactionTypeController = require('../controllers/transactionType')
const { check } = require('express-validator');

const validationUser = [
    check('name').not().isEmpty().withMessage('Name cannot Empty'),
    check('description').not().isEmpty().withMessage('Description cannot Empty')
]

transactionType.get('/', transactionTypeController.getAllTransactionType)
transactionType.post('/post', ...validationUser, transactionTypeController.postTransactionType)
transactionType.patch('/patch', ...validationUser, transactionTypeController.patchTransactionType)
transactionType.delete('/delete', transactionTypeController.deleteTransactionType)
transactionType.get('/detail', transactionTypeController.detailTransactionType)

module.exports = transactionType