const response = require('../helpers/standardResponse')
const userModel = require('../models/users')
const { validationResult } = require('express-validator');

exports.getUsers = (req, res) => {
    userModel.getDataQuery(`SELECT * FROM users`, (result, msg='') => {
        
        if(!result) return response(res, msg, result, false, 400);
        const key   = req.query.search  || ''
        const limit = req.query.limit   || result.rowCount
        const page  = req.query.page    || 1
        const sort  = req.query.sort    || 'ASC'

        const sql = `SELECT * FROM users WHERE email LIKE \'%${key}%\' ORDER BY id ${sort} LIMIT ${limit} OFFSET ${page==1?0:(page-1)*limit}`
        userModel.getDataQuery(sql, (result2, msg='') => {
            if(!result2) return response(res, msg, result2, false, 400);

            const pageInfo = {}
            pageInfo.totalData = key? result2.rowCount:result.rowCount
            pageInfo.totalPage = key? Math.ceil(result2.rowCount/limit):Math.ceil(result.rowCount/limit)
            pageInfo.currentPage = Number(page)
            pageInfo.nextPage = Number(page) < pageInfo.totalPage? Number(page) + 1 : null
            pageInfo.prevPage = Number(page) > 1? Number(page) - 1 : null

            return response(res, 'Successfully get users data', result2, {pageInfo})
        })
    })
}

exports.postUser = (req, res) => {
    const sql = `SELECT * FROM users WHERE username='${req.body.username}' OR email='${req.body.email}'`
    userModel.getDataQuery(sql, (result, msg='') => {
        if(result) return response(res, req.body.username == result.rows[0].username? 'Username already used':'Email already used', null, false, 400);
        if(!result){
            if(msg.includes('Data not found')){
                const sql2 = `INSERT INTO users(username, email, password, pin) VALUES('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.pin}') RETURNING *`
                userModel.getDataQuery(sql2, (result2, msg2='') => {
                    if(!result2) return response(res, msg2, null, false, 400);
                    
                    if(validationResult(req).errors.length == 0){
                        return response(res, "Successfully created user data", result2, false)
                    }else{
                        return response(res, validationResult(req).errors[0].msg2, null, false, 400)
                    }
                })
            }else{
                return response(res, msg, null, false, 400);
            }
        }
    })
}

exports.patchUser = (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM users WHERE id=${id}`
    userModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);

        const sql2 = `SELECT * FROM users WHERE username='${req.body.username}' OR email='${req.body.email}'`
        userModel.getDataQuery(sql2, (result2, msg2='') => {
            if(result2) return response(res, req.body.username == result2.rows[0].username? 'Username already used':'Email already used', null, false, 400);

            if(!result2){
                if(msg2.includes('Data not found')){
                    if(validationResult(req).errors.length == 0){
                        const sql3 = `UPDATE users SET username='${req.body.username}', email='${req.body.email}', password='${req.body.password}', pin='${req.body.pin}' WHERE id=${id} RETURNING *`
                        userModel.getDataQuery(sql3, (result3, msg3='') => {
                            if(!result3) return response(res, msg3, null, false, 400);
                            return response(res, "Successfully update user data", result3, false)
                        })
                    }else{
                        return response(res, validationResult(req).errors[0].msg3, null, false, 400)
                    }
                }else{
                    return response(res, msg2, null, false, 400);
                }
            }
        })
    })
}

exports.deleteUser = (req, res) => {
    const {id} = req.params
    const sql = `DELETE FROM users WHERE id=${id} RETURNING *`
    userModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, "Successfully delete user data", result, false)
    })
}

exports.detailUser = (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM users WHERE id=${id}`
    userModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, msg, null, false, 400);
        return response(res, `Detail user data: ${result.rows[0].username}`, result, false)
    })
}