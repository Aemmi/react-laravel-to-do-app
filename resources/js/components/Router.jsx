import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../Home';
import Register from '../Register';
import Login from '../Login';
import NotFound from '../NotFound';
import Dashboard from '../Dashboard';
import ProtectedRoute from './ProtectedRoute'; // Import your ProtectedRoute component

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='*' element={<NotFound />} />

                <Route
                    path='dashboard'
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default AppRouter;
