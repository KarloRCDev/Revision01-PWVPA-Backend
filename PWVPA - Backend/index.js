//Importar archivo .ENV de configuración
require('dotenv').config()

//Importar rutas a utilizar
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const productsRoute = require('./routes/productsRoute')

//Configuración de Express y CORS
const cors = require('cors')
const express = require('express')
const app = express()
app.disable("x-powered-by")
const corsOptions = {
    origin: process.env.CORS_URL
}

//Conexión a la base de datos
const connectDatabase = require('./mongoDriver.js')
connectDatabase().catch(() => {
    process.exit()
})

//Middlewares
app.use(express.json())
app.use(cors(corsOptions))
console.log('[LOG] Habilitando CORS para ', process.env.CORS_URL)

//Rutas definidas
app.use('/loginAPI', loginRoute)
app.use('/registerAPI', registerRoute)
app.use('/productsAPI', productsRoute)

//Iniciando servidor
app.listen(process.env.PORT, () => {
    console.log('[LOG] Servidor iniciado en el puerto ' + process.env.PORT)
})

module.exports = app