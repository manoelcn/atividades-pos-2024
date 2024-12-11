import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Artistas from './pages/Artistas';
import Albuns from './pages/Albuns';
import Musicas from './pages/Musicas';
import Footer from './components/Footer';
import Menu from './components/Menu';


function App() {
  return (
    <div>
      <Menu></Menu>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/artistas" element={<Artistas />} />
            <Route path="/albuns" element={<Albuns />} />
            <Route path="/musicas" element={<Musicas />} />
          </Routes>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  )
}

export default App