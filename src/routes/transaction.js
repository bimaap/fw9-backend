const transaction = require('express').Router()

const transactionController = require('../controllers/transaction')
const { check } = require('express-validator');

const validation = [
    check('sender_id')
        .not().isEmpty().withMessage('Sender ID cannot Empty')
        .isNumeric().withMessage('Sender ID must be a number'),
    check('recipient_id').not()
        .isEmpty().withMessage('Recipient ID cannot Empty')
        .isNumeric().withMessage('Recipient ID must be a number'),
    check('type_transaction_id')
        .not().isEmpty().withMessage('Type Transaction ID cannot Empty')
        .isNumeric().withMessage('Type Transaction ID must be a number'),
    check('amount')
        .not().isEmpty().withMessage('Amount cannot Empty')
        .isNumeric().withMessage('Amount must be a number'),
    check('notes').not().isEmpty().withMessage('Notes cannot Empty'),
]

transaction.get('/', transactionController.getAllTransaction)
transaction.post('/', ...validation, transactionController.postTransaction)
transaction.patch('/:id', ...validation, transactionController.patchTransaction)
transaction.delete('/:id', transactionController.deleteTransaction)
transaction.get('/:id', transactionController.detailTransaction)

module.exports = transaction