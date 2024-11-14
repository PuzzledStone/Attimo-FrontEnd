// src/App.jsx
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../components/UI/Sidebar.jsx";
import { CourseDetails } from "./CourseDetails";
import { Events } from "./Events";
import { HomePage } from "./HomePage";
import { Statistics } from "./Statistics";
import Modal from 'react-modal';
import { courses } from "../pages/HomePage.jsx";
import PrivateRoute from "./PrivateRoute";  

Modal.setAppElement('#root');

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login'); 
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="flex gap-4 bg-clr-light-bg dark:bg-clr-dark-bg w-full">
      <aside className="w-16">
        <Sidebar 
          username={profileInfo[0].usr} 
          email={profileInfo[0].mail} 
          image={profileInfo[0].img} 
          items={profileInfo} 
        />
      </aside>

      <Routes>
        {/* Ruta pública */}
        <Route path="/home" element={<HomePage name={profileInfo[0].name} />} />

        {/* Rutas protegidas */}
        <Route 
          path="/events" 
          element={<PrivateRoute element={<Events />} isAuthenticated={isAuthenticated} />} 
        />
        <Route 
          path="/statistics" 
          element={<PrivateRoute element={<Statistics />} isAuthenticated={isAuthenticated} />} 
        />
        <Route 
          path="/courseDetails" 
          element={<PrivateRoute element={<CourseDetails />} isAuthenticated={isAuthenticated} />} 
        />

        {/* Ruta por defecto */}
        <Route path="/*" element={<HomePage name={profileInfo[0].name} />} />
      </Routes>
    </div>
  );
}

export default App;
