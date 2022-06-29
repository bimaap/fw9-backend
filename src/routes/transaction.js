const transaction = require('express').Router()

const transactionController = require('../controllers/transaction')

transaction.get('/', transactionController.getAllTransaction)
transaction.post('/post', transactionController.postTransaction)
transaction.patch('/patch', transactionController.patchTransaction)
transaction.delete('/delete', transactionController.deleteTransaction)
transaction.get('/detail', transactionController.detailTransaction)

module.exports = transaction