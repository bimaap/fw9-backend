const db = require('../helpers/db')

exports.getDataQuery = async (sql, cb) =>{
    try{
        const result = await db.query(sql)
        if(result.rowCount){
            cb(result)
        }else{
            cb(false, 'Data not found')
        }
    }catch(err){
        cb(false, err.message)
    }
}