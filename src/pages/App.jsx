import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/UI/Sidebar.jsx";
import { CourseDetails } from "./CourseDetails";
import { Events } from "./Events";
import { HomePage } from "./HomePage";
import { Statistics } from "./Statistics";
import Modal from 'react-modal';
import { courses } from "../pages/HomePage.jsx";
import ProtectedRoute from './ProtectedRoute'; 

Modal.setAppElement('#root');

export function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
n
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            setIsAuthenticated(!!token); 
        };
        checkAuth();
    }, []);

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
                <Route path="/home" element={<HomePage name={profileInfo[0].name} />} />
    
                <Route 
                    path="/events" 
                    element={<ProtectedRoute element={<Events />} isAuthenticated={isAuthenticated} />} 
                />
                <Route 
                    path="/statistics" 
                    element={<ProtectedRoute element={<Statistics />} isAuthenticated={isAuthenticated} />} 
                />
                <Route 
                    path="/courseDetails" 
                    element={<ProtectedRoute element={<CourseDetails />} isAuthenticated={isAuthenticated} />} 
                />

                {/* Ruta por defecto (en caso de que no se encuentre la ruta especificada) */}
                <Route path="/*" element={<HomePage name={profileInfo[0].name} />} />
            </Routes>
        </div>
    );
}

export default App;
