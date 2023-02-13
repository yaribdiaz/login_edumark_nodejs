import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js'
import { generarJWT, generarId } from '../helpers/tokens.js'
import {emailRegistro, emailOlvidePassword}   from '../helpers/emails.js'


const formularioLogin =(req,res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken()
    })
}

const autenticar = async (req, res) =>{
     console.log('autenticando..')
     //Validación
     await check('email').notEmpty().withMessage('Correo electrónico es obligatorio').run(req) 
     await check('password').notEmpty().withMessage('Contraseña es obligatorio').run(req) 

     let resultado = validationResult(req)

     //Verificar no enviar si resultado está vacío
     if(!resultado.isEmpty()){
         //Errores
         return res.render ('auth/login',{
           pagina: 'Iniciar Sesión',
           csrfToken : req.csrfToken(),
           errores: resultado.array(),
         })
     }

     const { email, password } =req.body
     //Comprobar si usuario existe
     const usuario= await  Usuario.findOne ({ where: {email} })
     if(!usuario){
        return res.render ('auth/login',{
            pagina: 'Iniciar Sesión',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'Este correo no está registrado'}]
          })
     }

     //Comprobar si el usuario está confirmado
     if(!usuario.confirmado){
        return res.render ('auth/login',{
            pagina: 'Iniciar Sesión',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'No se ha confirmado la cuenta'}]
          })
     }

     //Revisar el password
     if(!usuario.verificarPassword(password)){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesión',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'Contraseña incorrecta'}]
          })
     }


     //Autenticar al usuario
     const token = generarJWT({id: usuario.id, nombre: usuario.nombre})

     console.log(token)
     //Almacenar token en cookie
     return res.cookie('_token', token,{
        httpOnly: true,
        secure:true,
        sameSite:true
     }).redirect('/mi-perfil')
}





const formularioRegistro =(req,res) => {

    res.render('auth/registro', {
        pagina: 'Crear  Cuenta',
        csrfToken : req.csrfToken()
        //Token para saber que los resultados vienen desde nuestra url con csurf
    })
}



//RECOGER LOS DATOS DE FORM A BASE DE DATOS 
const registrar = async (req, res) =>{ 
    //Validación
    //'nombre' es el name del input del form
    await check('nombre').notEmpty().withMessage('Nombre es obligatorio').run(req) 
    await check('email').notEmpty().withMessage('Eso no parece un correo electrónico').run(req) 
    await check('password').isLength({min:6}).withMessage('Contraseña con al menos 6 caracteres').run(req) 
    await check('edad').notEmpty().withMessage('Introduce tu edad').run(req)  
    await check('edad').isLength({max:2}).withMessage('Eso no parece una edad').run(req)
    await check('genero').notEmpty().withMessage('Selecciona tu género').run(req)
    // await check('escolaridad').notEmpty().withMessage('Selecciona tu escolaridad').run(req)      
    // await check('ingles').notEmpty().withMessage('Selecciona tu nivel de inglés').run(req) 
    // await check('interes').notEmpty().withMessage('Selecciona un programa de interés').run(req)   
     // await check('ingreso').isLength({max:4}).withMessage('Ingresa un año válido').run(req)
    
    let resultado = validationResult(req)

    //return res.json(resultado.array)
    //Verificar no enviar si resultado está vacío
    if(!resultado.isEmpty()){
        //Errores
        return res.render ('auth/registro',{
          pagina: 'Crear Cuenta',
          csrfToken : req.csrfToken(),
          errores: resultado.array(),
          usuario:{
            //Para no perder la información si hay algún error
            nombre: req.body.nombre,
            email: req.body.email,
            edad: req.body.edad,
            escolaridad: req.body.genero,
            // ingles: req.body.ingles,
            // interes:req.body.interes,
            // escuela: req.body.escuela,
            // ingreso: req.body.ingreso
          }
        })
    }

    
//Extraer los datos
const { nombre, email, password, edad, genero, interes, estado, municipio} = req.body

//Verificar que el usuario no esté duplicado
const existeUsuario = await Usuario.findOne ({ where: {email} })
if(existeUsuario){
    return res.render ('auth/registro',{
        pagina: 'Crear Cuenta',
        csrfToken : req.csrfToken(),
        errores: [{msg: 'Este correo ya está registrado'}],
        usuario:{
          nombre: req.body.nombre,
          email: req.body.email,
          edad: req.body.edad,
          genero: req.body.genero,
        //   interes: req.body.interes,
        }

      })     
}

    //Almacenar un usuario
    const usuario= await Usuario.create({
        nombre,
        email,
        password,
        edad,
        genero,
        escolaridad:'',
        ingles: '',
        interes:'',
        escuela: '',
        ingreso: 0,

        token: generarId()
    })


    //Envía email de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    
    //Mostrar mensaje de confirmación
    res.render('templates/mensaje',{
        pagina: 'Confirma tu Cuenta',
        mensaje1:'¡Felicidades!',
        mensaje2: 'Hemos enviado un correo de confirmación, presiona en el enlace...'
    })

}



//Función que comprueba una cuenta
const confirmar= async(req, res) => {
    //cuando se crear una url dinámica se hace de esta forma
    const { token } = req.params
    //console.log(token)

    //Verificar si el token es válido
    const usuario= await Usuario.findOne ({where: {token}})

    if(!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar cuenta',
            mensaje1:'🚧¡Error al confirmar tu cuenta!🚧',
            mensaje2: 'Hubo un error al confirmar tu cuenta, intentalo nuevamente',
            error:true    
        })
    }
    //Confirmar la cuenta
    usuario.token =null;
    usuario.confirmado=true;

    //guardar los cambios de la base de datos
    await usuario.save()

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cúenta confirmada',
        mensaje1:'¡Has confirmado tu cuenta!🥳',
        mensaje2: '🎊Ya puedes iniciar sesión en EDUMARK🎊' 
    })

    //Accediendo a los atributos de usuario en BD
    //console.log(usuario.token)
}



const formularioOlvidePassword =(req,res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar Cuenta',
        csrfToken : req.csrfToken(),
    })
}


const resetPassword = async(req, res) => {
    //Validación
    await check('email').notEmpty().withMessage('Eso no parece un correo electrónico').run(req) 
    
    let resultado = validationResult(req)
    if(!resultado.isEmpty()){
        //Errores
        return res.render ('auth/olvide-password',{
            pagina: 'Recuperar Cuenta',
            csrfToken : req.csrfToken(),
            errores: resultado.array()
        })
    }


    //Buscar el usuario ya existente
    const { email } = req.body
    const usuario = await Usuario.findOne ( {where: {email} })
  
    if(!usuario){
        //Errores
        return res.render ('auth/olvide-password',{
            pagina: 'Recuperar Cuenta',
            csrfToken : req.csrfToken(),
            errores: [{ msg: 'Este correo no está registrado' }]
        })
    }


    //Generar un token y enviar el email
    usuario.token = generarId();
    await usuario.save();

    //Enviar un email
    emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    })

    //Renderizar un mensaje
    res.render ('templates/mensaje',{
        pagina: 'Restablecer contraseña',
        mensaje1: 'Hemos enviado un correo con las instrucciones'
    })
}


const comprobarToken = async(req, res) => {

    //.params porque está en la URL
    const {token} = req.params

    const usuario = await Usuario.findOne ({ where: {token}})
    if(!usuario){
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Reestablece tu contrasseña',
            mensaje1:'🚧¡Error al restablecer la contraseña de tu cuenta!🚧',
            mensaje2: 'Hubo un error al validar tu información, intentalo nuevamente',
            error:true    
        })  
    }

    //Mostrar el formulario para cambiar contraseña
    res.render('auth/reset-password', {
        pagina: 'Reestablezca su contraseña',
        csrfToken: req.csrfToken()
    })


}

const nuevoPassword = async (req, res) => {
    //Validar el password
    await check('password').isLength({min:6}).withMessage('Contraseña con al menos 6 caracteres').run(req) 

    let resultado = validationResult(req)

    //Verificar no enviar si resultado está vacío
    if(!resultado.isEmpty()){
        //Errores
        return res.render ('auth/reset-password',{
          pagina: 'Reestablezca su contraseña',
          csrfToken : req.csrfToken(),
          errores: resultado.array()
        })
    }

    const { token } = req.params;
    const { password } = req.body

    //identificar quien hace el cambio 
    const usuario = await Usuario.findOne ( {where: {token} })


    //Hashear el nuevo password
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash (password, salt);
    usuario.token = null
    await usuario.save();

    res.render('auth/confirmar-cuenta',{
        pagina: 'Contraseña reestablecida',
        mensaje1: 'Contraseña guardada correctamente'
    })
}


export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword,
    autenticar
}


