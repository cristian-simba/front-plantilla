import express  from "express";
import { 
  actualizarEstudiante,
  borrarEstudiante,
  buscarEstudiantes,
  mostrarEstudiantes,
  registrarEstudiante
} from "../controllers/estudiantes_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js"

const routerEstudiantes = express.Router()

routerEstudiantes.use(express.json())


  routerEstudiantes.get('/listar', verificadoAutentication,  mostrarEstudiantes);
  
  routerEstudiantes.get('/obtener/:id', verificadoAutentication,  buscarEstudiantes);
  
  routerEstudiantes.post('/register', verificadoAutentication,  registrarEstudiante);
  
  
  routerEstudiantes.put('/actualizar/:id', verificadoAutentication,  actualizarEstudiante);
  
  routerEstudiantes.delete('/eliminar/:id', verificadoAutentication,  borrarEstudiante);
  
  routerEstudiantes.use((req, res) => res.status(404).end())

export default routerEstudiantes