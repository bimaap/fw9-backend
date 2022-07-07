
const response = (res, msg, results, newResult=false, status = 200) => {
    let success = true

    if(status >= 400){
        success = false
    }

    const data = {
        success,
        message: msg
    }

    if(newResult){
        Object.assign(data, newResult);
    }

    if(results){
        results.rowCount > 1? data.result = results.rows:data.result = results.rows[0]
    }


    return res.status(status).json(data)
}
module.exports = response