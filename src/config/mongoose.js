import { connect, connection } from "mongoose"
import { MONGOURL } from '../config'

(async () => {
    const db = await connect(MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true

    })
    console.log('database connected to:', db.connection.name)
})();

connection.on('connected', () => {
    console.log('Mongodb is connected')
})
connection.on('error', () => {
    console.log(error)
})
connection.on('disconnected', () => {
    console.log('Mongodb is disconnected')
})

process.on('SIGINT', async () => {
    await connection.close()
    process.exit(0)

})