import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import ChoosePage from './pages/ChoosePage';
import LoginPage from './pages/LoginPage';
import AdminDashBoard from "./pages/Admin/AdminDashboard"
import AdminDashboard from './pages/Admin/AdminDashboard';
import ParentDashboard from './pages/Parent/ParentDashboard';
import TeacherLayout from './pages/Teacher/TeacherLayout';

function App() {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChoosePage />} />

          <Route path="/Adminlogin" element={<LoginPage role="admin" />} />
          <Route path="/Parentlogin" element={<LoginPage role="parent" />} />
          <Route path='/teacherlogin' element={<LoginPage role="teacher" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      }
      {currentRole === "admin" &&
        <>
          <AdminDashboard />
        </>
      }
      {currentRole === "parent" &&
        <>
          <ParentDashboard />
        </>
      }
      {currentRole === 'teacher' &&
        <>
          <TeacherLayout />
        </>
      }
    </Router>
  )
}

export default App