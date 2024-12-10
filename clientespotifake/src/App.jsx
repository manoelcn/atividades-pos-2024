import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer';
import Menu from './components/Menu';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <Menu></Menu>
        
      <Footer></Footer>
    </>
  )
}

export default App