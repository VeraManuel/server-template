import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import config from './config'
import router from './routes'

const app = express()
const port = config.PORT

app.use(helmet({ contentSecurityPolicy: true }))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api', router)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})