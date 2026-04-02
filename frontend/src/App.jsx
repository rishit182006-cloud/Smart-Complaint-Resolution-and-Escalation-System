import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import RaiseComplaint from './pages/RaiseComplaint';
import ComplaintDetails from './pages/ComplaintDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import { ComplaintProvider } from './context/ComplaintContext';
import './App.css';

function App() {
  return (
    <ComplaintProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="raise-complaint" element={<RaiseComplaint />} />
        <Route path="complaint/:id" element={<ComplaintDetails />} />
      </Route>
      </Routes>
    </ComplaintProvider>
  );
}

export default App;
