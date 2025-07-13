import React, { useState } from 'react';
import { Menu, Search, Mic, Keyboard, Home, User, Settings, ScanLine, Leaf, Send, ArrowLeft } from 'lucide-react';
import { QrCode } from 'lucide-react';
import { Receipt } from 'lucide-react';
import { Palette } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { Tag, BadgePercent, Gift } from 'lucide-react';
import walmartLogo from './assets/walmart_logo.png';
import { useNavigate } from 'react-router-dom';
import WalmartSignIn from './registration_page';
import shelly_img from './assets/shelly_img.jpg'

// Walmart Logo Component using local images
const WalmartLogo = ({ size = 56 }) => (
  <div className=" flex items-center justify-center" style={{ width: size, height: size }}>
    <img 
      src={walmartLogo} 
      alt="Walmart Logo"
      style={{ width: size, height: size }}
      className="object-contain"
    />
  </div>
);

// Top Navigation Component
const TopNavigation = ({ onMenuToggle, onLogoClick, currentPage }) => {
  const handleScanClick = () => {
    alert('Scan to search clicked!');
  };

  return (
    <div className="bg-blue-600 h-16 flex items-center justify-between px-4">
      <button 
        className="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center w-12 h-12"
        onClick={onMenuToggle}
      >
        <Menu size={28} color="white" />
      </button>

      <button 
        className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center ml-[-20px]"
        onClick={onLogoClick}
      >
        <div className="flex justify-center items-center min-w-13 h-14">
          <WalmartLogo size={56} />
        </div>
      </button>

      <button 
        className="bg-transparent border-none cursor-pointer p-0 rounded-2xl"
        onClick={handleScanClick}
      >
        <div className="bg-white bg-opacity-90 rounded-2xl px-3 py-2 flex items-center justify-between gap-1 max-w-32 ml-[-15px]">
          <span className="text-xs text-gray-600 font-medium">Scan to search</span>
          <ScanLine size={16} color="#666" />
        </div>
      </button>
      
      <div className="flex flex-col items-center gap-0.5 min-w-14 h-12 justify-center relative">
        <div className="w-8 h-12 rounded-full bg-blue-600 flex items-center justify-center relative p-1.5" style={{
          background: 'conic-gradient(from 0deg, #4ade80 0deg, #4ade80 140deg, transparent 140deg, transparent 220deg, #16a34a 220deg, #16a34a 360deg)'
        }}>
          <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center relative">
            <span className="text-white text-sm font-bold">82</span>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <Leaf size={14} color="#15803d" fill="#84cc16" />
          </div>
        </div>
        <span className="text-white text-xs">Green score</span>
      </div>
    </div>
  );
};

// Custom Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
       {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-4 mx-4 max-w-xs w-full shadow-2xl transform transition-all duration-300 ease-out">
          {/* Shelly the Tortoise */}
          <div className="flex justify-center mb-4">
            <img 
              src={shelly_img} 
              alt="Shelly the Tortoise"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>

          {/* Message */}
          <div className="bg-white rounded-xl p-2 w-[280px] mx-auto text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Goodbye for now!</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Shelly is sad to see you go. Are you sure you want to sign out?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-2 px-9 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Stay
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-2 px-9 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Hamburger Menu Component
const HamburgerMenu = ({ isOpen, onClose, onNavigate, onSignOut }) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: Settings, label: 'Language | English', page: 'language' },
    { icon: null, label: 'Walmart+', page: 'walmart-plus', isWalmart: true },
    { icon: User, label: 'Account', page: 'account' },
    { icon: Receipt, label: 'Purchase History', page: 'purchase-history' },
    { icon: HelpCircle, label: 'Help', page: 'help' },
    { icon: QrCode, label: 'Upload Bill', page: 'upload-bill' },
    { icon: Palette, label: 'Style Lab', page: 'style-lab' },
    { icon: Tag, label: 'Offers', page: 'offers' },
    { icon: Gift, label: 'My Rewards', page: 'rewards' },
  ];

  const handleItemClick = (page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={`absolute top-0 left-0 w-4/5 max-w-72 h-full bg-white z-50 shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Menu Header */}
        <div className="p-4 pb-3 border-b border-gray-200 bg-white pt-6">
          <div className="mb-3">
            <WalmartLogo size={32} />
          </div>
          <button onClick={onSignOut} className="w-full py-2 px-4 bg-blue-600 text-white border-none rounded-full text-sm font-medium cursor-pointer">
            Signout
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-1">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center py-2.5 px-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors"
              onClick={() => handleItemClick(item.page)}
            >
              {item.isWalmart ? (
                <div className="text-sm font-bold text-blue-600 w-4 text-center">W+</div>
              ) : item.icon ? (
                <item.icon size={16} color="#666" />
              ) : null}
              <span className="ml-3 text-sm text-gray-800 flex-1">{item.label}</span>
              <span className="text-lg text-gray-400 ml-auto">›</span>
            </div>
          ))}
          
          <div className="flex justify-center py-8">
            <button 
              className="leaderboard-button w-3/5 py-1.5 px-4 text-white border-none rounded-full text-sm font-semibold cursor-pointer relative overflow-hidden shadow-lg"
              onClick={() => handleItemClick('leaderboard')}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .leaderboard-button {
          background: linear-gradient(135deg, #4ade80, #22c55e, rgb(49, 157, 85));
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
          transition: all 0.3s ease-in-out;
        }
        
        .leaderboard-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(219, 235, 100, 0.2), transparent);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }
      `}</style>
    </>
  );
};

// Floating Spheres Background Component
const FloatingSpheresBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-white">
      {/* Main fluid wave shape */}
      <div className="absolute top-1/4 -left-4 bg-blue-200 opacity-80 animate-pulse" style={{
        borderRadius: '50% 50% 60% 40% / 25% 35% 65% 75%',
        width: '110%',
        height: '45%',
        animation: 'slowDrift 25s ease-in-out infinite'
      }}></div>
      
      {/* Floating spheres */}
      <div className="absolute w-11 h-11 bg-white rounded-full opacity-90 animate-bounce" style={{
        top: '45%', left: '5%', animation: 'floatUp 7s ease-in-out infinite'
      }}></div>
      <div className="absolute w-9 h-9 bg-blue-200 rounded-full opacity-90" style={{
        top: '16%', right: '25%', animation: 'floatDown 8s ease-in-out infinite 1s'
      }}></div>
      <div className="absolute w-6 h-6 bg-blue-200 rounded-full opacity-90" style={{
        top: '14%', left: '45%', animation: 'gentleFloat 6s ease-in-out infinite 2s'
      }}></div>
      <div className="absolute w-14 h-14 bg-white rounded-full opacity-90" style={{
        top: '30%', right: '10%', animation: 'floatSide 9s ease-in-out infinite 0.5s'
      }}></div>
      <div className="absolute w-8 h-8 bg-white rounded-full opacity-90" style={{
        top: '28%', left: '20%', animation: 'floatUp 8s ease-in-out infinite 3s'
      }}></div>
      <div className="absolute w-5 h-5 bg-blue-200 rounded-full opacity-90" style={{
        top: '12%', right: '5%', animation: 'floatDown 5s ease-in-out infinite 1.5s'
      }}></div>
      <div className="absolute w-16 h-16 bg-white rounded-full opacity-90" style={{
        top: '55%', left: '55%', animation: 'gentleFloat 10s ease-in-out infinite 2.5s'
      }}></div>
      <div className="absolute w-5 h-5 bg-blue-200 rounded-full opacity-90" style={{
        top: '72%', left: '20%', animation: 'floatSide 6s ease-in-out infinite 1s'
      }}></div>
      <div className="absolute w-8 h-8 bg-blue-200 rounded-full opacity-90" style={{
        top: '70%', right: '15%', animation: 'floatUp 7s ease-in-out infinite 4s'
      }}></div>
      <div className="absolute w-6 h-6 bg-blue-200 rounded-full opacity-90" style={{
        top: '74%', left: '60%', animation: 'floatDown 4s ease-in-out infinite 0.8s'
      }}></div>
      
      {/* CSS animations */}
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes floatDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(12px); }
        }
        
        @keyframes floatSide {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(8px) translateY(-8px); }
          75% { transform: translateX(-8px) translateY(8px); }
        }
        
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slowDrift {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          33% { transform: translateX(15px) translateY(-8px); }
          66% { transform: translateX(-10px) translateY(10px); }
        }
        
        @keyframes buttonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

// Page Components
const MainPage = ({ messageText, setMessageText, isRecording, handleVoiceToggle, handleSendMessage }) => (
  <div className="flex-1 bg-white relative flex flex-col justify-end">
    <FloatingSpheresBackground />
    <div className="flex justify-center items-center gap-3 p-12 bg-transparent z-10">
      <div className="flex items-center gap-2 flex-1 bg-white bg-opacity-95 rounded-3xl p-2 shadow-lg backdrop-blur-sm border border-white border-opacity-20">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Talk to me..."
          className="flex-1 py-2 px-3 border-none rounded-2xl text-sm bg-gray-100 bg-opacity-80 text-gray-800 outline-none"
        />
        <button 
          className={`w-8 h-8 rounded-full border-none cursor-pointer flex items-center justify-center shadow-md ${
            messageText.trim() 
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
        >
          <Send size={16} />
        </button>
      </div>
      
      <div className="flex items-center justify-center">
        <button 
          className={`w-11 h-11 rounded-full border-none cursor-pointer flex items-center justify-center shadow-md ${
            isRecording ? 'bg-red-500 animate-pulse' : 'bg-yellow-400'
          } text-white`}
          onClick={handleVoiceToggle}
        >
          <Mic size={20} />
        </button>
      </div>
    </div>
  </div>
);

const GenericPage = ({ title, onBack }) => (
  <div className="flex-1 bg-gray-50 flex flex-col">
    <div className="bg-white border-b border-gray-200 p-4 flex items-center">
      <button 
        onClick={onBack}
        className="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center mr-3"
      >
        <ArrowLeft size={24} color="#666" />
      </button>
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-2">{title}</h2>
        <p className="text-gray-500">This page is under construction</p>
      </div>
    </div>
  </div>
);

function WalmartMobileApp({onSignOut}) {
  const [currentPage, setCurrentPage] = useState('main');
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleVoiceToggle = () => {
    setIsRecording((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSignOut = () => {
  setShowConfirmModal(false);
  setIsMenuOpen(false);
  onSignOut(); 
};



  const handleCancelSignOut = () => {
    setShowConfirmModal(false);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      alert(`Message sent: ${messageText}`);
      setMessageText('');
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    setCurrentPage('main');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  const getPageTitle = (page) => {
    const titles = {
      'language': 'Language Settings',
      'walmart-plus': 'Walmart+',
      'account': 'Account',
      'purchase-history': 'Purchase History',
      'help': 'Help',
      'upload-bill': 'Upload Bill',
      'style-lab': 'Style Lab',
      'offers': 'Offers',
      'rewards': 'My Rewards',
      'leaderboard': 'Leaderboard'
    };
    return titles[page] || page;
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col relative font-sans">

      {/* Top Navigation Bar */}
      <TopNavigation 
        onMenuToggle={handleMenuToggle} 
        onLogoClick={handleLogoClick}
        currentPage={currentPage}
      />

      {/* Hamburger Menu */}
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onNavigate={handleNavigation}
        onSignOut={handleSignOut}
      />

      {/* Custom Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancelSignOut}
        onConfirm={handleConfirmSignOut}
      />

      {/* Main Content Area */}
      {currentPage === 'main' ? (
        <MainPage 
          messageText={messageText}
          setMessageText={setMessageText}
          isRecording={isRecording}
          handleVoiceToggle={handleVoiceToggle}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        <GenericPage 
          title={getPageTitle(currentPage)}
          onBack={handleBackToMain}
        />
      )}
    </div>
  );
}

export default WalmartMobileApp;