
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from './components/common/root-layout/RootLayout';
import Home from './components/pages/home/Home';
import Admin from './components/pages/admin/Admin';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} />,
    <Route index element={<Home />} />,
    <Route path="login" element={<Login />} />,
    <Route path="register" element={<Register />} />,
    <Route path="admin" element={<Admin />} />
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
