import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import LogWorkout from './pages/LogWorkout';
import Dashboard from './pages/Dashboard';
import EditWorkout from './pages/EditWorkout';
import Exercises from './pages/Exercises';
import './App.css';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Shell = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/logworkout" element={<ProtectedRoute><LogWorkout /></ProtectedRoute>} />
        <Route path="/editworkout" element={<ProtectedRoute><EditWorkout /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  </AuthProvider>
);

// The Google provider is only mounted when a client ID is configured.
const App = () =>
  GOOGLE_CLIENT_ID ? (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}><Shell /></GoogleOAuthProvider>
  ) : (
    <Shell />
  );

export default App;
