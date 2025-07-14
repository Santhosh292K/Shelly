import React, { useState, useRef, useEffect} from 'react';
import { Camera, Leaf, ShoppingCart, AlertCircle, Recycle, TrendingDown, Star, Receipt, ArrowLeft } from 'lucide-react';
import { Heart, Share2, Info, Award, BarChart3, Factory, Droplets, Zap, Trash2, RotateCcw, MapPin, Clock } from 'lucide-react';
import shelly_wave from '../assets/shelly_wave.webm';
import Draggable from 'react-draggable';
const ScanProduct = () => {
  const navigate = (direction) => {
    if (direction === -1) {
      window.history.back();
    }
  };  
  const [activeTab, setActiveTab] = useState('overview');
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
  const fallbackTimeoutRef = useRef(null);
  const [showMessage, setShowMessage] = useState(true);
  const [messageContent, setMessageContent] = useState({
    text: "Scan the products before you buy!",
    type: 'welcome'
  });

  // Mock product database with carbon footprint data
  const mockProducts = {
    '8901030895172': {
      name: 'Coca-Cola Classic 330ml',
      brand: 'Coca-Cola',
      category: 'Beverages',
      price: '$1.99',
      barcode: '8901030895172',
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop',
      carbonFootprint: {
        value: 0.33,
        unit: 'kg CO2e',
        rating: 'High',
        color: 'text-red-500',
        breakdown: {
          production: 45,
          packaging: 25,
          transport: 20,
          disposal: 10
        }
      },
      sustainabilityScore: 42,
      certifications: ['ISO 14001'],
      nutritionalHighlights: {
        calories: 140,
        sugar: '39g',
        sodium: '45mg',
        caffeine: '34mg'
      },
      ingredients: [
        { name: 'Carbonated Water', percentage: 89.2, type: 'base' },
        { name: 'High Fructose Corn Syrup', percentage: 8.7, type: 'sweetener' },
        { name: 'Caramel Color', percentage: 1.2, type: 'coloring' },
        { name: 'Phosphoric Acid', percentage: 0.5, type: 'preservative' },
        { name: 'Natural Flavors', percentage: 0.3, type: 'flavoring' },
        { name: 'Caffeine', percentage: 0.1, type: 'stimulant' }
      ],
      manufacturingDetails: {
        origin: 'Atlanta, GA, USA',
        plantLocation: 'Multiple locations',
        productionMethod: 'Industrial carbonation',
        shelfLife: '12 months',
        recyclingCode: 'PET 1'
      },
      environmentalImpact: {
        waterUsage: '2.4L per 330ml',
        energyConsumption: '0.89 kWh',
        wasteGeneration: '0.15kg',
        recyclingRate: '68%'
      },
      healthScore: 25,
      greenAlternatives: [
        {
          name: 'Organic Sparkling Water',
          brand: 'San Pellegrino',
          carbonFootprint: 0.08,
          price: '$1.49',
          reason: '75% less carbon footprint',
          sustainabilityScore: 85
        },
        {
          name: 'Kombucha Original',
          brand: 'GT\'s Living Foods',
          carbonFootprint: 0.12,
          price: '$2.99',
          reason: 'Organic & probiotic benefits',
          sustainabilityScore: 78
        },
        {
          name: 'Coconut Water',
          brand: 'Vita Coco',
          carbonFootprint: 0.15,
          price: '$2.49',
          reason: 'Natural & sustainable packaging',
          sustainabilityScore: 82
        }
      ]
    },
    '012000161155': {
      name: 'Oreo Original Cookies',
      brand: 'Nabisco',
      category: 'Snacks',
      price: '$3.49',
      barcode: '012000161155',
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop',
      carbonFootprint: {
        value: 0.89,
        unit: 'kg CO2e',
        rating: 'Very High',
        color: 'text-red-600',
        breakdown: {
          production: 52,
          packaging: 18,
          transport: 22,
          disposal: 8
        }
      },
      sustainabilityScore: 34,
      certifications: ['Rainforest Alliance'],
      nutritionalHighlights: {
        calories: 160,
        sugar: '12g',
        sodium: '135mg',
        fat: '7g'
      },
      ingredients: [
        { name: 'Enriched Flour', percentage: 42.5, type: 'base' },
        { name: 'Sugar', percentage: 28.3, type: 'sweetener' },
        { name: 'Palm Oil', percentage: 15.2, type: 'fat' },
        { name: 'Cocoa', percentage: 8.7, type: 'flavoring' },
        { name: 'High Fructose Corn Syrup', percentage: 3.1, type: 'sweetener' },
        { name: 'Leavening Agents', percentage: 2.2, type: 'additive' }
      ],
      manufacturingDetails: {
        origin: 'New Jersey, USA',
        plantLocation: 'Fair Lawn, NJ',
        productionMethod: 'Automated baking',
        shelfLife: '2 years',
        recyclingCode: 'PP 5'
      },
      environmentalImpact: {
        waterUsage: '1.8L per package',
        energyConsumption: '1.2 kWh',
        wasteGeneration: '0.12kg',
        recyclingRate: '45%'
      },
      healthScore: 28,
      greenAlternatives: [
        {
          name: 'Organic Oat Cookies',
          brand: 'Annie\'s',
          carbonFootprint: 0.31,
          price: '$4.99',
          reason: '65% less carbon footprint',
          sustainabilityScore: 76
        },
        {
          name: 'Almond Flour Cookies',
          brand: 'Simple Mills',
          carbonFootprint: 0.42,
          price: '$5.49',
          reason: 'Gluten-free & sustainable ingredients',
          sustainabilityScore: 71
        }
      ]
    },
    '1234567890123': {
      name: 'Organic Quinoa Crackers',
      brand: 'EcoFriendly Co.',
      category: 'Snacks',
      price: '$4.99',
      barcode: '1234567890123',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      carbonFootprint: {
        value: 0.15,
        unit: 'kg CO2e',
        rating: 'Low',
        color: 'text-green-500',
        breakdown: {
          production: 38,
          packaging: 12,
          transport: 35,
          disposal: 15
        }
      },
      sustainabilityScore: 89,
      certifications: ['USDA Organic', 'Non-GMO Project', 'B-Corp'],
      nutritionalHighlights: {
        calories: 120,
        protein: '4g',
        fiber: '3g',
        sodium: '90mg'
      },
      ingredients: [
        { name: 'Organic Quinoa Flour', percentage: 65.0, type: 'base' },
        { name: 'Organic Sunflower Oil', percentage: 18.5, type: 'fat' },
        { name: 'Organic Brown Rice Flour', percentage: 12.0, type: 'base' },
        { name: 'Sea Salt', percentage: 2.5, type: 'seasoning' },
        { name: 'Organic Herbs', percentage: 2.0, type: 'flavoring' }
      ],
      manufacturingDetails: {
        origin: 'Boulder, CO, USA',
        plantLocation: 'Certified Organic Facility',
        productionMethod: 'Stone ground & baked',
        shelfLife: '18 months',
        recyclingCode: 'Compostable'
      },
      environmentalImpact: {
        waterUsage: '0.8L per package',
        energyConsumption: '0.3 kWh',
        wasteGeneration: '0.02kg',
        recyclingRate: '95%'
      },
      healthScore: 85,
      greenAlternatives: []
    }
  };

  // Function to select a random product
  const selectRandomProduct = () => {
    const mockBarcodes = Object.keys(mockProducts);
    const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
    setScanningStatus('No barcode detected - showing random product...');

    
    // Clear intervals and timeouts
    if (scanningIntervalRef.current) {
      clearInterval(scanningIntervalRef.current);
      scanningIntervalRef.current = null;
    }
    
    setTimeout(() => {
      setScannedCode(randomBarcode);
      fetchProductData(randomBarcode);
      stopScanning();
    }, 1000);
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
            
            // Start 2-second fallback timer
            fallbackTimeoutRef.current = setTimeout(() => {
              selectRandomProduct();
            }, 2000);
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
    }, 500); // Reduced interval for more frequent detection attempts
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
      // Clear the fallback timeout since we detected a barcode
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      
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
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
    setIsScanning(false);
    setCameraReady(false);
    setScanningStatus('Looking for barcode...');
  };

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
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, []);
  
  const getVideoSource = () => {
    return shelly_wave; // Using the imported video
  };

  const handleScreenTap = () => {
    if (showMessage) {
      setShowMessage(false);
    }
  };

  const getCarbonRatingColor = (rating) => {
    switch (rating?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'very high': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSustainabilityColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreColor = (score) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getIngredientTypeColor = (type) => {
    const colors = {
      base: 'bg-blue-100 text-blue-800',
      sweetener: 'bg-purple-100 text-purple-800',
      fat: 'bg-orange-100 text-orange-800',
      flavoring: 'bg-green-100 text-green-800',
      preservative: 'bg-red-100 text-red-800',
      additive: 'bg-gray-100 text-gray-800',
      coloring: 'bg-yellow-100 text-yellow-800',
      stimulant: 'bg-pink-100 text-pink-800',
      seasoning: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const TabButton = ({ id, label, icon: Icon, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const StatCard = ({ icon: Icon, title, value, color = 'text-gray-800' }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="text-blue-600" size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`text-lg font-semibold ${color}`}>{value}</p>
        </div>
      </div>
    </div>
    
  );
  // Main scanner view
  if (!productData && !loading) {
    return (
      <>
    <div className="min-h-screen bg-gray-50 flex flex-col relative"> 
      {/* Blur overlay when message is shown */}
      {showMessage && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={handleScreenTap}
        />
      )}  
      {/* Header */}
        <div className="bg-blue-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-white">Scan Products</h1>
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
          <div className='relative z-50'>
        <Draggable axis='y'>
        <div>
          {/* Fixed Video Assistant in Bottom Right Corner */}
          <div className="fixed bottom-4 right-2 z-50">
            <div className="w-40 h-56 rounded-lg overflow-hidden">
              <video
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
</>
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
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Blur overlay when message is shown */}
      {showMessage && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={handleScreenTap}
      />
      )}      {/* Header */}
      <div className="bg-blue shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Product Analysis</h1>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Product Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <img
                  src={productData.image}
                  alt={productData.name}
                  className="w-full h-80 object-cover rounded-xl shadow-md"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {productData.category}
                  </span>
                  {productData.certifications?.map((cert, index) => (
                    <span key={index} className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{productData.name}</h2>
                <p className="text-lg text-gray-600 mb-1">by {productData.brand}</p>
                <p className="text-3xl font-bold text-green-600">{productData.price}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={Leaf}
                  title="Carbon Footprint"
                  value={`${productData.carbonFootprint?.value} ${productData.carbonFootprint?.unit}`}
                  color={productData.carbonFootprint?.color}
                />
                <StatCard
                  icon={Award}
                  title="Sustainability Score"
                  value={`${productData.sustainabilityScore}/100`}
                  color={getSustainabilityColor(productData.sustainabilityScore)}
                />
                <StatCard
                  icon={Heart}
                  title="Health Score"
                  value={`${productData.healthScore}/100`}
                  color={getSustainabilityColor(productData.healthScore)}
                />
                <StatCard
                  icon={RotateCcw}
                  title="Recyclability"
                  value={`${productData.environmentalImpact?.recyclingRate}`}
                  color="text-green-600"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <TabButton id="overview" label="Overview" icon={Info} active={activeTab === 'overview'} />
          <TabButton id="sustainability" label="Sustainability" icon={Leaf} active={activeTab === 'sustainability'} />
          <TabButton id="ingredients" label="Ingredients" icon={BarChart3} active={activeTab === 'ingredients'} />
          <TabButton id="manufacturing" label="Manufacturing" icon={Factory} active={activeTab === 'manufacturing'} />
          <TabButton id="alternatives" label="Alternatives" icon={Recycle} active={activeTab === 'alternatives'} />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Carbon Footprint Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Leaf className="text-green-600" />
                Carbon Footprint Breakdown
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-gray-800">
                      {productData.carbonFootprint?.value}
                    </span>
                    <span className="text-gray-600">{productData.carbonFootprint?.unit}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCarbonRatingColor(productData.carbonFootprint?.rating)}`}>
                      {productData.carbonFootprint?.rating}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {Object.entries(productData.carbonFootprint?.breakdown || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="capitalize text-gray-600">{key}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nutritional Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Nutritional Highlights</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(productData.nutritionalHighlights || {}).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                    <p className="text-sm text-gray-600 capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sustainability' && (
          <div className="space-y-6">
            {/* Environmental Impact */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Environmental Impact</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={Droplets}
                  title="Water Usage"
                  value={productData.environmentalImpact?.waterUsage}
                  color="text-blue-600"
                />
                <StatCard
                  icon={Zap}
                  title="Energy Consumption"
                  value={productData.environmentalImpact?.energyConsumption}
                  color="text-yellow-600"
                />
                <StatCard
                  icon={Trash2}
                  title="Waste Generation"
                  value={productData.environmentalImpact?.wasteGeneration}
                  color="text-red-600"
                />
                <StatCard
                  icon={RotateCcw}
                  title="Recycling Rate"
                  value={productData.environmentalImpact?.recyclingRate}
                  color="text-green-600"
                />
              </div>
            </div>

            {/* Sustainability Score Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Sustainability Analysis</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800">{productData.sustainabilityScore}</div>
                  <div className="text-sm text-gray-600">out of 100</div>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${getSustainabilityColor(productData.sustainabilityScore).replace('text-', 'bg-')}`}
                      style={{ width: `${productData.sustainabilityScore}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Positive Factors</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Certified production process</li>
                    <li>• Recyclable packaging</li>
                    <li>• Energy-efficient manufacturing</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Areas for Improvement</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• High carbon footprint</li>
                    <li>• Water-intensive production</li>
                    <li>• Limited organic ingredients</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredient Analysis</h3>
            <div className="space-y-4">
              {productData.ingredients?.map((ingredient, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-800">{ingredient.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIngredientTypeColor(ingredient.type)}`}>
                      {ingredient.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${ingredient.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 min-w-[3rem]">
                      {ingredient.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'manufacturing' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Manufacturing Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <StatCard
                icon={MapPin}
                title="Origin"
                value={productData.manufacturingDetails?.origin}
              />
              <StatCard
                icon={Factory}
                title="Plant Location"
                value={productData.manufacturingDetails?.plantLocation}
              />
              <StatCard
                icon={Clock}
                title="Shelf Life"
                value={productData.manufacturingDetails?.shelfLife}
              />
              <StatCard
                icon={RotateCcw}
                title="Recycling Code"
                value={productData.manufacturingDetails?.recyclingCode}
              />
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Production Method</h4>
              <p className="text-blue-700">{productData.manufacturingDetails?.productionMethod}</p>
            </div>
          </div>
        )}

        {activeTab === 'alternatives' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Recycle className="text-green-600" />
              Green Alternatives
            </h3>
            {productData.greenAlternatives?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productData.greenAlternatives.map((alternative, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2">{alternative.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{alternative.brand}</p>
                    <p className="text-xl font-bold text-green-600 mb-3">{alternative.price}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="text-green-500" size={16} />
                      <span className="text-sm font-medium text-green-700">
                        {alternative.carbonFootprint} kg CO2e
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 bg-green-50 rounded-lg p-3 mb-3">
                      {alternative.reason}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Sustainability: {alternative.sustainabilityScore}/100
                      </span>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">No green alternatives available for this product.</p>
              </div>
            )}
          </div>
        )}
      </div>
     
    </div>
    // Replace the video assistant section at the bottom of your component with this:

<div className='relative z-50'>
  {/* Only make it draggable when NOT in product view */}
  {!productData ? (
    <Draggable axis='y'>
      <div>
        {/* Fixed Video Assistant in Bottom Right Corner */}
        <div className="fixed bottom-4 right-2 z-50">
          <div className="w-40 h-56 rounded-lg overflow-hidden">
            <video
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
  ) : (
    // Fixed position for product page - no dragging
    <div>
      {/* Fixed Video Assistant in Bottom Right Corner - stays in viewport */}
      <div className="fixed bottom-4 right-2 z-50" style={{ position: 'fixed' }}>
        <div className="w-40 h-56 rounded-lg overflow-hidden">
          <video
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
        <div className="fixed bottom-24 right-40 z-50 max-w-xs" style={{ position: 'fixed' }}>
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
  )}
</div>
    </>
  );
};

export default ScanProduct;