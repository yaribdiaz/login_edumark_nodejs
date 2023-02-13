import express from "express"
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import perfilRoutes from './routes/perfilRoutes.js'
import db from './config/db.js'

//Crear la app
const app = express()


//Habilitar lectura de datos de formularios, habilita los request
app.use( express.urlencoded({extended: true}) )


//Habilitar Cookie Parser
app.use (cookieParser() )

//Habilitar CSRF
app.use( csrf({cookie:true}) )


//Conexión a base de datos
try{
    await db.authenticate()
    db.sync()

    console.log('conexión exitosa a BD')
}catch (error){
    console.log(error)
}

//app.use(express.static('public'));
app.use('/CSS', express.static('CSS'))
app.use('/public', express.static('public'))
app.use('/JS', express.static('JS'))



//habilitar pug
app.set('view engine','pug')
app.set('views', './views')





//Routing para el home
app.use('/auth', usuarioRoutes)
app.use('/', perfilRoutes)


//Definir puerto y arrancar el proyecto
const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log('Funcionando bien en puerto 3000')
})