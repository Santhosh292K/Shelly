import React, { useState, useEffect } from 'react';
import { Menu, Search, Mic, Keyboard, Home, User, Settings, ScanLine, Leaf, Send, Coins, DollarSign, Receipt, HelpCircle, QrCode, Palette, Tag, Gift } from 'lucide-react';

// Import your assets - keeping your original paths
import walmartLogo from '../assets/walmart_logo.png';
import shellyWaveVideo from '../assets/shelly_wave.webm';
import shellyCelebrateVideo from '../assets/shelly_wave.webm';
import shelly_sad from '../assets/shelly_sad.webm'; // Added missing import
import '../index.css';
import './main_page.jsx'

// Walmart Logo Component
const WalmartLogo = ({ size = 32 }) => (
  <img src={walmartLogo} alt="Walmart" width={size} height={size} />
);

// Mock useNavigate hook since it's not imported
const useNavigate = () => {
  return (path) => {
    console.log('Navigate to:', path);
    // You can replace this with actual navigation logic
  };
};

// Top Navigation Component
const TopNavigation = ({ onMenuToggle, onLogoClick, currentPage }) => {
  const navigate = useNavigate();

  const handleScanClick = () => {
    navigate('/scanproduct');
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
            <span className="text-white text-sm font-bold">0</span>
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
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[50] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-4 mb-31 mr-24 max-w-xs w-full shadow-2xl transform transition-all duration-300 ease-out">
          {/* Shelly the Tortoise */}
          <div className="flex justify-center mb-4">
            <video 
              src={shelly_sad} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-20 h-20 rounded-full object-cover"
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
    { icon: QrCode, label: 'Upload Bill', page: 'scanbill' },
    { icon: Palette, label: 'Style Lab', page: 'stylelab' },
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

// Main StyleLabPage Component
function StyleLabPage() {
  const [goldCoins, setGoldCoins] = useState(150);
  const [selectedItems, setSelectedItems] = useState({
    cap: null,
    eyeMask: null,
    accessory: null,
    shirt: null
  });
  const [purchasedItems, setPurchasedItems] = useState(new Set());
  const [showDialog, setShowDialog] = useState(true);
  const [mascotMessage, setMascotMessage] = useState("Hey there! Style me up—I want to look fabulous! 💅");
  const [mascotVideo, setMascotVideo] = useState(shellyWaveVideo);
  const [initialDialogShown, setInitialDialogShown] = useState(false);
  const [dialogCloseTimer, setDialogCloseTimer] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const customizationItems = [
    // Ninja Masks
    {
      id: 'ninja-mask-blue',
      name: 'Ninja Turtle Mask',
      type: 'eyeMask',
      cost: 55,
      imageUrl: '/src/assets/ninja_turtle_eye_mask.png',
      fallbackColor: '#16a34a'
    },
    {
      id: 'ninja-mask-red',
      name: 'Eye Patch',
      type: 'eyeMask',
      cost: 40,
      imageUrl: "/src/assets/eye_patch.png",
      fallbackColor: '#ef4444'
    },
    {
      id: 'ninja-mask-green',
      name: 'Black Mask',
      type: 'eyeMask',
      cost: 50,
      imageUrl: "/src/assets/special_ninja_mask.png",
      fallbackColor: '#10b981'
    },
    // Caps
    {
      id: 'yellow-cap',
      name: 'Christmas Hat',
      type: 'cap',
      cost: 55,
      imageUrl: '/src/assets/christmas_hat.png',
      fallbackColor: '#eab308'
    },
    {
      id: 'purple-cap',
      name: 'Hat',
      type: 'cap',
      cost: 40,
      imageUrl: "/src/assets/purple_hat.png",
      fallbackColor: '#8b5cf6'
    },
    {
      id: 'green-cap',
      name: 'Cowboy hat',
      type: 'cap',
      cost: 45,
      imageUrl: "/src/assets/cowboy_hat.png",
      fallbackColor: '#22c55e'
    },
    // Accessories
    {
      id: 'sunglasses',
      name: 'Cool Sunglasses',
      type: 'accessory',
      cost: 35,
      imageUrl: "/src/assets/sunglasses.png",
      fallbackColor: '#1f2937'
    },
    {
      id: 'bow-tie',
      name: 'Fancy Bow Tie',
      type: 'accessory',
      cost: 28,
      imageUrl: "/src/assets/bow_tie.png",
      fallbackColor: '#dc2626'
    },
    {
      id: 'necklace',
      name: 'Gold Necklace',
      type: 'accessory',
      cost: 65,
      imageUrl: "/src/assets/necklace.png",
      fallbackColor: '#f59e0b'
    },
    {
      id: 'watch',
      name: 'Smart Watch',
      type: 'accessory',
      cost: 80,
      imageUrl: "/src/assets/smart_watch.png",
      fallbackColor: '#374151'
    },
    // Shirts
    {
      id: 'stripe-shirt',
      name: 'Stripe Shirt',
      type: 'shirt',
      cost: 50,
      imageUrl: "/src/assets/stripe_shirt.png",
      fallbackColor: '#3b82f6'
    },
    {
      id: 'polo-shirt',
      name: 'Polo Shirt',
      type: 'shirt',
      cost: 45,
      imageUrl: "/src/assets/polo_shirt.png",
      fallbackColor: '#10b981'
    },
    {
      id: 'tank-top',
      name: 'Tank Top',
      type: 'shirt',
      cost: 35,
      imageUrl: "/src/assets/tank_top.png",
      fallbackColor: '#ef4444'
    },
    {
      id: 'hoodie',
      name: 'Cool Hoodie',
      type: 'shirt',
      cost: 70,
      imageUrl: "/src/assets/hoodie.png",
      fallbackColor: '#6b7280'
    }
  ];

  const stylingTips = [
    "Let's try the cowboy hat—it's wild west vibes! 🤠",
    "Sunglasses make everything cooler 😎",
    "Dress me in something festive! 🎉",
    "Mix and match accessories! 🎨",
    "I love hoodies, they are super comfy! 🧥"
  ];

  const showMessageWithTimeout = (message, delay = 3000, onCompleteMessage = null) => {
    setMascotMessage(message);
    setShowDialog(true);

    if (onCompleteMessage) {
      setTimeout(() => {
        setMascotMessage(onCompleteMessage);
      }, delay);
    }
  };

  const startDialogCycle = () => {
    if (dialogCloseTimer) clearTimeout(dialogCloseTimer);

    const timeout = setTimeout(() => {
      const randomTip = stylingTips[Math.floor(Math.random() * stylingTips.length)];
      setMascotMessage(randomTip);
      setShowDialog(true);
    }, 7000);

    setDialogCloseTimer(timeout);
  };

  const handleEquipItem = (item) => {
    setSelectedItems(prev => ({
      ...prev,
      [item.type]: item.id
    }));
    setMascotVideo(shellyWaveVideo);
    showMessageWithTimeout(`Ooooh! This ${item.name} looks awesome on me! 💅`);
  };

  const handleUnequipItem = (item) => {
    setSelectedItems(prev => ({
      ...prev,
      [item.type]: null
    }));
    showMessageWithTimeout(
      "Oh no! Don't leave me plain... dress me up again! 😭",
      5000,
      stylingTips[Math.floor(Math.random() * stylingTips.length)]
    );
    startDialogCycle();
  };

  const handleBuyItem = (item, event) => {
    event.stopPropagation();
    if (!purchasedItems.has(item.id) && goldCoins >= item.cost) {
      setGoldCoins(prev => prev - item.cost);
      setPurchasedItems(prev => new Set([...prev, item.id]));

      setMascotVideo(shellyCelebrateVideo);
      showMessageWithTimeout(
        `Wooohoo! Thanks for buying the ${item.name} for me! 🛍️🥰`,
        5000,
        stylingTips[Math.floor(Math.random() * stylingTips.length)]
      );
      startDialogCycle();
      setTimeout(() => {
        setMascotVideo(shellyWaveVideo);
      }, 100);
    }
  };

  const isItemEquipped = (itemId) => {
    return Object.values(selectedItems).includes(itemId);
  };

  const getItemsByType = (type) => {
    return customizationItems.filter(item => item.type === type);
  };

  const getSectionTitle = (type) => {
    const titles = {
      cap: 'Caps & Hats',
      eyeMask: 'Ninja Masks',
      accessory: 'Accessories',
      shirt: 'Shirts & Clothing'
    };
    return titles[type] || type;
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    console.log('Logo clicked - navigate to home');
  };

  const handleSignOut = () => {
    setShowSignOutModal(true);
    setIsMenuOpen(false);
  };

  const handleConfirmSignOut = () => {
    setShowSignOutModal(false);
    console.log('User signed out');
  };

  const handleMenuNavigate = (page) => {
    console.log('Navigate to:', page);
  };

  // Initial dialog popup
  useEffect(() => {
    if (!initialDialogShown) {
      setShowDialog(true);
      setMascotMessage("Hey there! Style me up—I want to look fabulous! 💅");
      setInitialDialogShown(true);
      startDialogCycle();
      setTimeout(() => {
        const randomTip = stylingTips[Math.floor(Math.random() * stylingTips.length)];
        setMascotMessage(randomTip);
      }, 5000);
    }
  }, [initialDialogShown]);

  useEffect(() => {
    if (!initialDialogShown) return;

    const interval = setInterval(() => {
      if (!showDialog) {
        const randomTip = stylingTips[Math.floor(Math.random() * stylingTips.length)];
        setMascotMessage(randomTip);
        startDialogCycle();
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [initialDialogShown, showDialog]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (dialogCloseTimer) clearTimeout(dialogCloseTimer);
    };
  }, [dialogCloseTimer]);

  return (
    <div style={styles.mobileFrame}>
      <TopNavigation 
        onMenuToggle={handleMenuToggle}
        onLogoClick={handleLogoClick}
        currentPage="stylelab"
      />
      
      <div style={mstyles.mainContent}>
        {/* Gold Coins Display */}
        <div style={mstyles.goldCoinContainer}>
          <div style={mstyles.walmartCoin}>
            <span style={mstyles.coinSpark}>✨</span>
            <span style={mstyles.coinText}>W</span>
          </div>
          <span style={mstyles.goldCoinText}>{goldCoins}</span>
        </div>

        {/* Mascot Area */}
        <div style={mstyles.mascotArea}>
          <div style={mstyles.mascotContainer}>
            <video 
              key={mascotVideo}
              src={mascotVideo}
              autoPlay 
              loop 
              muted 
              playsInline
              style={mstyles.mascotVideo}
            />
            
            {/* Dialog Box */}
            {showDialog && (
              <div style={mstyles.dialogBox}>
                <div style={mstyles.dialogHeader}>
                  <span style={mstyles.dialogTitle}>Shelly 🐢</span>
                  <button 
                    style={mstyles.dialogCloseButton}
                    onClick={() => setShowDialog(false)}
                  >
                    ✕
                  </button>
                </div>
                <div style={mstyles.dialogBody}>
                  <p style={mstyles.dialogText}>{mascotMessage}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Items Palette */}
        <div style={mstyles.itemsPalette}>
          <div style={mstyles.paletteTitle}>
            <Palette size={20} color="#285c97" />
            <span style={mstyles.titleText}>Style Lab</span>
          </div>
          
          <div style={mstyles.paletteContainer}>
            {['cap', 'eyeMask', 'accessory', 'shirt'].map(type => (
              <div key={type} style={mstyles.itemSection}>
                <div style={mstyles.sectionTitle}>{getSectionTitle(type)}</div>
                <div style={mstyles.itemsGrid}>
                  {getItemsByType(type).map(item => {
                    const isPurchased = purchasedItems.has(item.id);
                    const isEquipped = isItemEquipped(item.id);
                    const canAfford = goldCoins >= item.cost;
                    
                    return (
                      <div
                        key={item.id}
                        style={{
                          ...mstyles.itemButton,
                          ...(isEquipped ? mstyles.selectedItem : {}),
                          ...(!isPurchased && !canAfford ? mstyles.disabledItem : {})
                        }}
                        onClick={() => {
                          if (isPurchased && !isEquipped) {
                            handleEquipItem(item);
                          }
                        }}
                      >
                        {/* Equipped Badge */}
                        {isEquipped && (
                          <div style={mstyles.equippedBadge}>
                            <span style={mstyles.equippedText}>EQUIPPED</span>
                          </div>
                        )}
                        
                        {/* Item Icon */}
                        <div style={mstyles.itemIconContainer}>
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            style={mstyles.itemImage}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div 
                            style={{
                              ...mstyles.itemIcon,
                              backgroundColor: item.fallbackColor,
                              display: 'none'
                            }}
                          >
                            {item.type === 'cap' && '🎩'}
                            {item.type === 'eyeMask' && '🥷'}
                            {item.type === 'accessory' && '👓'}
                            {item.type === 'shirt' && '👕'}
                          </div>
                        </div>
                        
                        {/* Item Name */}
                        <span style={mstyles.itemName}>{item.name}</span>
                        
                        {/* Cost */}
                        <div style={mstyles.itemCost}>
                          <div style={mstyles.miniCoin}>W</div>
                          <span>{item.cost}</span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div style={mstyles.actionButtons}>
                          {isPurchased ? (
                            <>
                              {!isEquipped ? (
                                <button 
                                  style={mstyles.equipButton}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipItem(item);
                                  }}
                                >
                                  <span style={mstyles.equipText}>EQUIP</span>
                                </button>
                              ) : (
                                <button 
                                  style={mstyles.unequipButton}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUnequipItem(item);
                                  }}
                                >
                                  <span style={mstyles.unequipText}>UNEQUIP</span>
                                </button>
                              )}
                            </>
                          ) : (
                            <button 
                              style={{
                                ...mstyles.buyButton,
                                ...(canAfford ? {} : { opacity: 0.5, cursor: 'not-allowed' })
                              }}
                              onClick={(e) => handleBuyItem(item, e)}
                              disabled={!canAfford}
                            >
                              <Coins size={12} color="white" />
                              <span style={mstyles.buyText}>BUY</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMenuNavigate}
        onSignOut={handleSignOut}
      />

      {/* Sign Out Confirmation Modal */}
      <ConfirmationModal 
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleConfirmSignOut}
      />
    </div>
  );
}

// Styles
const styles = {
  mobileFrame: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRadius: '0px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 1, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  },
  contentArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffffff'
  }
};

const mstyles = {
  goldCoinContainer: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(209, 226, 249, 0.75)',
    padding: '6px 12px',
    borderRadius: '20px',
    zIndex: 10
  },
  walmartCoin: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#ffc220',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#0071ce',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  coinSpark: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    fontSize: '8px'
  },
  coinText: {
    fontSize: '10px',
    fontWeight: 'bold'
  },
  goldCoinText: {
    color: 'blue',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  mascotArea: {
    height: '250px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: '#FFFFFF',
    flexShrink: 0
  },
  mascotContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mascotVideo: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    objectFit: 'contain',
    marginLeft: '-170px',
  },
  dialogBox: {
    position: 'absolute',
    bottom: '30px',
    left: '150px',
    width: '170px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    zIndex: 10
  },
  dialogHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dialogTitle: {
    fontWeight: 'bold',
    color: '#0071ce',
    fontSize: '13px'
  },
  dialogCloseButton: {
    backgroundColor: 'rgb(247, 113, 113)',
    color: 'white',
    border: 'none',
    borderRadius: '150px',
    fontSize: '10px',
    width: '1px',
    cursor: 'pointer',
    position: 'relative',
    marginTop: '-23px',
    marginRight: '-23px'
  },
  dialogBody: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#334155'
  },
  dialogText: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.4'
  },
  dialogIcon: {
    fontSize: '18px'
  },
  itemsPalette: {
    flex: 1, // Take remaining space
    background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 50%)',
    borderTopLeftRadius: '25px',
    borderTopRightRadius: '25px',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 -6px 25px rgba(0,0,0,0.15)',
    padding: '0px 15px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0 // Allow flex shrinking
  },
  paletteContainer: {
    flex: 1, // Take remaining space in palette
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#cbd5e1 transparent',
    paddingBottom: '90px' // Add some bottom padding
  },
  paletteTitle: {
    fontSize: '18px',
    fontWeight: '550',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    flexShrink: 0 // Don't shrink the title
  },
  itemIconContainer: {
    width: '55px',
    height: '55px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f8fafc'
  },
  itemImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2
  },
  titleText: {
    color: 'rgb(40 92 151)',
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '0.5px',
    textShadow: 'rgba(255, 215, 0, 0.3) -1px 2px 3px'
  },
  itemSection: {
    marginBottom: '25px',
    flexShrink: 0 // Don't shrink sections
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#334155',
    marginBottom: '15px',
    paddingLeft: '5px'
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  itemsRow: {
    display: 'flex'
  },
  itemButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 8px',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    gap: '6px',
    minHeight: '120px', // Slightly increased for better spacing
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transform: 'translateY(0)'
  },
  actionButtons: {
    display: 'flex',
    gap: '4px',
    marginTop: '4px'
  },
  equipButton: {
    backgroundColor: '#10b981',
    border: 'none',
    borderRadius: '12px',
    padding: '0px 10px 6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  equipText: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'white'
  },
  unequipButton: {
    backgroundColor: '#ef4444',
    border: 'none',
    borderRadius: '12px',
    padding: '0px 10px 6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  unequipText: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'white'
  },
  selectedItem: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    transform: 'translateY(-2px)'
  },
  disabledItem: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  itemIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    marginBottom: '4px'
  },
  itemName: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    lineHeight: '1.2'
  },
  itemCost: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#0071ce',
    marginTop: '4px'
  },
  miniCoin: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: '#ffc220',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    fontWeight: 'bold',
    color: '#0071ce',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  equippedBadge: {
    position: 'absolute',
    top: '6px',
    left: '6px',
    backgroundColor: '#10b981',
    borderRadius: '8px',
    padding: '2px 6px',
    fontSize: '8px',
    fontWeight: 'bold',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  equippedText: {
    fontSize: '8px',
    fontWeight: 'bold'
  },
  sellButton: {
    position: 'absolute',
    bottom: '6px',
    right: '6px',
    backgroundColor: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    padding: '4px 6px',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  sellText: {
    fontSize: '8px',
    fontWeight: 'bold',
    color: 'white'
  },
  unpurchasedItem: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    cursor: 'default'
  },
  buyButton: {
    backgroundColor: '#0071ce',
    border: 'none',
    borderRadius: '12px',
    padding: '6px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  buyText: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'white'
  }
};

export default StyleLabPage;
