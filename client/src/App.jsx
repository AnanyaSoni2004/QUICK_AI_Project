import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import WriteArticle from './pages/WriteArticle';
import BlogTitles from './pages/BlogTitles';
import GenerateImages from './pages/GenerateImages';

import RemoveBackground from './pages/RemoveBackground';
import ReviewResume from './pages/ReviewResume';

import RemoveObject from './pages/RemoveObject';
import Signup from './components/Signup';
import Login from './components/Login';

import {Toaster} from 'react-hot-toast'

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <div>
      <Toaster />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes with Layout */}
      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Default page inside /ai */}
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="write-article" element={<WriteArticle />} />
        <Route path="blog-titles" element={<BlogTitles />} />
        <Route path="generate-images" element={<GenerateImages />} />
        <Route path="remove-background" element={<RemoveBackground />} />
        <Route path="remove-object" element={<RemoveObject />} />
        <Route path="review-resume" element={<ReviewResume />} />


      </Route>
    </Routes>
    </div>
  );
};

export default App;
