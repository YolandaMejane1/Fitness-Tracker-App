import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import LogWorkout from './pages/LogWorkout';
import EditWorkout from './pages/EditWorkout';
import Progress from './pages/Progress';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto mt-4">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/home" element={<Home />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/log-workout" element={<LogWorkout />} />
            <Route path="/edit-workout" element={<EditWorkout />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
