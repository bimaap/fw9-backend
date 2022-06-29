const db = require('../helpers/db')

exports.getDataQuery = async (sql, cb) =>{
    try{
        const result = await db.query(sql)
        if(result.rowCount){
            cb(true, result.rows)
        }else{
            cb(false, 'Data tidak ditemukan')
        }
    }catch(err){
        cb(false, err.message)
    }
}