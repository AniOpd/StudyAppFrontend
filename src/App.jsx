import react from 'react'
import Header from './Components/Header/Header.jsx'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div>
   <div className='sticky top-0 z-50'>
   <Header />
   </div>
      <Outlet />
    </div>
  )
}

export default App
