import './App.css';
import Login from './modules/Login.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NotFound from './modules/NotFound.js';
import ItemDetails from './modules/ItemDetails.js';
import Inventory from './modules/Inventory.js';
import UserPage from './modules/UserPage.js';
import Auth0Provider from '@auth0/auth0-react'
import CreateAccount from './modules/CreateAccount.js';

function App() {
  return (
    <Router>
      <Auth0Provider>
        <Routes basename="/inventory">
          <Route path="*" element={<NotFound/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/inventory/itemDetails" element={<ItemDetails/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/user-details" element={<UserPage/>}/>
          <Route path="/item-details" element={<ItemDetails/>}/>
          <Route path="/CreateAccount" element={<CreateAccount/>}/>
        </Routes>
      </Auth0Provider>
    </Router>
  );
}

export default App;
