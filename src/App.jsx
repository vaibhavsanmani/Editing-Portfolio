import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer"

import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <>
      {!videoPlaying && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <Home setVideoPlaying={setVideoPlaying} />
          }
        />

        <Route
          path="/work"
          element={
            <Work setVideoPlaying={setVideoPlaying} />
          }
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/admin/login"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </>
  );
}