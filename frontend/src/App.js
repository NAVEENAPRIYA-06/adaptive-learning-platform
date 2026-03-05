import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TestPage from "./pages/TestPage";
import RoadmapPage from "./pages/RoadmapPage";
<h1 className="text-4xl text-green-500">Tailwind Working</h1>
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;