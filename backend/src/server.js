import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerLogin from './routers/router_login.js';
import routerEstudiantes from './routers/router_estudiantes.js';
import routerMaterias from './routers/router_materias.js';
import routerMatriculas from './routers/router_matriculas.js';

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Rutas 
app.use('/api/login', routerLogin);
app.use('/api/estudiantes', routerEstudiantes);
app.use('/api/materias', routerMaterias);
app.use('/api/matriculas', routerMatriculas);

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))



// Exportar la instancia de express por medio de app
export default  app
