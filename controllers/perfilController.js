import Usuario from '../models/Usuario.js'

const admin = (req, res) =>{
    res.render('perfil/admin',{
        pagina: 'Mi Perfil',
        barra:true,
        nombre:'Fernando Yarib Velázquez Díaz',
        origen:'México',
        edad: '22'
    })
}

const crear = (req,res) => {
    res.render('perfil/admin',{
        pagina: 'Crear',
        barra:true,
    })
}

export{
    admin,
    crear
}