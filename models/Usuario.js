import {DataTypes, Sequelize} from 'sequelize'
import bcrypt from 'bcrypt'
import  db from '../config/db.js'
 
//Modelo para usuarios
//Aquí puedo colocar las características de ejemplo de un 
//producto como precio, nombre, categoría. inventario,etc..
const Usuario= db.define('usuarios',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false //asegurarse que no vaya vacío
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false //asegurarse que no vaya vacío
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false //asegurarse que no vaya vacío
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false //asegurarse que no vaya vacío
    },
    genero:{
        type: DataTypes.BOOLEAN,
        allowNull: false //asegurarse que no vaya vacío
    },
    escolaridad:{
        type: DataTypes.STRING,
        allowNull: false //asegurarse que no vaya vacío
    },
    ingles:{
        type: DataTypes.STRING,
        allowNull: false //asegurarse que no vaya vacío
    },
    interes:{
        type: DataTypes.STRING,
        allowNull: false //asegurarse que no vaya vacío
    },
    escuela:{
        type: DataTypes.STRING,
        allowNull: false //asegurarse que no vaya vacío
    },
    
    ingreso:{
        type: DataTypes.INTEGER,
        allowNull: false //asegurarse que no vaya vacío
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
},{
    //Un hook se ejecuta en determinados momentos en sequelize como antes de eliminar un registro, etc..
    hooks: {
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash( usuario.password, salt)
        }
    }
})

//Métodos personalizados
Usuario.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
 

export default Usuario