import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
const app = express()
import path from 'path'

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// DIRETORIO PARA SERVIR MINHAS IMAGENS
app.use('/uploads', express.static(path.join(__dirname, "..", "uploads")))
// ROUTES
app.use(routes)



app.listen(3004)