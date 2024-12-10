import { useState } from 'react'
import './App.css'
import Footer from './components/Footer';
import Menu from './components/Menu';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <Menu></Menu>
        <div>
          <p>Ainda não sei oq colocar aqui</p>
        </div>
      <Footer></Footer>
    </>
  )
}

export default App