const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

//setting
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())


if(process.env.PORT !== 'test'){
    app.listen(app.get('port'), () => {
        console.log(`server funcionando en el puerto ${app.get('port')}`)
    })
}

module.exports = app