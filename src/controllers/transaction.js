// const response = require('../helpers/standard')

const transactionModel = require('../models/transaction')
const { validationResult } = require('express-validator');

exports.getAllTransaction = (req, res) => {
    const sql = `SELECT * FROM transaction`
    transactionModel.getDataQuery(sql, (result, value) => {
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

exports.postTransaction = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `INSERT INTO transaction(amount, date_time, notes, recipient_id, sender_id, type_transaction_id) VALUES('${req.body.amount}', TO_TIMESTAMP('${req.body.date_time}', 'YYYY-MM-DD HH:MI:SS'), '${req.body.notes}', '${req.body.recipient_id}', '${req.body.sender_id}', '${req.body.type_transaction_id}') RETURNING *`
        transactionModel.getDataQuery(sql, (result, value) => {
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

exports.patchTransaction = (req, res) => {
    // const sql = `UPDATE transaction SET amount='${req.body.amount}' WHERE id=${req.body.id} RETURNING *`
    // transactionModel.getDataQuery(sql, (result, value) => {
    //     if(!result){
    //         return res.json({
    //             success: result,
    //             result: value
    //         })
    //     }
    //     return res.json({
    //         success: result,
    //         message: "Data berhasil di update",
    //         result: value[0]
    //     })
    // })
    if(validationResult(req).errors.length == 0){
        const sql = `UPDATE transaction SET amount='${req.body.amount}', date_time=TO_TIMESTAMP('${req.body.date_time}', 'YYYY-MM-DD HH:MI:SS'), notes='${req.body.notes}' WHERE id=${req.body.id} RETURNING *`
        transactionModel.getDataQuery(sql, (result, value) => {
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

exports.deleteTransaction = (req, res) => {
    const sql = `DELETE FROM transaction WHERE id=${req.query.id} RETURNING *`
    transactionModel.getDataQuery(sql, (result, value) => {
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

exports.detailTransaction = (req, res) => {
    const sql = `SELECT * FROM transaction WHERE id=${req.query.id}`
    transactionModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            message: `Detail data ${value[0].id}`,
            result: value[0]
        })
    })
}