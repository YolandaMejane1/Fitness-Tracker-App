import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import LogWorkout from './pages/LogWorkout';
import Dashboard from './pages/Dashboard';
import EditWorkout from './pages/EditWorkout';
import Exercises from './pages/Exercises';
import './App.css';

const App = () => {
  return (
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
          <Route path="/exercises" element={<Exercises />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
