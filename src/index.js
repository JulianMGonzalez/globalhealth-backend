import express  from 'express'
import cors from 'cors'
import morgan from 'morgan'
import './database'
import auth from './libs/initialSetup'
const router = require('./routes')
const app = express()

//setting
auth.createRoles()
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

//routes
app.use('/api', router)

if(process.env.PORT !== 'test'){
    app.listen(app.get('port'), () => {
        console.log(`server funcionando en el puerto ${app.get('port')}`)
    })
}

module.exports = app