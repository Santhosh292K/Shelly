import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import walmartLogo from './assets/walmart_logo.png';
import googleLogo from './assets/google_logo.png';

// ✅ Sign In / Sign Up Component
function WalmartSignIn({ onComplete }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onComplete && onComplete();
  };

  const handleInputFocus = (name) => setFocusedInput(name);
  const handleInputBlur = () => setFocusedInput(null);

  return (
    
    <div className="bg-blue-50 w-full h-full relative overflow-hidden">
      {/* Decorative Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
       
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="px-4 py-4 min-h-full flex flex-col">
          {/* Logo + Welcome */}
          <div className="text-center mb-4">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <img src={walmartLogo} alt="Walmart Logo" className="w-12 h-12 object-contain" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              {isSignUp ? 'Join Green Shopping!' : 'Welcome Back!'}
            </h2>
            <p className="text-gray-600 text-xs">
              {isSignUp
                ? 'Start your eco-friendly journey'
                : 'Continue sustainable shopping'}
            </p>
          </div>

          {/* Toggle Sign In / Up */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-4">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-medium transition-all ${
                isSignUp ? 'text-gray-600' : 'bg-blue-600 text-white shadow'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-medium transition-all ${
                isSignUp ? 'bg-blue-600 text-white shadow' : 'text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-2 flex-1">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('firstName')}
                  onBlur={handleInputBlur}
                  className={`px-3 py-2 border rounded-lg text-xs ${
                    focusedInput === 'firstName' ? 'border-blue-600 ring-1 ring-blue-200' : 'border-gray-300'
                  }`}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('lastName')}
                  onBlur={handleInputBlur}
                  className={`px-3 py-2 border rounded-lg text-xs ${
                    focusedInput === 'lastName' ? 'border-blue-600 ring-1 ring-blue-200' : 'border-gray-300'
                  }`}
                />
              </div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('email')}
              onBlur={handleInputBlur}
              className={`w-full px-3 py-2 border rounded-lg text-xs ${
                focusedInput === 'email' ? 'border-blue-600 ring-1 ring-blue-200' : 'border-gray-300'
              }`}
            />

            {isSignUp && (
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('phone')}
                onBlur={handleInputBlur}
                className={`w-full px-3 py-2 border rounded-lg text-xs ${
                  focusedInput === 'phone' ? 'border-blue-600 ring-1 ring-blue-200' : 'border-gray-300'
                }`}
              />
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('password')}
                onBlur={handleInputBlur}
                className={`w-full px-3 py-2 pr-8 border rounded-lg text-xs ${
                  focusedInput === 'password' ? 'border-blue-600 ring-1 ring-blue-200' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none w-4 h-4 flex items-center justify-center"
              >
              </button>
            </div>

            {/* Confirm Password */}
            {isSignUp && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('confirmPassword')}
                onBlur={handleInputBlur}
                className={`w-full px-3 py-2 border rounded-lg text-xs ${
                  focusedInput === 'confirmPassword' ? 'border-blue-600 ring-1 ring-blue-200' : 'border-gray-300'
                }`}
              />
            )}

            {/* Terms & Submit */}
            {isSignUp && (
              <label className="flex items-start gap-2 text-xs text-gray-600 mb-2">
                <input 
                  type="checkbox" 
                  className="mt-0.5 w-3 h-3" 
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <span>
                  I agree to Walmart's
                  <span className="text-blue-600 font-medium"> Terms </span> and
                  <span className="text-blue-600 font-medium"> Privacy Policy</span>.
                </span>
              </label>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSignUp && !isAgreed}
              className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold shadow-lg transition text-xs ${
                isSignUp && !isAgreed 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <div className="mb-3">
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 text-xs">
              <img src={googleLogo} alt="Google" className="w-4 h-4" />
              Continue with Google
            </button>
          </div>

          {/* Green Shopping Message */}
          <div className="bg-green-100 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🌱</span>
              </div>
              <h3 className="text-green-800 font-semibold text-xs">
                {isSignUp ? 'Welcome to Green Shopping!' : 'Welcome Back to Green Shopping!'}
              </h3>
            </div>
            <p className="text-green-700 text-xs">
              {isSignUp 
                ? 'Start tracking your sustainable shopping habits' 
                : 'Continue tracking your sustainable shopping habits'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalmartSignIn;