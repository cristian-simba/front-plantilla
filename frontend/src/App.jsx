import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './layout/Dashboard'

import ListarEstudiantes from './pages/estudiantes/ListarEstudiantes'
import AgregarEstudiante from './pages/estudiantes/AgregarEstudiante'
import ActualizarEstudiante from './pages/estudiantes/ActualizarEstudiante'

import ListarMaterias from './pages/materias/ListarMaterias'
import AgregarMateria from './pages/materias/AgregarMateria'
import ActualizarMateria from './pages/materias/ActualizarMateria'

import ListarMatriculas from './pages/matriculas/ListarMatriculas'
import AgregarMatricula from './pages/matriculas/AgregarMatricula'
import ActualizarMatricula from './pages/matriculas/ActualizarMatricula'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard/" element={<Dashboard />} >
          <Route path='estudiantes/' element={<ListarEstudiantes/>}/>

          <Route path='estudiantes/agregar-estudiante' element={<AgregarEstudiante/>}/>
          <Route path='estudiantes/actualizar-estudiante/:id' element={<ActualizarEstudiante/>}/>

          <Route path='materias' element={<ListarMaterias/>}/>
          <Route path='materias/agregar-materia' element={<AgregarMateria/>}/>
          <Route path='materias/actualizar-materia/:id' element={<ActualizarMateria/>}/>

          <Route path='matriculas' element={<ListarMatriculas/>}/>
          <Route path='matriculas/agregar-matricula' element={<AgregarMatricula/>}/>
          <Route path='matriculas/actualizar-matricula/:id' element={<ActualizarMatricula/>}/>
        </Route>

        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
