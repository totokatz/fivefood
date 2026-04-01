import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Stories from './pages/Stories'
import KanvasPage from './components/stories/kanvas/KanvasPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/kanvas" element={<KanvasPage />} />
    </Routes>
  )
}

export default App
