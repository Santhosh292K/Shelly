import React, { useState, useEffect } from 'react';
import { Camera, Scan, ShoppingCart, Calendar, DollarSign, Store, Trash2, Eye, X, Plus, Receipt, ChevronRight } from 'lucide-react';

const ScanBill = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [scanResult, setScanResult] = useState('');

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
      discount: 5.00
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
      discount: 2.50
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
      discount: 8.00
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bill Scanner
              </h1>
              <p className="text-gray-600 text-xs mt-1">Scan & organize your receipts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
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
                            ${bill.discount.toFixed(2)} saved
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            Tax: ${bill.tax.toFixed(2)}
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
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{item.name}</div>
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
    </div>
  );
};

export default ScanBill; 