const response = require('../helpers/standardResponse')
const transactionTypeModel = require('../models/transactionType')
const { validationResult } = require('express-validator');

exports.getAllTransactionType = (req, res) => {
    transactionTypeModel.getDataQuery(`SELECT * FROM transaction_type`, (result, msg='') => {
        
        if(!result) return response(res, msg, result, false, 400);
        const key   = req.query.search  || ''
        const limit = req.query.limit   || result.rowCount
        const page  = req.query.page    || 1
        const sort  = req.query.sort    || 'ASC'

        const sql = `SELECT * FROM transaction_type WHERE name LIKE \'%${key}%\' ORDER BY id ${sort} LIMIT ${limit} OFFSET ${page==1?0:(page-1)*limit}`
        transactionTypeModel.getDataQuery(sql, (result2, msg='') => {
            if(!result2) return response(res, msg, result2, false, 400);

            const pageInfo = {}
            pageInfo.totalData = key? result2.rowCount:result.rowCount
            pageInfo.totalPage = key? Math.ceil(result2.rowCount/limit):Math.ceil(result.rowCount/limit)
            pageInfo.currentPage = Number(page)
            pageInfo.nextPage = Number(page) < pageInfo.totalPage? Number(page) + 1 : null
            pageInfo.prevPage = Number(page) > 1? Number(page) - 1 : null

            return response(res, 'Successfully get profile data', result2, {pageInfo})
        })
    })
}

exports.postTransactionType = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `INSERT INTO transaction_type(name, description) VALUES('${req.body.name}', '${req.body.description}') RETURNING *`
        transactionTypeModel.getDataQuery(sql, (result, msg='') => {
            if(!result) return response(res, msg, null, false, 400);
            
            return response(res, "Successfully created transaction type", result, false)
        })
    }else{
        return response(res, validationResult(req).errors[0].msg, null, false, 400)
    }
}

exports.patchTransactionType = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const {id} = req.params
        const sql = `UPDATE transaction_type SET name='${req.body.name}', description='${req.body.description}' WHERE id=${id} RETURNING *`
        transactionTypeModel.getDataQuery(sql, (result, msg='') => {
            if(!result) return response(res, msg, null, false, 400);
            
            return response(res, "Successfully update transaction type", result, false)
        })
    }else{
        return response(res, validationResult(req).errors[0].msg, null, false, 400)
    }
}

exports.deleteTransactionType = (req, res) => {
    const {id} = req.params
    const sql = `DELETE FROM transaction_type WHERE id=${id} RETURNING *`
    transactionTypeModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, "Successfully delete transaction type", result, false)
    })
}

exports.detailTransactionType = (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM transaction_type WHERE id=${id}`
    transactionTypeModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, `Detail transaction type`, result, false)
    })
}