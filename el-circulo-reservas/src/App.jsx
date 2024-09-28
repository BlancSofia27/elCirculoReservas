import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Reservar from './views/reservar'
import AdminPanel from './views/adminPanel'

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Reservar />} />
        <Route path="/adminPanel" element={<AdminPanel/>}/>
      </Routes>
    </Router>
  )
}

export default App
