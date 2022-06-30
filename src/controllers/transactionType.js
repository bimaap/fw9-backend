// const response = require('../helpers/standard')

const transactionTypeModel = require('../models/transactionType')
const { validationResult } = require('express-validator');

exports.getAllTransactionType = (req, res) => {
    const sql = `SELECT * FROM transaction_type`
    transactionTypeModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            value
        })
    })
}

exports.postTransactionType = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `INSERT INTO transaction_type(name, description) VALUES('${req.body.name}', '${req.body.description}') RETURNING *`
        transactionTypeModel.getDataQuery(sql, (result, value) => {
            if(!result){
                return res.json({
                    success: result,
                    result: value
                })
            }
            return res.json({
                success: result,
                message: "Data berhasil dibuat",
                result: value[0]
            })
        })
    }else{
        return res.json({
            success: false,
            message: validationResult(req).errors[0].msg
        }) 
    }
}

exports.patchTransactionType = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `UPDATE transaction_type SET name='${req.body.name}', description='${req.body.description}' WHERE id=${req.body.id} RETURNING *`
        transactionTypeModel.getDataQuery(sql, (result, value) => {
            if(!result){
                return res.json({
                    success: result,
                    result: value
                })
            }
            return res.json({
                success: result,
                message: "Data berhasil dibuat",
                result: value[0]
            })
        })
    }else{
        return res.json({
            success: false,
            message: validationResult(req).errors[0].msg
        }) 
    }
}

exports.deleteTransactionType = (req, res) => {
    const sql = `DELETE FROM transaction_type WHERE id=${req.query.id} RETURNING *`
    transactionTypeModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            message: "Data berhasil di delete",
            result: value[0]
        })
    })
}

exports.detailTransactionType = (req, res) => {
    const sql = `SELECT * FROM transaction_type WHERE id=${req.query.id}`
    transactionTypeModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            message: `Detail data ${value[0].name}`,
            result: value[0]
        })
    })
}