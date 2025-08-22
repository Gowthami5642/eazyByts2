import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Portfolio from './pages/Portfolio';
import PrivateRoute from './PrivateRoute';
import './styles/global.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/trade" element={<PrivateRoute><Trade /></PrivateRoute>} />
        <Route path="/portfolio" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;