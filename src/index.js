const { Router } = require('express')
const  express = require('express')
const { findByIdAndDelete } = require('./models/task')
const Task = require('./models/task')
require('./db/mongoose')
const User =  require('./models/user')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT

const multer = require('multer')

const upload = multer({
    dest: 'images',
    limits: {
        fileSize : 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match('\.(doc|docx)$')) {
            return cb(new Error('please upload a document file!'))
        }
        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload') , (req, res) => {

    res.send()
})




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is setup on port '+ port)
})
