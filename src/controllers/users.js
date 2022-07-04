// const response = require('../helpers/standard')
const userModel = require('../models/users')
const { validationResult } = require('express-validator');

exports.getAllUsers = (req, res) => {
    const [key=''] = req.query.key
    const [limit=3, page=1] = [req.query.limit, req.query.page]
    const sql = `SELECT * FROM users WHERE email LIKE \'%${key}%\' ORDER BY id LIMIT ${limit} OFFSET ${page==1?0:(page-1)*limit}`

    userModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                message: value
            })
        }

        userModel.getDataQuery(`SELECT * FROM users`, (result2, value2) => {
            if(!result2){
                return res.json({
                    success: result2,
                    result: value2
                })
            }

            const pageInfo = {}
            pageInfo.totalData = value2.rowCount
            pageInfo.totalPage = Math.ceil(value2.rowCount/limit)
            pageInfo.currentPage = Number(page)
            pageInfo.nextPage = Number(page) < pageInfo.totalPage? Number(page) + 1 : null
            pageInfo.prevPage = Number(page) > 1? Number(page) - 1 : null
    
            return res.json({
                success: result2,
                pageInfo,
                value: value.rows
            })
        })
    })
}

exports.postUserByIdBody = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `INSERT INTO users(username, email, password, pin) VALUES('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.pin}') RETURNING *`
        userModel.getDataQuery(sql, (result, value) => {
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

exports.postUserByIdParams = (req, res) => {
    const sql = `INSERT INTO users(username, email, password, pin) VALUES('${req.query.username}', '${req.query.email}', '${req.query.password}', '${req.query.pin}') RETURNING *`
    userModel.getDataQuery(sql, (result, value) => {
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

exports.patchUserById = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `UPDATE users SET username='${req.body.username}', email='${req.body.email}', password='${req.body.password}', pin='${req.body.pin}' WHERE id=${req.body.id} RETURNING *`
        userModel.getDataQuery(sql, (result, value) => {
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

exports.putUserById = (req, res) => {
    const sql = `UPDATE users SET username='${req.body.username}' WHERE id=${req.body.id} RETURNING *`
    userModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            message: "Data berhasil di update (put)",
            result: value[0]
        })
    })
}

exports.deleteUserById = (req, res) => {
    const sql = `DELETE FROM users WHERE id=${req.query.id} RETURNING *`
    userModel.getDataQuery(sql, (result, value) => {
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

exports.detailUsers = (req, res) => {
    const sql = `SELECT * FROM users WHERE id=${req.query.id}`
    userModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            message: `Detail data ${value[0].username}`,
            result: value[0]
        })
    })
}