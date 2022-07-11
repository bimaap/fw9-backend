const path = require('path')
const multer = require('multer')
const response = require('../helpers/standardResponse')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(global.__basepath, 'assets', 'uploads'))
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime()
        const ext = file.mimetype.split('/')[1]
        cb(null, `${timestamp}.${ext}`)
    }
})

const type_file = [
    'image/jpeg',
    'image/jpg',
    'image/webp'
]

const upload = multer({
    storage,
    limits: {
        fileSize: Number(process.env.LIMIT_FILE_SIZE) * 1000 * 1000
    },
    fileFilter: (req, file, cb) => {
        if (!type_file.includes(file.mimetype)) {
            return cb(new Error('File is not allowed'))
        }
        cb(null, true)
    }
})

module.exports = upload