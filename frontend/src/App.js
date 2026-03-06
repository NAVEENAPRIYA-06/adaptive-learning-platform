import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import TestPage from "./pages/TestPage";
import RoadmapPage from "./pages/RoadmapPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import AdminUsers from "./pages/AdminUsers"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <TestPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <RoadmapPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          }
        />

        {/* INSTRUCTOR ROUTES */}

        <Route
          path="/instructor"
          element={
            <ProtectedRoute>
              <InstructorDashboard/>
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
path="/users"
element={
<ProtectedRoute>
<AdminUsers/>
</ProtectedRoute>
}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;