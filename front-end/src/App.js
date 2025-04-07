import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import LogWorkout from './pages/LogWorkout';
import Dashboard from './pages/Dashboard';
import EditWorkout from './pages/EditWorkout';
import Progress from './pages/Progress';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="w-screen h-screen">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/home" element={<Home />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logworkout" element={<LogWorkout />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/editworkout" element={<EditWorkout />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
