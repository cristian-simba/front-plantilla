import express from "express";
import {
  actualizarMatricula,
  borrarMatricula,
  buscarMatriculas,
  mostrarMatriculas,
  registrarMatricula
} from "../controllers/matriculas_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js"

const routerMatriculas = express.Router();

routerMatriculas.use(express.json());

  routerMatriculas.get("/listar", verificadoAutentication, mostrarMatriculas);
  
  routerMatriculas.get("/mostrar/:id", verificadoAutentication, buscarMatriculas);
  
  routerMatriculas.post("/register", verificadoAutentication, registrarMatricula);
  
  routerMatriculas.put("/actualizar/:id", verificadoAutentication, actualizarMatricula);
  
  routerMatriculas.delete("/eliminar/:id", verificadoAutentication, borrarMatricula);

routerMatriculas.use((req, res) => res.status(404).end())

export default routerMatriculas;