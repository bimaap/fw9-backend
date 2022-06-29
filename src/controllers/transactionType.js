// const response = require('../helpers/standard')

const transactionTypeModel = require('../models/transactionType')

exports.getAllTransactionType = (req, res) => {
    const sql = `SELECT * FROM transaction_type`
    transactionTypeModel.getDataQuery(sql, (result, value) => {
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

exports.postTransactionType = (req, res) => {
    const sql = `INSERT INTO transaction_type(name, description) VALUES('${req.body.name}', '${req.body.description}') RETURNING *`
    transactionTypeModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
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

exports.patchTransactionType = (req, res) => {
    console.log(req.body.amount);
    const sql = `UPDATE transaction_type SET name='${req.body.name}' WHERE id=${req.body.id} RETURNING *`
    transactionTypeModel.getDataQuery(sql, (result, value) => {
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

exports.deleteTransactionType = (req, res) => {
    const sql = `DELETE FROM transaction_type WHERE id=${req.query.id} RETURNING *`
    transactionTypeModel.getDataQuery(sql, (result, value) => {
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

exports.detailTransactionType = (req, res) => {
    const sql = `SELECT * FROM transaction_type WHERE id=${req.query.id}`
    transactionTypeModel.getDataQuery(sql, (result, value) => {
        if(!result){
            return res.json({
                success: result,
                result: value
            })
        }
        return res.json({
            success: result,
            message: `Detail data ${value[0].name}`,
            result: value[0]
        })
    })
}