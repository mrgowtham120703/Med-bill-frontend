import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App'
import ProviderDashboard from './pages/ProviderDashboard';
import ClaimForm from './pages/ClaimForm';
import ClaimList from './pages/ClaimList';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/provider' element={<ProviderDashboard/>}/>
      <Route path='/claims/new' element={<ClaimForm/>}/>
      <Route path='/claims' element={<ClaimList/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)