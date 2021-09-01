import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import auth from './libs/initialSetup'
import { PORT } from "./config";
import './config/mongoose'
const router = require('./routes')
const app = express()

//setting
auth.createRoles()

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/api', router)


app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        message: err.message,
        status: err.status || 500
    })
})

app.listen(PORT)


module.exports = app