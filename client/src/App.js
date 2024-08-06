import './App.css';
import Login from './modules/Login.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
