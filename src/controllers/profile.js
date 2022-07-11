const response = require('../helpers/standardResponse')
const profileModel = require('../models/profile')
const { validationResult } = require('express-validator');

exports.getAllProfile = (req, res) => {
    profileModel.getDataQuery(`SELECT * FROM profile`, (result, msg='') => {
        
        if(!result) return response(res, msg, result, false, 400);
        const key   = req.query.search  || ''
        const limit = req.query.limit   || result.rowCount
        const page  = req.query.page    || 1
        const sort  = req.query.sort    || 'ASC'

        const sql = `SELECT * FROM profile WHERE full_name LIKE \'%${key}%\' ORDER BY id ${sort} LIMIT ${limit} OFFSET ${page==1?0:(page-1)*limit}`
        profileModel.getDataQuery(sql, (result2, msg='') => {
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

const upload = require('../middleware/upload')

exports.postProfile = (req, res) => {
    upload(req, res, (err) => {
        if(!req.file) return response(res, err? err.message:'File cant empty', null, false, 400);

        const sql = `SELECT * FROM users WHERE id='${req.body.user_id}'`
        profileModel.getDataQuery(sql, (result, msg='') => {
            if(!result) return response(res, 'User ID not registered', null, false, 400);
            if(req.body.full_name.length == 0) response(res, 'Full Name cannot Empty', null, false, 400);
            if(req.body.phone_number.length == 0) response(res, 'Phone Number cannot Empty', null, false, 400);
            if(req.body.balance.length == 0) response(res, 'Balance cannot Empty', null, false, 400);

            const sql3 = `SELECT * FROM profile WHERE user_id='${req.body.user_id}'`
            profileModel.getDataQuery(sql3, (result3, msg3='') => {
                if(result3) return response(res, 'User profile already exists', null, false, 400);
                
                const sql2 = `INSERT INTO profile(full_name, phone_number, balance, picture, user_id) VALUES('${req.body.full_name}', '${req.body.phone_number}', '${req.body.balance}', '${req.file.filename}', '${req.body.user_id}') RETURNING *`
                profileModel.getDataQuery(sql2, (result2, msg2='') => {
                    if(!result2) return response(res, msg2, null, false, 400);
                    return response(res, "Successfully created profile data", result2, false)
                })
            })
        })
    })
}

exports.patchProfile = (req, res) => {
    upload(req, res, (err) => {
        if(!req.file) return response(res, err? err.message:'File cant empty', null, false, 400);
        if(req.body.full_name.length == 0) response(res, 'Full Name cannot Empty', null, false, 400);
        if(req.body.phone_number.length == 0) response(res, 'Phone Number cannot Empty', null, false, 400);
        if(req.body.balance.length == 0) response(res, 'Balance cannot Empty', null, false, 400);

        const {id} = req.params
        const sql2 = `UPDATE profile SET full_name='${req.body.full_name}', phone_number='${req.body.phone_number}', balance='${req.body.balance}', picture='${req.file.filename}' WHERE id=${id} RETURNING *`
        profileModel.getDataQuery(sql2, (result2, msg2='') => {
            if(!result2) return response(res, msg2, null, false, 400);
            return response(res, "Successfully update profile data", result2, false)
        })
    })
}

exports.deleteProfile = (req, res) => {
    const {id} = req.params
    const sql = `DELETE FROM profile WHERE id=${id} RETURNING *`
    profileModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, "Successfully delete profile data", result, false)
    })
}

exports.detailProfile = (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM profile WHERE id=${id}`
    profileModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, `Detail profile data: ${result.rows[0].full_name}`, result, false)
    })
}