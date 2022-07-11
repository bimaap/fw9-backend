const response = require('../helpers/standardResponse')
const transactionModel = require('../models/transaction')
const { validationResult } = require('express-validator');

exports.getAllTransaction = (req, res) => {
    transactionModel.getDataQuery(`SELECT * FROM transaction`, (result, msg='') => {
        if(!result) return response(res, msg, result, false, 400);
        const key   = req.query.search  || ''
        const limit = req.query.limit   || result.rowCount
        const page  = req.query.page    || 1
        const sort  = req.query.sort    || 'ASC'
        
        const sql = `SELECT * FROM transaction WHERE notes LIKE \'%${key}%\' ORDER BY id ${sort} LIMIT ${limit} OFFSET ${page==1?0:(page-1)*limit}`
        transactionModel.getDataQuery(sql, (result2, msg='') => {
            if(!result2) return response(res, msg, result2, false, 400);

            const pageInfo = {}
            pageInfo.totalData = key? result2.rowCount:result.rowCount
            pageInfo.totalPage = key? Math.ceil(result2.rowCount/limit):Math.ceil(result.rowCount/limit)
            pageInfo.currentPage = Number(page)
            pageInfo.nextPage = Number(page) < pageInfo.totalPage? Number(page) + 1 : null
            pageInfo.prevPage = Number(page) > 1? Number(page) - 1 : null

            return response(res, 'Successfully get transactions data', result2, {pageInfo})
        })
    })
}

exports.postTransaction = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `SELECT * FROM users WHERE id='${req.body.sender_id}'`
        transactionModel.getDataQuery(sql, (result, msg='') => {
            if(!result) return response(res, 'Sender ID not found', null, false, 400);
            if(req.body.sender_id == req.body.recipient_id) return response(res, 'Cannot make transactions with the same id', null, false, 400);
    
            const sql2 = `SELECT * FROM users WHERE id='${req.body.recipient_id}'`
            transactionModel.getDataQuery(sql2, (result2, msg2='') => {
                if(!result2) return response(res, 'Recipient ID not found', null, false, 400);
    
                const sql3 = `SELECT * FROM transaction_type WHERE id='${req.body.type_transaction_id}'`
                transactionModel.getDataQuery(sql3, (result3, msg3='') => {
                    if(!result3) return response(res, 'Type Transaction ID not found', null, false, 400);
                    
                    const timeStamp = Date.now();
                    var date = new Date(timeStamp).toLocaleDateString("en-US").split('/')
                    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                    const formatDate = `${date[1]}/${months[date[0] - 1]}/${date[2]}`

                    const sql4 = `INSERT INTO transaction(amount, date_time, notes, sender_id, recipient_id, type_transaction_id) VALUES('${req.body.amount}', '${timeStamp}', '${req.body.notes}', '${req.body.sender_id}', '${req.body.recipient_id}', '${req.body.type_transaction_id}') RETURNING *`
                    transactionModel.getDataQuery(sql4, (result4, msg4='') => {
                        if(!result4) return response(res, msg4, null, false, 400);
                        result4.rows[0].date_time = formatDate
                        return response(res, "Successfully created transaction data", result4, false)
                    })
                })
            })
        })
    }else{
        return response(res, validationResult(req).errors[0].msg, null, false, 400)
    }
}

exports.patchTransaction = (req, res) => {
    const {id} = req.params
    const sql5 = `SELECT * FROM users WHERE id='${id}'`
    transactionModel.getDataQuery(sql5, (result5, msg5='') => {
        if(!result5) return response(res, msg5, null, false, 400);

        if(validationResult(req).errors.length == 0){
            const sql = `SELECT * FROM users WHERE id='${req.body.sender_id}'`
            transactionModel.getDataQuery(sql, (result, _msg='') => {
                if(!result) return response(res, 'Sender ID not found', null, false, 400);
                if(req.body.sender_id == req.body.recipient_id) return response(res, 'Cannot make transactions with the same id', null, false, 400);
        
                const sql2 = `SELECT * FROM users WHERE id='${req.body.recipient_id}'`
                transactionModel.getDataQuery(sql2, (result2, _msg2='') => {
                    if(!result2) return response(res, 'Recipient ID not found', null, false, 400);
        
                    const sql3 = `SELECT * FROM transaction_type WHERE id='${req.body.type_transaction_id}'`
                    transactionModel.getDataQuery(sql3, (result3, _msg3='') => {
                        if(!result3) return response(res, 'Type Transaction ID not found', null, false, 400);
                        
                        const timeStamp = Date.now();
                        var date = new Date(timeStamp).toLocaleDateString("en-US").split('/')
                        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                        const formatDate = `${date[1]}/${months[date[0] - 1]}/${date[2]}`
                        
                        const sql4 = `UPDATE transaction SET amount='${req.body.amount}', date_time='${timeStamp}', notes='${req.body.notes}', sender_id='${req.body.sender_id}', recipient_id='${req.body.recipient_id}', type_transaction_id='${req.body.type_transaction_id}' WHERE id=${id} RETURNING *`
                        transactionModel.getDataQuery(sql4, (result4, msg4='') => {
                            if(!result4) return response(res, msg4, null, false, 400);
                            result4.rows[0].date_time = formatDate
                            return response(res, "Successfully update transaction data", result4, false)
                        })
                    })
                })
            })
        }else{
            return response(res, validationResult(req).errors[0].msg, null, false, 400)
        }
    })
}

exports.deleteTransaction = (req, res) => {
    const {id} = req.params
    const sql = `DELETE FROM transaction WHERE id=${id} RETURNING *`
    transactionModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, "Successfully delete transaction data", result, false)
    })
}

exports.detailTransaction = (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM transaction WHERE id=${id}`
    transactionModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, `Detail transaction data`, result, false)
    })
}