const transaction = require('express').Router()

const transactionController = require('../controllers/transaction')
const { check } = require('express-validator');

const validationUser = [
    check('amount').isInt().withMessage('Amount must be Number'),
    check('date_time').not().isEmpty().withMessage('Date time cannot Empty'),
    check('notes').not().isEmpty().withMessage('Notes cannot Empty'),
]

transaction.get('/', transactionController.getAllTransaction)
transaction.post('/post', ...validationUser, transactionController.postTransaction)
transaction.patch('/patch', ...validationUser, transactionController.patchTransaction)
transaction.delete('/delete', transactionController.deleteTransaction)
transaction.get('/detail', transactionController.detailTransaction)

module.exports = transaction