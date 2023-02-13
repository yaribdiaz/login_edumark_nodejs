import Express from "express"
import { admin, crear } from '../controllers/perfilController.js'


const router = Express.Router()



router.get('/mi-perfil', admin)

router.get('/mi-perfil/crear', crear)


export default router