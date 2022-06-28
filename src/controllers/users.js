// const response = require('../helpers/standard')

const userModel = require('../models/users')

exports.getAllUsers = (req, res) => {
    let sql = `SELECT * FROM users`
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
    let sql = `INSERT INTO users(username, email, password, pin) VALUES('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.pin}')`
    userModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            result: "Data berhasil dibuat"
        })
    })
}

exports.postUserByIdParams = (req, res) => {
    let sql = `INSERT INTO users(username, email, password, pin) VALUES('${req.query.username}', '${req.query.email}', '${req.query.password}', '${req.query.pin}')`
    userModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            result: "Data berhasil dibuat"
        })
    })
}

exports.patchUserById = (req, res) => {
    let sql = `UPDATE users SET username='${req.body.username}' WHERE id=${req.body.id}`
    userModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            result: "Data berhasil di update"
        })
    })
}

exports.putUserById = (req, res) => {
    let sql = `UPDATE users SET username='${req.body.username}' WHERE id=${req.body.id}`
    userModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            result: "Data berhasil di update (put)"
        })
    })
}

exports.deleteUserById = (req, res) => {
    let sql = `DELETE FROM users WHERE id=${req.query.id}`
    userModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            result: "Data berhasil di delete"
        })
    })
}