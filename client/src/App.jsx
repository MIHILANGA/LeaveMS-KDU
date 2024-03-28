/* eslint-disable no-unused-vars */
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Home2 from './Home2'
import RConformation from './RConformation'
import REdit from './REdit'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/home2' element={<Home2 />}></Route>
        <Route path='/RConformation' element={<RConformation />}></Route>
        <Route path='/REdit' element={<REdit />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
