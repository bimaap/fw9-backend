// const response = require('../helpers/standard')

const profileModel = require('../models/profile')
const { validationResult } = require('express-validator');

exports.getAllProfile = (req, res) => {
    const sql = `SELECT * FROM profile`
    profileModel.getDataQuery(sql, (result, value) => {
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

exports.postProfile = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `INSERT INTO profile(full_name, phone_number, balance, picture, user_id) VALUES('${req.body.full_name}', '${req.body.phone_number}', '${req.body.balance}', '${req.body.picture}', '${req.body.user_id}') RETURNING *`
        profileModel.getDataQuery(sql, (result, value) => {
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

exports.patchProfile = (req, res) => {
    if(validationResult(req).errors.length == 0){
        const sql = `UPDATE profile SET full_name='${req.body.full_name}', phone_number='${req.body.phone_number}', balance='${req.body.balance}', picture='${req.body.picture}' WHERE id=${req.body.id} RETURNING *`
        profileModel.getDataQuery(sql, (result, value) => {
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

exports.deleteProfile = (req, res) => {
    const sql = `DELETE FROM profile WHERE id=${req.query.id} RETURNING *`
    profileModel.getDataQuery(sql, (result, value) => {
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

exports.detailProfile = (req, res) => {
    const sql = `SELECT * FROM profile WHERE id=${req.query.id}`
    profileModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            message: `Detail data ${value[0].full_name}`,
            result: value[0]
        })
    })
}