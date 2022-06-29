// const response = require('../helpers/standard')

const userModel = require('../models/users')

exports.getAllUsers = (req, res) => {
    const sql = `SELECT * FROM users `
    userModel.getDataQuery(sql, (result, value) => {
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

exports.postUserByIdBody = (req, res) => {
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
            message: "Data berhasil di update",
            result: value[0]
        })
    })
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