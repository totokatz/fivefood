import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Stories from './pages/Stories'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stories" element={<Stories />} />
    </Routes>
  )
}

export default App
