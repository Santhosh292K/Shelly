import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './registration_page';
import WalmartMobileApp from './main_page';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      {/* Centered full-screen background */}
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        {/* Responsive mobile container */}
        <div className="w-full h-screen overflow-hidden bg-white">
          <Routes>
            <Route
              path="/registration"
              element={
                isAuthenticated ? (
                  <Navigate to="/app" />
                ) : (
                  <RegistrationPage onComplete={() => setIsAuthenticated(true)} />
                )
              }
            />
            <Route
              path="/app"
              element={
                isAuthenticated ? (
                  <WalmartMobileApp onSignOut={() => setIsAuthenticated(false)} />
                ) : (
                  <Navigate to="/registration" />
                )
              }
            />
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/app" : "/registration"} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
