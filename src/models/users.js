const db = require('../helpers/db')

exports.getDataQuery = async (sql, cb) =>{
    try{
        const result = await db.query(sql)
        if(result.rowCount){
            cb(true, result)
        }else{
            cb(false, 'Data tidak ditemukan')
        }
    }catch(err){
        console.log(err);
        cb(false, err.message)
    }
}