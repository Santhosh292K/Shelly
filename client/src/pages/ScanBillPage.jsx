import React, { useState, useEffect } from 'react';
import { Camera, Scan, ShoppingCart, Calendar, DollarSign, Store, Trash2, Eye, X, Plus, Receipt, ChevronRight, ArrowLeft } from 'lucide-react';
import shelly_wave from '../assets/shelly_wave.webm';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';

const ScanBill = () => {

  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [scanResult, setScanResult] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('default');
  const [showMessage, setShowMessage] = useState(true);
  const [messageContent, setMessageContent] = useState({
    text: "Let's calc ur green score, Upload ur bill!",
    type: 'welcome'
  });
  const [justScanned, setJustScanned] = useState(false);

  // Sample QR data for demonstration
  const sampleQRData = [
    {
      id: 'BILL001',
      storeName: 'MegaMart',
      date: '2024-07-11',
      total: 156.78,
      items: [
        { name: 'Milk 1L', price: 3.99, qty: 2 },
        { name: 'Bread Loaf', price: 2.49, qty: 1 },
        { name: 'Apples 1kg', price: 4.99, qty: 3 },
        { name: 'Chicken Breast', price: 12.99, qty: 1 }
      ],
      tax: 12.46,
      discount: 5.00,
      greenScore: 7.5,
      ecoFriendlyItems: ['Apples 1kg'],
      suggestions: ['Try organic alternatives', 'Reduce meat consumption']
    },
    {
      id: 'BILL002',
      storeName: 'FreshMart',
      date: '2024-07-10',
      total: 89.32,
      items: [
        { name: 'Orange Juice', price: 4.99, qty: 2 },
        { name: 'Yogurt Pack', price: 6.99, qty: 1 },
        { name: 'Bananas 1kg', price: 2.99, qty: 4 },
        { name: 'Cereal Box', price: 8.99, qty: 2 }
      ],
      tax: 7.15,
      discount: 2.50,
      greenScore: 8.2,
      ecoFriendlyItems: ['Bananas 1kg', 'Yogurt Pack'],
      suggestions: ['Great choice on organic fruits!', 'Consider reusable packaging']
    },
    {
      id: 'BILL003',
      storeName: 'QuickShop',
      date: '2024-07-09',
      total: 234.56,
      items: [
        { name: 'Detergent', price: 15.99, qty: 1 },
        { name: 'Shampoo', price: 8.99, qty: 2 },
        { name: 'Pasta Pack', price: 3.99, qty: 3 },
        { name: 'Olive Oil', price: 12.99, qty: 1 },
        { name: 'Rice 5kg', price: 18.99, qty: 2 }
      ],
      tax: 18.77,
      discount: 8.00,
      greenScore: 6.8,
      ecoFriendlyItems: ['Olive Oil', 'Rice 5kg'],
      suggestions: ['Consider eco-friendly detergents', 'Buy in bulk to reduce packaging']
    }
  ];

  useEffect(() => {
    // Show welcome message when page loads
    setShowMessage(true);
    setMessageContent({
      text: "Let's calc ur green score, Upload ur bill!",
      type: 'welcome'
    });
  }, []);

  useEffect(() => {
    // Show comment message after scanning
    if (justScanned && bills.length > 0) {
      const latestBill = bills[bills.length - 1];
      const comments = generateGreenComment(latestBill);
      setMessageContent({
        text: comments,
        type: 'comment'
      });
      setShowMessage(true);
      setJustScanned(false);
    }
  }, [bills, justScanned]);

  const generateGreenComment = (bill) => {
    const score = bill.greenScore;
    if (score >= 8) {
      return `Awesome! 🌱 Your green score is ${score}/10. You're making great eco-friendly choices!`;
    } else if (score >= 6) {
      return `Good job! 🌿 Your green score is ${score}/10. Try more organic options to boost your score!`;
    } else {
      return `Your green score is ${score}/10. 🌱 Let's work on more sustainable choices together!`;
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setScanResult('');
    
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      const randomBill = sampleQRData[Math.floor(Math.random() * sampleQRData.length)];
      const qrData = JSON.stringify(randomBill);
      setScanResult(qrData);
      setIsScanning(false);
      
      // Add to bills if not already exists
      if (!bills.find(bill => bill.id === randomBill.id)) {
        setBills(prev => [...prev, randomBill]);
        setJustScanned(true);
      }
    }, 2000);
  };

  const deleteBill = (billId) => {
    setBills(prev => prev.filter(bill => bill.id !== billId));
  };

  const viewBill = (bill) => {
    setSelectedBill(bill);
  };

  const closeBillModal = () => {
    setSelectedBill(null);
  };

  const getTotalSpent = () => {
    return bills.reduce((total, bill) => total + bill.total, 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleScreenTap = () => {
    if (showMessage) {
      setShowMessage(false);
    }
  };

  const getVideoSource = () => {
    return shelly_wave;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Blur overlay when message is shown */}
      {showMessage && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={handleScreenTap}
        />
      )}

      {/* App Bar */}
      <div className={`bg-blue-600 text-white sticky top-0 z-50 shadow-lg transition-all duration-300 ${showMessage ? 'blur-sm' : ''}`}>
        <div className="px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={handleBackClick}
              className="p-2 -ml-2 mr-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Upload your bills</h1>
          </div>
        </div>
      </div>

      <div className={`px-4 pb-6 transition-all duration-300 ${showMessage ? 'blur-sm' : ''}`}>
        {/* Scanner Section */}
        <div className="mt-6 mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
            
            <div className="relative">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Quick Scan</h2>
                <p className="text-gray-600 text-sm">Point your camera at a QR code</p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
                    {isScanning && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                        <div className="absolute inset-4 border-2 border-blue-400 rounded-xl animate-ping"></div>
                      </>
                    )}
                    
                    {isScanning ? (
                      <div className="text-center z-10">
                        <Scan className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-bounce" />
                        <p className="text-blue-600 font-medium">Scanning...</p>
                        <div className="w-6 h-1 bg-blue-500 mx-auto mt-2 rounded-full animate-pulse"></div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 font-medium">Ready to scan</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Corner indicators */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-400 rounded-tl-lg"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-blue-400 rounded-tr-lg"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-blue-400 rounded-bl-lg"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-blue-400 rounded-br-lg"></div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={startScan}
                  disabled={isScanning}
                  className={`px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform ${
                    isScanning
                      ? 'bg-gray-400 cursor-not-allowed scale-95'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {isScanning ? (
                      <>
                        <Scan className="w-5 h-5 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Start Scan
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bills List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Receipt className="w-5 h-5 mr-2" />
              Recent Bills
            </h2>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {bills.length}
            </div>
          </div>
          
          {bills.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No bills yet</h3>
              <p className="text-gray-600 text-sm">Start scanning to organize your receipts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bills.map((bill) => (
                <div key={bill.id} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                            <Store className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{bill.storeName}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(bill.date)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-800">${bill.total.toFixed(2)}</div>
                          <div className="text-xs text-gray-500">{bill.items.length} items</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            🌱 {bill.greenScore}/10
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            ${bill.discount.toFixed(2)} saved
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => viewBill(bill)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBill(bill.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => viewBill(bill)}
                            className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bill Detail Modal */}
        {selectedBill && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
            <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg sm:w-full max-h-[90vh] overflow-hidden">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Bill Details</h3>
                <button
                  onClick={closeBillModal}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Green Score */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg text-gray-800">Green Score</h4>
                      <div className="text-2xl font-bold text-green-600">{selectedBill.greenScore}/10</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Eco-friendly items: {selectedBill.ecoFriendlyItems.join(', ')}
                    </div>
                    <div className="text-xs text-green-700 bg-green-100 rounded-lg px-3 py-2">
                      {selectedBill.suggestions.join(' • ')}
                    </div>
                  </div>

                  {/* Store Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                        <Store className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-800">{selectedBill.storeName}</h4>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm">{formatDate(selectedBill.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 bg-white/50 rounded-lg px-3 py-2">
                      Bill ID: {selectedBill.id}
                    </div>
                  </div>
                  
                  {/* Items */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Items ({selectedBill.items.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedBill.items.map((item, index) => (
                        <div key={index} className={`flex justify-between items-center p-3 rounded-xl ${
                          selectedBill.ecoFriendlyItems.includes(item.name) 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-gray-50'
                        }`}>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800 flex items-center">
                              {item.name}
                              {selectedBill.ecoFriendlyItems.includes(item.name) && (
                                <span className="ml-2 text-green-600">🌱</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} × {item.qty}
                            </div>
                          </div>
                          <div className="font-semibold text-gray-800">
                            ${(item.price * item.qty).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Summary */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${(selectedBill.total - selectedBill.tax + selectedBill.discount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${selectedBill.discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span>${selectedBill.tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-bold text-lg text-gray-800">
                          <span>Total</span>
                          <span>${selectedBill.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='relative z-50'>
        <Draggable axis='y'>
        <div>
          {/* Fixed Video Assistant in Bottom Right Corner */}
          <div className="fixed bottom-4 right-2 z-50">
            <div className="w-40 h-56 rounded-lg overflow-hidden">
              <video
                key={isRecording ? 'listening' : currentVideo}
                src={getVideoSource()}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Message Box */}
          {showMessage && (
            <div className="fixed bottom-24 right-40 z-50 max-w-xs">
              <div className="bg-white rounded-2xl shadow-xl p-4 relative border-2 border-blue-200">
                {/* Speech bubble tail */}
                <div className="absolute -right-2 bottom-8 w-0 h-0 border-l-8 border-l-white border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
                <div className="absolute -right-3 bottom-8 w-0 h-0 border-l-8 border-l-blue-200 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
                
                <div className="text-sm text-gray-800 font-medium leading-relaxed">
                  {messageContent.text}
                </div>
                
                {messageContent.type === 'welcome' && (
                  <div className="mt-2 text-xs text-blue-600 animate-pulse">
                    Tap anywhere to continue
                  </div>
                )}
                
                {messageContent.type === 'comment' && (
                  <div className="mt-2 text-xs text-green-600 animate-pulse">
                    Tap to dismiss
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Draggable>
      </div>
    </div>
  );
};

export default ScanBill;