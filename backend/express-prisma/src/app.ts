import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from "morgan";

import api from './api'

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(helmet())

app.get('/', (req, res) => {
    res.json({
        message: 'pos inventario con prisma y express 😀'
    })
})
app.use('/api/v1', api)

const port = process.env.PORT || 5050;

//const enviroment = process.env.NODE_ENV || 'development';

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port} and enviroment is ${process.env.NODE_ENV}`);
})