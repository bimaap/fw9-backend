// const response = require('../helpers/standard')
const notificationModel = require('../models/notification')
const { validationResult } = require('express-validator');

exports.getAllNotification = (req, res) => {
    const sql = `SELECT * FROM notification`
    notificationModel.getDataQuery(sql, (result, value) => {
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

exports.postNotification = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `INSERT INTO notification(amount, notes, type_transaction_id) VALUES('${req.body.amount}', '${req.body.notes}', '${req.body.type_transaction_id}') RETURNING *`
        notificationModel.getDataQuery(sql, (result, value) => {
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

exports.patchNotification = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `UPDATE notification SET amount='${req.body.amount}',  notes='${req.body.notes}' WHERE id=${req.body.id} RETURNING *`
        notificationModel.getDataQuery(sql, (result, value) => {
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

exports.deleteNotification = (req, res) => {
    const sql = `DELETE FROM notification WHERE id=${req.query.id} RETURNING *`
    notificationModel.getDataQuery(sql, (result, value) => {
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

exports.detailNotification = (req, res) => {
    const sql = `SELECT * FROM notification WHERE id=${req.query.id}`
    notificationModel.getDataQuery(sql, (result, value) => {
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