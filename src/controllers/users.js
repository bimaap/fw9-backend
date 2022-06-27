// const response = require('../helpers/standard')

let users = [
    {
        id: 0,
        username: 'bima',
        email: 'bima@gmail.com',
        password: 'bima123',
        pin: 123456,
        money: 1301000.5
    },
    {
        id: 1,
        username: 'ayu',
        email: 'ayu@gmail.com',
        password: 'ayu123',
        pin: 654321,
        money: 550200.0
    },
    {
        id: 2,
        username: 'dimas',
        email: 'dimas@gmail.com',
        password: 'dimas123',
        pin: 321456,
        money: 2030200.0
    },
]


exports.getAllUsers = (req, res) => {
    return res.json({
        success: true,
        users
    })
}

exports.postUserByIdBody = (req, res) => {
    if(users[req.body.id]){
        return res.json({
            success: true,
            user: users[req.body.id]
        })
    }else{
        return res.json({
            success: false,
            message: 'Data not found'
        })
    }
}

exports.postUserByIdParams = (req, res) => {
    if(users[req.query.id]){
        return res.json({
            success: true,
            user: users[req.query.id]
        })
    }else{
        return res.json({
            success: false,
            message: 'Data not found'
        })
    }
}

exports.patchUserById = (req, res) => {
    if(users[req.body.id]){
        users[req.body.id].username = req.body.name
        return res.json({
            success: true,
            user: users[req.body.id]
        })
    }else{
        return res.json({
            success: false,
            message: 'Data not found'
        })
    }
}

exports.putUserById = (req, res) => {
    if(users[req.body.id]){
        users[req.body.id].username = req.body.name
        users[req.body.id].email = req.body.email
        users[req.body.id].password = req.body.password
        return res.json({
            success: true,
            user: users[req.body.id]
        })
    }else{
        return res.json({
            success: false,
            message: 'Data not found'
        })
    }
}

exports.deleteUserById = (req, res) => {
    if(users[req.query.id]){
        users.splice (req.query.id, 1);
        return res.json({
            success: true,
            user: users
        })
    }else{
        return res.json({
            success: false,
            message: 'Data not found'
        })
    }
}