// const response = require('../helpers/standard')

const notificationModel = require('../models/notification')

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
}

exports.patchNotification = (req, res) => {
    const sql = `UPDATE notification SET amount='${req.body.amount}' WHERE id=${req.body.id} RETURNING *`
    notificationModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            message: "Data berhasil di update",
            result: value[0]
        })
    })
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