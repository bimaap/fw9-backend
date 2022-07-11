const response = require('../helpers/standardResponse')
const authenticationModel = require('../models/authentication')
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const {email, password} = req.body
    const sql = `SELECT * FROM users WHERE email='${email}'`
    
    authenticationModel.getDataQuery(sql, async (result, msg='') => {
        if(!result) return response(res, 'Email is not registered', null, false, 400);
        console.log(result);
        const user = result.rows[0]
        try{
            const checkPassword = await bcrypt.compare(password, user.password)
            if(checkPassword){
                const token = jwt.sign({id: user.id}, process.env.APP_SECRET || 'secretKey')
                const rows = [{token}]
                return response(res, 'Login Successfully', {rows});
            }else{
                return response(res, 'Password not correct', null, false, 400);
            }
        }catch(err){
            return response(res, err.message, null, false, 400);
        }
    })
}

exports.register = (req, res) => {
    const sql = `SELECT * FROM users WHERE username='${req.body.username}' OR email='${req.body.email}'`

    authenticationModel.getDataQuery(sql, (result, msg='') => {
        if(result) return response(res, req.body.username == result.rows[0].username? 'Username already used':'Email already used', null, false, 400);
        if(validationResult(req).errors.length == 0){
            const sql2 = `INSERT INTO users(username, email, password) VALUES('${req.body.username}', '${req.body.email}', '${req.body.password}') RETURNING *`
            authenticationModel.getDataQuery(sql2, (result2, msg2='') => {
                if(!result2) return response(res, msg2, null, false, 400);
                
                return response(res, "Successfully created user data", result2, false)
            })
        }else{
            return response(res, validationResult(req).errors[0].msg, null, false, 400)
        }
    })
}

exports.setPin = (req, res) => {
    const {id} = req.params
    const sql = `SELECT pin FROM users WHERE id='${id}'`
    authenticationModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, 'User not found', null, false, 400);
        if(result.rows[0].pin) return response(res, 'User pin already exists', null, false, 400);

        if(validationResult(req).errors.length == 0){
            const sql2 = `UPDATE users SET pin='${req.body.pin}' WHERE id=${id} RETURNING *`
            authenticationModel.getDataQuery(sql2, (result2, msg2='') => {
                if(!result2) return response(res, msg2, null, false, 400);
                
                return response(res, "Successfully set pin", result2, false)
            })
        }else{
            return response(res, validationResult(req).errors[0].msg, null, false, 400)
        }
    })
}

exports.forgotPassword = (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM users WHERE id='${id}'`
    authenticationModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, 'User not found', null, false, 400);

        if(validationResult(req).errors.length == 0){
            const sql2 = `UPDATE users SET password='${req.body.password}' WHERE id=${id} RETURNING *`
            authenticationModel.getDataQuery(sql2, (result2, msg2='') => {
                if(!result2) return response(res, msg2, null, false, 400);
                
                return response(res, "Successfully change password user data", result2, false)
            })
        }else{
            return response(res, validationResult(req).errors[0].msg, null, false, 400)
        }
    })
}

exports.profile = (req, res) => {
    const id = req.authResult.id
    const sql = `SELECT * FROM profile WHERE user_id='${id}'`

    authenticationModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, 'Profile not found', null, false, 400);
        
        return response(res, "Successfully get profile data", result, false)
    })
}

exports.historyTransactions = (req, res) => {
    const id = req.authResult.id
    const sql = `SELECT * FROM transaction WHERE sender_id='${id}'`

    authenticationModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, 'Transaction not found', null, false, 400);
        
        return response(res, "Successfully get transaction data", result, false)
    })
}

exports.transfer = (req, res) => {
    const id = req.authResult.id

    const sql = `SELECT * FROM profile WHERE user_id='${id}'`
    authenticationModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, 'Profile Sender not found', null, false, 400);
        if(id == req.body.profile_id) return response(res, 'Cannot make transactions with the same id', null, false, 400);
        
        const sql2 = `SELECT * FROM profile WHERE user_id='${req.body.profile_id}'`
        authenticationModel.getDataQuery(sql2, (result2, msg2='') => {
            if(!result2) return response(res, 'Profile Recipient not found', null, false, 400);

            if(validationResult(req).errors.length == 0){
                if(Number(result.rows[0].balance) < Number(req.body.amount)) return response(res, 'Transfer failed, not enough money', null, false, 400);
                
                const balanceLess = Number(result.rows[0].balance) - Number(req.body.amount)
                const sql3 = `UPDATE profile SET balance='${balanceLess}' WHERE user_id=${id} RETURNING *`

                authenticationModel.getDataQuery(sql3, (result3, msg3='') => {
                    const balanceMined = Number(result2.rows[0].balance) + Number(req.body.amount)
                    const sql4 = `UPDATE profile SET balance='${balanceMined}' WHERE user_id=${req.body.profile_id} RETURNING *`

                    authenticationModel.getDataQuery(sql4, (result4, msg4='') => {
                        const rows = [{sender:result3.rows[0], recipient:result4.rows[0]}]
                        return response(res, "Successful transfer", {rows})
                    })
                })
            }else{
                return response(res, validationResult(req).errors[0].msg, null, false, 400)
            }
            
        })
    })
}

exports.phone = (req, res) => {
    const id = req.authResult.id
    const sql = `UPDATE profile SET phone_number='${req.body.phone_number}' WHERE user_id=${id} RETURNING *`
    if(validationResult(req).errors.length == 0){
        authenticationModel.getDataQuery(sql, (result, msg='') => {
            if(!result) return response(res, 'Profile not found', null, false, 400);
            
            return response(res, "Successfully change phone number data", result, false)
        })
    }else{
        return response(res, validationResult(req).errors[0].msg, null, false, 400)
    }
}

exports.changePin = (req, res) => {
    const id = req.authResult.id
    const sql = `SELECT pin FROM users WHERE id='${id}'`
    authenticationModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, 'User not found', null, false, 400);

        if(validationResult(req).errors.length == 0){
            const sql2 = `UPDATE users SET pin='${req.body.pin}' WHERE id=${id} RETURNING *`
            authenticationModel.getDataQuery(sql2, (result2, msg2='') => {
                if(!result2) return response(res, msg2, null, false, 400);
                
                return response(res, "Successfully change pin", result2, false)
            })
        }else{
            return response(res, validationResult(req).errors[0].msg, null, false, 400)
        }
    })
}

exports.changePassword = (req, res) => {
    const id = req.authResult.id
    const sql = `SELECT * FROM users WHERE id='${id}'`
    authenticationModel.getDataQuery(sql, (result, msg='') => {
        if(!result) return response(res, 'User not found', null, false, 400);

        if(validationResult(req).errors.length == 0){
            const sql2 = `UPDATE users SET password='${req.body.password}' WHERE id=${id} RETURNING *`
            authenticationModel.getDataQuery(sql2, (result2, msg2='') => {
                if(!result2) return response(res, msg2, null, false, 400);
                
                return response(res, "Successfully change password user data", result2, false)
            })
        }else{
            return response(res, validationResult(req).errors[0].msg, null, false, 400)
        }
    })
}