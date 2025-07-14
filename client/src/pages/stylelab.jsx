import React, { useState, useEffect } from 'react';
import { Menu, Search, Mic, Keyboard, Home, User, Settings, ScanLine, Leaf, Send, Coins, DollarSign, Receipt, HelpCircle, QrCode, Palette, Tag, Gift } from 'lucide-react';

import walmartLogo from '../assets/walmart_logo.png';
import shellyWaveVideo from '../assets/shelly_wave.webm';
import shellyWave from '../assets/shelly_wave.webm';
import shellyHatWave from '../assets/shelly_hat_wave.webm';
import shellyHatMaskWave from '../assets/shelly_hat_mask_waving.webm';
import shellyHat from '../assets/shelly_hat_wave.webm';
import '../index.css';



const HamburgerMenu = ({ isOpen, onClose, onNavigate, onSignOut }) => {
  if (!isOpen) return null;
  
  const menuItems = [
    { icon: Settings, label: 'Language | English', page: 'language' },
    { icon: null, label: 'Walmart+', page: 'walmart-plus', isWalmart: true },
    { icon: User, label: 'Account', page: 'account' },
    { icon: Receipt, label: 'Purchase History', page: 'purchase-history' },
    { icon: HelpCircle, label: 'Help', page: 'help' },
    { icon: QrCode, label: 'Upload Bill', page: 'scanbill' },
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
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 50
        }}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '80%',
        maxWidth: '288px',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 51,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        {/* Menu Header */}
        <div style={{
          padding: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: 'white',
          paddingTop: '24px'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <walmartLogo size={32} />
          </div>
          <button 
            onClick={onSignOut}
            style={{
              width: '100%',
              padding: '8px 16px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Signout
          </button>
        </div>
        
        {/* Menu Items */}
        <div style={{ flex: 1, paddingTop: '4px' }}>
          {menuItems.map((item, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid #f3f4f6',
                transition: 'background-color 0.2s'
              }}
              onClick={() => handleItemClick(item.page)}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {item.isWalmart ? (
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  width: '16px',
                  textAlign: 'center'
                }}>
                  W+
                </div>
              ) : item.icon ? (
                <item.icon size={16} color="#666" />
              ) : null}
              <span style={{
                marginLeft: '12px',
                fontSize: '14px',
                color: '#374151',
                flex: 1
              }}>
                {item.label}
              </span>
              <span style={{
                fontSize: '18px',
                color: '#9ca3af',
                marginLeft: 'auto'
              }}>
                ›
              </span>
            </div>
          ))}
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '32px',
            paddingBottom: '32px'
          }}>
            <button 
              style={{
                width: '60%',
                padding: '6px 16px',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #4ade80, #22c55e, #319d55)',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)',
                transition: 'all 0.3s ease-in-out',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => handleItemClick('leaderboard')}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
// Top Navigation Component
const TopNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('style-lab');

  const handleLogoClick = () => {
    alert('Walmart logo clicked!');
  };

  const handleScanClick = () => {
    alert('Scan to search clicked!');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    alert(`Navigating to ${page}`);
  };

  const handleSignOut = () => {
    alert('Signing out...');
  };

  const [goldCoins, setGoldCoins] = useState(150);
  const [selectedItems, setSelectedItems] = useState({
    cap: null,
    eyeMask: null,
    accessory: null,
    shirt: null
  });
  const [purchasedItems, setPurchasedItems] = useState(new Set());

  const customizationItems = [
    // Ninja Masks
    {
      id: 'ninja--mask-blue',
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
      imageUrl: "/src/assets/eye_patch.png", // Add proper image path
      fallbackColor: '#ef4444'
    },
    {
      id: 'ninja-mask-green',
      name: 'Black Mask',
      type: 'eyeMask',
      cost: 50,
      imageUrl: "/src/assets/special_ninja_mask.png", // Add proper image path
      fallbackColor: '#10b981'
    },
    // Caps
    {
      id: 'yello-cap',
      name: 'Chritmas Hat',
      type: 'cap',
      cost: 55,
      imageUrl: '/src/assets/santa_hat.png',
      fallbackColor: '#16a34a'
    },
    {
      id: 'purple-cap',
      name: 'Hat',
      type: 'cap',
      cost: 40,
      imageUrl: "/src/assets/purple_hat.png", // Add proper image path
      fallbackColor: '#8b5cf6'
    },
    {
      id: 'green-cap',
      name: 'Cowboy hat',
      type: 'cap',
      cost: 45,
      imageUrl: "/src/assets/cowboy_hat.png", // Add proper image path
      fallbackColor: '#22c55e'
    },
    // Accessories
    {
      id: 'sunglasses',
      name: 'Cool Sunglasses',
      type: 'accessory',
      cost: 35,
      imageUrl: "/src/assets/sunglasses.png", // Add proper image path
      fallbackColor: '#1f2937'
    },
    {
      id: 'bow-tie',
      name: 'Fancy Bow Tie',
      type: 'accessory',
      cost: 28,
      imageUrl: "/src/assets/bow_tie.png", // Add proper image path
      fallbackColor: '#dc2626'
    },
    {
      id: 'necklace',
      name: 'Gold Necklace',
      type: 'accessory',
      cost: 65,
      imageUrl: "/src/assets/necklace.png", // Add proper image path
      fallbackColor: '#f59e0b'
    },
    {
      id: 'watch',
      name: 'Smart Watch',
      type: 'accessory',
      cost: 80,
      imageUrl: "/src/assets/smart_watch.png", // Add proper image path
      fallbackColor: '#374151'
    },
    // Shirts
    {
      id: 'stripe-shirt',
      name: 'Stripe Shirt',
      type: 'shirt',
      cost: 50,
      imageUrl: "/src/assets/stripe_shirt.png", // Add proper image path
      fallbackColor: '#3b82f6'
    },
    {
      id: 'polo-shirt',
      name: 'Polo Shirt',
      type: 'shirt',
      cost: 45,
      imageUrl: "/src/assets/polo_shirt.png", // Add proper image path
      fallbackColor: '#10b981'
    },
    {
      id: 'tank-top',
      name: 'Tank Top',
      type: 'shirt',
      cost: 35,
      imageUrl: "/src/assets/tank_top.png", // Add proper image path
      fallbackColor: '#ef4444'
    },
    {
      id: 'hoodie',
      name: 'Cool Hoodie',
      type: 'shirt',
      cost: 70,
      imageUrl: "/src/assets/hoodie.png", // Add proper image path
      fallbackColor: '#6b7280'
    }
  ];

  const handleEquipItem = (item) => {
    const newSelection = {
      ...selectedItems,
      [item.type]: item.id
    };

    const transitionVideo = getTransitionVideo(selectedItems, newSelection);
    setSelectedItems(newSelection);
    setMascotVideo(transitionVideo);
    showMessageWithTimeout(`Ooooh! This ${item.name} looks awesome on me! 💅`);
  };

  const handleUnequipItem = (item) => {
    const newSelection = {
      ...selectedItems,
      [item.type]: null
    };

    const transitionVideo = getTransitionVideo(selectedItems, newSelection);
    setSelectedItems(newSelection);
    setMascotVideo(transitionVideo);
    showMessageWithTimeout("Oh no! Don’t leave me plain... dress me up again! 😭");
    startDialogCycle();
  };

  const handleBuyItem = (item, event) => {
    event.stopPropagation();
    if (!purchasedItems.has(item.id) && goldCoins >= item.cost) {
      setGoldCoins(prev => prev - item.cost);
      setPurchasedItems(prev => new Set([...prev, item.id]));

      // Happy animation
      setMascotVideo(shellyWaveVideo);
      showMessageWithTimeout(
        `Wooohoo! Thanks for buying the ${item.name} for me! 🛍️🥰`,
        5000,
        stylingTips[Math.floor(Math.random() * stylingTips.length)]
      );
      startDialogCycle();
      setTimeout(() => {
        setMascotVideo(shellyWaveVideo);
      }, 10);
    }
  };

  const isItemEquipped = (itemId) => {
    return Object.values(selectedItems).includes(itemId);
  };

  const getTransitionVideo = (prevState, newState) => {
    const hadHat = prevState.cap !== null;
    const hadMask = prevState.eyeMask !== null;
    const hasHat = newState.cap !== null;
    const hasMask = newState.eyeMask !== null;

    // Equipping hat
    if (!hadHat && hasHat && !hasMask) return shellyHatWave;
    
    // Equipping mask (when hat already equipped)
    if (hadHat && !hadMask && hasMask) return shellyHatMaskWave;

    // Unequipping mask (hat still equipped)
    if (hadHat && hadMask && !hasMask) return shellyHat;

    // Unequipping hat (mask already removed)
    if (hadHat && !hasMask && !hasHat) return shellyWave;

    return shellyWave;
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

  const startDialogCycle = () => {
    if (dialogCloseTimer) clearTimeout(dialogCloseTimer);

    const timeout = setTimeout(() => {
      const randomTip = stylingTips[Math.floor(Math.random() * stylingTips.length)];
      setMascotMessage(randomTip);
      setShowDialog(true);
    }, 5000); // ⏱️ wait 7 seconds

    setDialogCloseTimer(timeout);
  };

  const [showDialog, setShowDialog] = useState(true);
  const [mascotMessage, setMascotMessage] = useState("Hey there! Style me up—I want to look fabulous! 💅");
  const [mascotVideo, setMascotVideo] = useState(shellyWaveVideo);
  const [initialDialogShown, setInitialDialogShown] = useState(false);
  const [dialogCloseTimer, setDialogCloseTimer] = useState(null);

  const stylingTips = [
    "Let's try the cowboy hat—it’s wild west vibes! 🤠",
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
      }, 5000); // Wait 5 sec before showing next tip
    }
  }, [initialDialogShown]);

  useEffect(() => {
    if (!initialDialogShown) return;

    const interval = setInterval(() => {
      // Only update tips if dialog is currently closed
      if (!showDialog) {
        const randomTip = stylingTips[Math.floor(Math.random() * stylingTips.length)];
        setMascotMessage(randomTip);
       startDialogCycle(); // Re-open with new tip
      }
    }, 7000); // every 7 seconds

    return () => clearInterval(interval);
  }, [initialDialogShown, showDialog]);

  return (
    <>
    <div style={topNavStyles.topNavBar}>
      <button style={topNavStyles.hamburgerButton} onClick={handleMenuToggle}>
        <Menu size={36} color="white" />
      </button>

      {/*walmart logo button*/}
      <button style={topNavStyles.logoButton} onClick={handleLogoClick}>
        <div style={topNavStyles.logoContainer}>
          <img src={walmartLogo} alt="Walmart Logo" style={topNavStyles.logoImage} />
        </div>
      </button>

      {/*scan/search button*/}
      <button style={topNavStyles.searchButton} onClick={handleScanClick}>
        <div style={topNavStyles.searchContainer}>
          <span style={topNavStyles.searchText}>Scan to search</span>
          <ScanLine size={18} color="#666" />
        </div>
      </button>
      
      {/*green score*/}
      <div style={topNavStyles.scoreContainer}>
        <div style={topNavStyles.scoreCircle}>
          <div style={topNavStyles.scoreInnerCircle}>
            <span style={topNavStyles.scoreNumber}>82</span>
          </div>
          <div style={topNavStyles.scoreLeaf}>
            <Leaf size={16} color="#15803d" fill="#84cc16" />
          </div>
        </div>
        <span style={topNavStyles.scoreLabel}>Green score</span>
      </div>
    </div>
    <HamburgerMenu 
      isOpen={isMenuOpen}
      onClose={handleMenuClose}
      onNavigate={handleNavigate}
      onSignOut={handleSignOut}
    />
    <div style={mstyles.mainContent}>
      {/* Combined Gold Coin and Mascot Container */}
      <div style={mstyles.mascotArea}>
        {/* Gold coin container positioned at top right */}
        <div style={mstyles.goldCoinContainer}>
          <div style={mstyles.walmartCoin}>
            <span style={mstyles.coinSpark}>✨</span>
            <span style={mstyles.coinText}>W</span>
          </div>
          <span style={mstyles.goldCoinText}>{goldCoins}</span>
        </div>
          {/* Replace mascot div with video */}
          <div style={mstyles.mascotContainer} onClick={() => setShowDialog(true)}>
            <video
              src={mascotVideo}
              autoPlay
              loop
              muted
              style={mstyles.mascotVideo}
            />
          </div>
          {showDialog && (
            <div style={mstyles.dialogBox}>
              <div style={mstyles.dialogHeader}>
                <span style={mstyles.greenDot}></span>
                <span style={mstyles.dialogTitle}>SHELLY SAYS</span>
                <button
                  onClick={() => {
                    setShowDialog(false);

                    if (dialogCloseTimer) clearTimeout(dialogCloseTimer);

                    const timeout = setTimeout(() => {
                      const randomTip = stylingTips[Math.floor(Math.random() * stylingTips.length)];
                      setMascotMessage(randomTip);
                      setShowDialog(true);
                    }, 7000); // ⏱️ wait 7 sec before showing again
                    setDialogCloseTimer(timeout);
                  }}
                  style={mstyles.dialogCloseButton}
                >x</button>
              </div>

              <div style={mstyles.dialogBody}>
                <p style={mstyles.dialogText}>{mascotMessage}</p>
              </div>
            </div>
          )}
        </div>
      {/* Items Palette */}
        <div style={mstyles.itemsPalette}>
            <h2 style={mstyles.paletteTitle}>
              <span style={mstyles.titleText}><b>Style Shelly!</b></span>
            </h2>
          <div style={mstyles.paletteContainer}>
            
            {/* Dynamic sections for each item type */}
            {['cap', 'eyeMask', 'accessory', 'shirt'].map(itemType => (
              <div key={itemType} style={mstyles.itemSection}>
                <h3 style={mstyles.sectionTitle}>{getSectionTitle(itemType)}</h3>
                <div style={mstyles.itemsGrid}>
                  {getItemsByType(itemType).map(item => (
                    <button
                      key={item.id}
                      style={{
                        ...mstyles.itemButton,
                        ...(isItemEquipped(item.id) ? mstyles.selectedItem : {}),
                        ...(purchasedItems.has(item.id) ? {} : mstyles.unpurchasedItem)
                      }}
                    >
                      {/* Fixed image container with consistent sizing */}
                        <div style={mstyles.itemIconContainer}>
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            style={mstyles.itemImage}
                            onLoad={(e) => {
                              // Hide fallback when image loads successfully
                              if (e.target.nextSibling) {
                                e.target.nextSibling.style.display = 'none';
                              }
                            }}
                            onError={(e) => {
                              // Hide broken image and show fallback
                              e.target.style.display = 'none';
                              if (e.target.nextSibling) {
                                e.target.nextSibling.style.display = 'flex';
                              }
                            }}
                          />
                          {/* Fallback colv - always present but hidden when image loads */}
                          <div style={{
                            backgroundColor: item.fallbackColor,
                            display: 'flex' // Initially visible, hidden when image loads
                          }}>
                              <img
                              src={item.imageUrl}
                              alt={item.name}
                              style={mstyles.itemImage}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        </div>
                        
                        <span style={mstyles.itemName}>{item.name}</span>
                        
                        {/* Rest of your button content remains the same */}
                        {!purchasedItems.has(item.id) ? (
                          <button
                            style={mstyles.buyButton}
                            onClick={(e) => handleBuyItem(item, e)}
                            disabled={goldCoins < item.cost}
                          >
                            <div style={mstyles.miniCoin}>W</div>
                            <span style={mstyles.buyText}>Buy {item.cost}</span>
                          </button>
                        ) : (
                          <div style={mstyles.actionButtons}>
                            {!isItemEquipped(item.id) ? (
                              <button
                                style={mstyles.equipButton}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEquipItem(item);
                                  setMascotMessage(`Ooooh, this ${item.name.toLowerCase()} looks amazing on me! 💃✨`);
                                  setShowDialog(true);
                                }}
                              >
                                <span style={mstyles.equipText}>Equip</span>
                              </button>
                            ) : (
                              <button
                                style={mstyles.unequipButton}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUnequipItem(item);
                                  setMascotMessage("Aww... would you get me another outfit please? 🥺");
                                  setShowDialog(true);
                                }}
                              >
                                <span style={mstyles.unequipText}>Unequip</span>
                              </button>
                            )}
                          </div>
                        )}
      
                      {isItemEquipped(item.id) && (
                        <div style={mstyles.equippedBadge}>
                          <span style={mstyles.equippedText}>E</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


function StyleLabPage() {
  return (
     <div style={styles.mobileFrame}>
       <TopNavigation />
     </div>
 );
}

// Top Navigation Styles
const topNavStyles = {
  topNavBar: {
    backgroundColor: '#0071ce',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
    paddingTop: '10px'
  },
  hamburgerButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '52px',
    height: '52px',
    outline: 'none',
    boxShadow: 'none'
  },
  logoButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    boxShadow: 'none'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '70px',
    height: '70px'
  },
  logoImage: {
    height: '70px',
    width: '70px',
    objectFit: 'contain',
    marginLeft: '0px',
    marginRight: '4px'
  },
  searchButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    borderRadius: '20px',
    transition: 'background-color 0.2s',
    outline: 'none',
    boxShadow: 'none'
  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4px',
    flex: 1,
    maxWidth: '140px',
    marginLeft: '0px',
    marginRight: '15px'
  },
  searchText: {
    fontSize: '12px',
    color: '#666',
    flex: 1,
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500'
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    minWidth: '70px',
    height: '60px',
    justifyContent: 'center',
    position: 'relative'
  },
  scoreCircle: {
    width: '35px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#0071ce',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: `conic-gradient(from 0deg, #4ade80 0deg, #4ade80 140deg, transparent 140deg, transparent 220deg, #16a34a 220deg, #16a34a 360deg)`,
    padding: '6px'
  },
  scoreInnerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#0071ce',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  scoreNumber: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '1'
  },
  scoreLeaf: {
    position: 'absolute',
    bottom: '-3px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreLabel: {
    color: 'white',
    fontSize: '8px'
  }
};

// main Styles
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
    minHeight: 0 // Allow flex shrinking
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
    borderRadius: '20px'
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
    minHeight: '100vh' // Ensure it takes full viewport height
  },
  mascotArea: {
    height: '250px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: '#FFFFFF',
    flexShrink: 0 // Prevent shrinking
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
    left: '190px',
    width: '170px',
    backgroundColor: '#dbeafe7f',
    borderRadius: '20px',
    boxShadow: '0 7px 20px rgba(0, 0, 0, 0.5)',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
    border: '2px solid rgb(59, 130, 246, 0.4)'
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
    width: '15px',
    cursor: 'pointer',
    position: 'relative',
    marginTop: '-40px',
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