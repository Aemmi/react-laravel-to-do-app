// Router.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Home';
import Register from '../Register';
import Login from '../Login';
import NotFound from '../NotFound';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='*' element={<NotFound />} />

                <Route path='dashboard' element={
                    <ProtectedRoute>
                    </ProtectedRoute>
                    }>
                    <Route index element={<Dashboard />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default AppRouter;
