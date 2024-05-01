/* eslint-disable no-unused-vars */
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Home2 from './Home2'
import RConformation from './RConformation'
import REdit from './REdit'
import Allrequests from './Allrequests'
import Home3 from './Home3'
import InandOut from './InandOut'
import Gletters from './Gletters'
import Gateletters from './Gateletters'
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
        <Route path='/Allrequests' element={<Allrequests />}></Route>
        <Route path='/Home3' element={<Home3 />}></Route>
        <Route path='/InandOut' element={<InandOut />}></Route>
        <Route path='/Gletters' element={<Gletters />}></Route>
        <Route path='/Gateletters' element={<Gateletters />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
