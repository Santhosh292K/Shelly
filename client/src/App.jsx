import './index.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './registration_page';
import WalmartMobileApp from './main_page';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="border border-gray-300 shadow-lg" style={{ width: '375px', height: '667px' }}>
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

