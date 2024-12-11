import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
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
          </Routes>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  )
}

export default App