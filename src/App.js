
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RootLayout from './components/common/root-layout/RootLayout';
import Home from './components/pages/home/Home';
import Admin from './components/pages/admin/Admin';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import NewTrip from './components/pages/new_trip/NewTrip';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="newtrip" element={<NewTrip />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
