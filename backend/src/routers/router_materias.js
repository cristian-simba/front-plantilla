import express  from "express";
import { 
    actualizarMaterias,
    borrarMaterias,
    buscarMaterias,
    mostrarMaterias,
    registrarMaterias
} from "../controllers/materias_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js"

const routerMaterias = express.Router()

routerMaterias.use(express.json())


    routerMaterias.get('/listar', verificadoAutentication, mostrarMaterias)
    
    routerMaterias.get('/obtener/:id', verificadoAutentication, buscarMaterias)
    
    routerMaterias.post('/register', verificadoAutentication, registrarMaterias)
    
    routerMaterias.put('/actualizar/:id', verificadoAutentication, actualizarMaterias);
    
    routerMaterias.delete('/eliminar/:id', verificadoAutentication, borrarMaterias)

    routerMaterias.use((req, res) => res.status(404).end())


export default routerMaterias