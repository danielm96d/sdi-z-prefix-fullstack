import './App.css';
import Login from './modules/Login.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NotFound from './modules/NotFound.js';
import ItemDetails from './modules/ItemDetails.js';
import Inventory from './modules/Inventory.js';
import UserPage from './modules/UserPage.js';
import AuthProvider from './AuthProvider.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes basename="/inventory">
          <Route path="*" element={<NotFound/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/inventory/itemDetails" element={<ItemDetails/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/user-details" element={<UserPage/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
