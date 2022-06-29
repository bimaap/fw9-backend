const transactionType = require('express').Router()

const transactionTypeController = require('../controllers/transactionType')

transactionType.get('/', transactionTypeController.getAllTransactionType)
transactionType.post('/post', transactionTypeController.postTransactionType)
transactionType.patch('/patch', transactionTypeController.patchTransactionType)
transactionType.delete('/delete', transactionTypeController.deleteTransactionType)
transactionType.get('/detail', transactionTypeController.detailTransactionType)

module.exports = transactionType