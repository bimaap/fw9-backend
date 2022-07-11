const response = require('../helpers/standardResponse')
const notificationModel = require('../models/notification')
const { validationResult } = require('express-validator');

exports.getAllNotification = (req, res) => {
    notificationModel.getDataQuery(`SELECT * FROM notification`, (result, msg='') => {
        
        if(!result) return response(res, msg, result, false, 400);
        const key   = req.query.search  || ''
        const limit = req.query.limit   || result.rowCount
        const page  = req.query.page    || 1
        const sort  = req.query.sort    || 'ASC'

        const sql = `SELECT * FROM notification WHERE notes LIKE \'%${key}%\' ORDER BY id ${sort} LIMIT ${limit} OFFSET ${page==1?0:(page-1)*limit}`
        notificationModel.getDataQuery(sql, (result2, msg='') => {
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

exports.postNotification = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `SELECT * FROM transaction_type WHERE id='${req.body.type_transaction_id}'`
        notificationModel.getDataQuery(sql, (result, msg='') => {
            if(!result) return response(res, 'Transaction Type ID not found', null, false, 400);
            const sql2 = `INSERT INTO notification(amount, notes, type_transaction_id) VALUES('${req.body.amount}', '${req.body.notes}', '${req.body.type_transaction_id}') RETURNING *`
            notificationModel.getDataQuery(sql2, (result2, msg2='') => {
                if(!result2) return response(res, msg2, null, false, 400);
                
                return response(res, "Successfully created notification", result2, false)
            })
        })
    }else{
        return response(res, validationResult(req).errors[0].msg, null, false, 400)
    }
}

exports.patchNotification = (req, res) => {
    const {id} = req.params
    if(validationResult(req).errors.length == 0){
        const sql = `SELECT * FROM transaction_type WHERE id='${req.body.type_transaction_id}'`
        notificationModel.getDataQuery(sql, (result, msg='') => {
            if(!result) return response(res, 'Transaction Type ID not found', null, false, 400);
            const sql2 = `UPDATE notification SET amount='${req.body.amount}',  notes='${req.body.notes}' WHERE id=${id} RETURNING *`
            notificationModel.getDataQuery(sql2, (result2, msg2='') => {
                if(!result2) return response(res, msg2, null, false, 400);
                
                return response(res, "Successfully update notification", result2, false)
            })
        })
    }else{
        return response(res, validationResult(req).errors[0].msg, null, false, 400)
    }
}

exports.deleteNotification = (req, res) => {
    const {id} = req.params
    const sql = `DELETE FROM notification WHERE id=${id} RETURNING *`
    notificationModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, "Successfully delete notification", result, false)
    })
}

exports.detailNotification = (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM notification WHERE id=${id}`
    notificationModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, `Detail notification`, result, false)
    })
}