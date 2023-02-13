import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})


const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host:process.env.BD_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps:true
    },
    pool:{ //Configura el rendimiento de activación de la BD
        max: 5, //Max conecciones
        min: 0, //Min conecciones
        acquire: 30000, //Tiempo antes de marcar un error
        idle: 10000 //Tiempo a trnascurrir para finalizar consulta si nadie utiliza el proyecto
    },
    operatorAliases: false
})

export default db




