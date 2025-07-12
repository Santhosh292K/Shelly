import React, { useState, useRef, useEffect } from 'react';
import { Camera, Leaf, ShoppingCart, AlertCircle, Recycle, TrendingDown, Star, Receipt } from 'lucide-react';

const ScanProduct = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentProducts, setRecentProducts] = useState([]);
  const [scanningStatus, setScanningStatus] = useState('Looking for barcode...');
  const [cameraReady, setCameraReady] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanningIntervalRef = useRef(null);

  // Mock product database with carbon footprint data
  const mockProducts = {
    '8901030895172': {
      name: 'Coca-Cola Classic 330ml',
      brand: 'Coca-Cola',
      category: 'Beverages',
      price: '$1.99',
      image: 'https://via.placeholder.com/150x200/ff0000/ffffff?text=Coca-Cola',
      carbonFootprint: {
        value: 0.33,
        unit: 'kg CO2e',
        rating: 'High',
        color: 'text-red-500'
      },
      ingredients: ['Carbonated Water', 'High Fructose Corn Syrup', 'Caramel Color', 'Phosphoric Acid', 'Natural Flavors', 'Caffeine'],
      greenAlternatives: [
        {
          name: 'Organic Sparkling Water',
          brand: 'San Pellegrino',
          carbonFootprint: 0.08,
          price: '$1.49',
          reason: '75% less carbon footprint'
        },
        {
          name: 'Kombucha Original',
          brand: 'GT\'s Living Foods',
          carbonFootprint: 0.12,
          price: '$2.99',
          reason: 'Organic & probiotic benefits'
        },
        {
          name: 'Coconut Water',
          brand: 'Vita Coco',
          carbonFootprint: 0.15,
          price: '$2.49',
          reason: 'Natural & sustainable packaging'
        }
      ]
    },
    '012000161155': {
      name: 'Oreo Original Cookies',
      brand: 'Nabisco',
      category: 'Snacks',
      price: '$3.49',
      image: 'https://via.placeholder.com/150x200/000080/ffffff?text=Oreo',
      carbonFootprint: {
        value: 0.89,
        unit: 'kg CO2e',
        rating: 'Very High',
        color: 'text-red-600'
      },
      ingredients: ['Enriched Flour', 'Sugar', 'Palm Oil', 'Cocoa', 'High Fructose Corn Syrup', 'Leavening'],
      greenAlternatives: [
        {
          name: 'Organic Oat Cookies',
          brand: 'Annie\'s',
          carbonFootprint: 0.31,
          price: '$4.99',
          reason: '65% less carbon footprint'
        },
        {
          name: 'Almond Flour Cookies',
          brand: 'Simple Mills',
          carbonFootprint: 0.42,
          price: '$5.49',
          reason: 'Gluten-free & sustainable ingredients'
        }
      ]
    },
    '1234567890123': {
      name: 'Sample Product',
      brand: 'EcoFriendly Co.',
      category: 'Food',
      price: '$2.99',
      image: 'https://via.placeholder.com/150x200/22c55e/ffffff?text=Sample',
      carbonFootprint: {
        value: 0.15,
        unit: 'kg CO2e',
        rating: 'Low',
        color: 'text-green-500'
      },
      ingredients: ['Organic Wheat', 'Natural Flavors', 'Sea Salt'],
      greenAlternatives: []
    }
  };

  // Start camera for scanning
  const startScanning = async () => {
    try {
      setError('');
      setIsScanning(true);
      setCameraReady(false);
      setScanningStatus('Starting camera...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            setCameraReady(true);
            setScanningStatus('Looking for barcode...');
            startScanningLoop();
          }).catch(err => {
            console.error('Error playing video:', err);
            setError('Failed to start camera preview');
          });
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Camera access denied or not available');
      setScanningStatus('Camera unavailable');
      setIsScanning(false);
    }
  };

  // Continuous scanning loop with barcode detection
  const startScanningLoop = () => {
    const statuses = [
      'Looking for barcode...',
      'Scanning area...',
      'Detecting patterns...',
      'Analyzing image...'
    ];
    let statusIndex = 0;
    
    scanningIntervalRef.current = setInterval(() => {
      setScanningStatus(statuses[statusIndex % statuses.length]);
      statusIndex++;
      
      // Attempt barcode detection on each scan cycle
      if (cameraReady && videoRef.current) {
        detectBarcode();
      }
    }, 2000);
  };

  // Barcode detection function
  const detectBarcode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image data for analysis
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Simple barcode detection simulation
    // In a real app, you would use a barcode detection library here
    const hasBarcode = simulateBarcodeDetection(imageData);
    
    if (hasBarcode) {
      const mockBarcodes = Object.keys(mockProducts);
      const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
      
      setScanningStatus('Barcode detected! Processing...');
      
      // Clear the scanning interval
      if (scanningIntervalRef.current) {
        clearInterval(scanningIntervalRef.current);
        scanningIntervalRef.current = null;
      }
      
      setTimeout(() => {
        setScannedCode(randomBarcode);
        fetchProductData(randomBarcode);
        stopScanning();
      }, 1000);
    }
  };

  // Simulate barcode detection based on image analysis
  const simulateBarcodeDetection = (imageData) => {
    // This is a simplified simulation
    // In reality, you would use computer vision algorithms
    
    // Random chance of detection (simulating when a barcode is in view)
    // This would be replaced with actual barcode detection logic
    const detectionChance = Math.random();
    
    // Only "detect" barcode 5% of the time per scan attempt
    // This simulates the need for proper positioning
    return detectionChance < 0.05;
  };

  // Stop camera
  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scanningIntervalRef.current) {
      clearInterval(scanningIntervalRef.current);
      scanningIntervalRef.current = null;
    }
    setIsScanning(false);
    setCameraReady(false);
    setScanningStatus('Looking for barcode...');
  };

  // Manual trigger for barcode simulation (removed - now automatic)

  // Fetch product data
  const fetchProductData = async (barcode) => {
    setLoading(true);
    setError('');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const product = mockProducts[barcode];
    if (product) {
      setProductData(product);
      
      // Add to recent products
      const newRecentProduct = {
        id: Date.now(),
        barcode,
        name: product.name,
        brand: product.brand,
        price: product.price,
        carbonFootprint: product.carbonFootprint,
        scannedAt: new Date().toLocaleString()
      };
      
      setRecentProducts(prev => [newRecentProduct, ...prev.slice(0, 4)]); // Keep only 5 most recent
    } else {
      setError('Product not found in database');
    }
    setLoading(false);
  };

  // Manual barcode input
  const handleManualInput = (e) => {
    if (e.key === 'Enter' && scannedCode.trim()) {
      fetchProductData(scannedCode.trim());
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (scanningIntervalRef.current) {
        clearInterval(scanningIntervalRef.current);
      }
    };
  }, []);

  const getCarbonRatingColor = (rating) => {
    switch (rating) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Very High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Main scanner view
  if (!productData && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm px-6 py-4">
          <div className="flex items-center gap-3">
            <Leaf className="text-green-600" size={24} />
            <div>
              <h1 className="text-xl font-semibold text-gray-800">EcoScan</h1>
              <p className="text-sm text-gray-600">Scan & organize your products</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          {!isScanning ? (
            // Scanner Setup View
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Quick Scan</h2>
              <p className="text-gray-600 mb-8">Point your camera at a barcode</p>
              
              {/* Scanner Frame */}
              <div className="relative mb-8">
                <div className="w-72 h-52 bg-white rounded-xl shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Camera className="text-gray-400" size={32} />
                  </div>
                  <p className="text-gray-500 text-sm">Ready to scan</p>
                </div>
                
                {/* Corner brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-3 border-t-3 border-blue-500 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-3 border-t-3 border-blue-500 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-3 border-b-3 border-blue-500 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-3 border-b-3 border-blue-500 rounded-br-lg"></div>
              </div>

              {/* Start Scan Button */}
              <button
                onClick={startScanning}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">+</span>
                Start Scan
              </button>

              {/* Manual Input */}
              <div className="mt-8 w-full">
                <input
                  type="text"
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  onKeyDown={handleManualInput}
                  placeholder="Or enter barcode manually"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                />
              </div>
            </div>
          ) : (
            // Camera View
            <div className="w-full max-w-sm mx-auto">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover rounded-xl shadow-lg bg-black"
                  style={{ 
                    transform: 'scaleX(-1)', // Mirror the video for better UX
                    display: cameraReady ? 'block' : 'none'
                  }}
                />
                
                {/* Loading overlay when camera is starting */}
                {!cameraReady && (
                  <div className="w-full h-64 bg-black rounded-xl shadow-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p className="text-sm">Starting camera...</p>
                    </div>
                  </div>
                )}
                
                {/* Scanning overlay */}
                {cameraReady && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-32 border-2 border-white rounded-lg relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-l-4 border-t-4 border-green-400 rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-r-4 border-t-4 border-green-400 rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-4 border-b-4 border-green-400 rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-4 border-b-4 border-green-400 rounded-br-lg"></div>
                      
                      {/* Scanning line animation */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
                      <div className="absolute top-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      
                      {/* Center crosshair */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 border-2 border-green-400 rounded-full animate-ping"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hidden canvas for barcode detection */}
                <canvas
                  ref={canvasRef}
                  style={{ display: 'none' }}
                />

                {/* Scanning status */}
                <div className="absolute top-3 left-3 right-3">
                  <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm text-center">
                    {scanningStatus}
                  </div>
                </div>
              </div>

              {/* Controls below camera */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={stopScanning}
                  className="bg-red-500/90 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg flex items-center gap-2"
                >
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                  Stop Scan
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Position a barcode within the frame to scan
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Hold steady for automatic detection
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Products Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt className="text-gray-400" size={20} />
              <span className="text-gray-700 font-medium">Recent Products</span>
            </div>
            <span className="text-blue-600 font-medium">{recentProducts.length}</span>
          </div>
          
          {/* Recent Products List */}
          {recentProducts.length > 0 && (
            <div className="mt-4 space-y-2">
              {recentProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.brand} • {product.scannedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCarbonRatingColor(product.carbonFootprint.rating)}`}>
                      {product.carbonFootprint.rating}
                    </span>
                    <button
                      onClick={() => {
                        setProductData(mockProducts[product.barcode]);
                        setScannedCode(product.barcode);
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
              
              {recentProducts.length > 3 && (
                <div className="text-center py-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All ({recentProducts.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="fixed bottom-20 left-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            <span className="text-red-700">{error}</span>
          </div>
        )}
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product data...</p>
        </div>
      </div>
    );
  }

  // Product results view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setProductData(null);
              setScannedCode('');
            }}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Product Details</h1>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Product Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={productData.image}
                alt={productData.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{productData.name}</h2>
              <p className="text-gray-600 mb-2">Brand: {productData.brand}</p>
              <p className="text-gray-600 mb-2">Category: {productData.category}</p>
              <p className="text-2xl font-bold text-green-600 mb-4">{productData.price}</p>
              
              {/* Carbon Footprint */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  Carbon Footprint
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {productData.carbonFootprint.value}
                  </span>
                  <span className="text-gray-600">{productData.carbonFootprint.unit}</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getCarbonRatingColor(productData.carbonFootprint.rating)}`}>
                    {productData.carbonFootprint.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Ingredients:</h3>
            <div className="flex flex-wrap gap-2">
              {productData.ingredients.map((ingredient, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Green Alternatives */}
        {productData.greenAlternatives.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Recycle className="text-green-600" />
              Green Alternatives
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productData.greenAlternatives.map((alternative, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-800 mb-1">{alternative.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{alternative.brand}</p>
                  <p className="text-lg font-bold text-green-600 mb-2">{alternative.price}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="text-green-500" size={16} />
                    <span className="text-sm font-medium text-green-700">
                      {alternative.carbonFootprint} kg CO2e
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 bg-green-50 rounded-lg p-2">
                    {alternative.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanProduct;