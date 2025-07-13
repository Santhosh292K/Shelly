import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './pages/registration_page';
import WalmartMobileApp from './pages/main_page';
import ScanBill from './pages/ScanBillPage';
import ScanProduct from './pages/ScanProductPage';
import PersonalizationPage from './pages/personalization';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsPersonalization, setNeedsPersonalization] = useState(false);

  const handleRegistrationComplete = (isSignUp) => {
    if (isSignUp) {
      // If it's a sign up, go to personalization first
      setNeedsPersonalization(true);
    } else {
      // If it's a sign in, go directly to app
      setIsAuthenticated(true);
    }
  };

  const handlePersonalizationComplete = () => {
    setNeedsPersonalization(false);
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      {/* Centered full-screen background */}
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        {/* Responsive mobile container */}
        <div className="w-full h-screen bg-white">
          <Routes>
            <Route
              path="/registration"
              element={
                isAuthenticated ? (
                  <Navigate to="/app" />
                ) : needsPersonalization ? (
                  <Navigate to="/personalize" />
                ) : (
                  <RegistrationPage onComplete={handleRegistrationComplete} />
                )
              }
            />
            <Route
              path="/personalize"
              element={
                isAuthenticated ? (
                  <Navigate to="/app" />
                ) : needsPersonalization ? (
                  <PersonalizationPage onComplete={handlePersonalizationComplete} />
                ) : (
                  <Navigate to="/registration" />
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
            <Route path="/" element={<Navigate to={isAuthenticated ? "/app" : "/registration"} />} />
            <Route path="/scanproduct" element={<ScanProduct />} />
            <Route path="/scanbill" element={<ScanBill />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}