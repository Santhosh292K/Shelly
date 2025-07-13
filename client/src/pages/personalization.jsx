import React, { useState } from 'react';
import { Heart, ShoppingCart, AlertCircle, Utensils, Home, Baby, Gamepad2, Car, Dumbbell, Palette, Book, Music, Shirt, Pill, Apple, Wheat, Milk, Fish, Egg, TreePine, Sparkles, Target, Clock, DollarSign, Star, Check, Leaf, CircleOff, VeganIcon, AppleIcon, Salad, Carrot, NutIcon, Shrimp, BeanIcon } from 'lucide-react';
import walmart_logo from '../assets/walmart_logo.png'

const PersonalizationPage = ({onComplete }) => {
  const [formData, setFormData] = useState({
    dietaryPreferences: [],
    allergies: [],
    interests: [],
    shoppingFrequency: '',
    budget: '',
    healthGoals: [],
    lifestyleNeeds: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  const handleSubmit = () => {
    console.log('Personalization data:', formData);
    // Call the onComplete callback instead of showing alert
    onComplete && onComplete();
  };

  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div 
        className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );

  const QuickSelectCard = ({ title, options, selected, onChange, icon: Icon, multiSelect = true }) => (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-50 rounded-xl mr-4">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {options.map((option) => (
          <div
            key={option.name}
            onClick={() => onChange(option.name)}
            className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center group hover:shadow-lg ${
              selected.includes(option.name)
                ? 'border-blue-600 bg-blue-50 shadow-md scale-105'
                : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
            }`}
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 flex items-center justify-center rounded-lg ${
              selected.includes(option.name) ? 'bg-blue-600' : 'bg-gray-100 group-hover:bg-white-100'
            }`}>
              <option.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                selected.includes(option.name) ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
              }`} />
            </div>
            <span className={`text-xs sm:text-sm font-semibold block ${
              selected.includes(option.name) ? 'text-blue-700' : 'text-gray-700'
            }`}>
              {option.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        const dietaryOptions = [
          { name: 'Vegetarian', icon: VeganIcon },
          { name: 'Vegan', icon: VeganIcon },
          { name: 'Keto', icon: AppleIcon },
          { name: 'Paleo', icon: Fish },
          { name: 'Gluten-Free', icon: Wheat },
          { name: 'Low-Carb', icon: Salad },
          { name: 'High-Protein', icon: Egg },
          { name: 'Organic', icon: Carrot },
          { name: 'No Preferences', icon: CircleOff}
        ];

        const allergyOptions = [
          { name: 'Nuts', icon: NutIcon },
          { name: 'Dairy', icon: Milk },
          { name: 'Gluten', icon: Wheat },
          { name: 'Eggs', icon: Egg },
          { name: 'Fish', icon: Fish },
          { name: 'Shellfish', icon: Shrimp },
          { name: 'Soy', icon: BeanIcon},
          { name: 'No Allergies', icon: CircleOff }
        ];

        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-lg">
                <Utensils className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Food & Dietary Preferences</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Help us recommend the perfect products for your lifestyle and dietary needs
              </p>
            </div>
            
            <QuickSelectCard
              title="Dietary Preferences"
              options={dietaryOptions}
              selected={formData.dietaryPreferences}
              onChange={(value) => handleArrayChange('dietaryPreferences', value)}
              icon={Apple}
            />
            
            <QuickSelectCard
              title="Allergies & Restrictions"
              options={allergyOptions}
              selected={formData.allergies}
              onChange={(value) => handleArrayChange('allergies', value)}
              icon={AlertCircle}
            />
          </div>
        );

      case 2:
        const interestOptions = [
          { name: 'Electronics', icon: Gamepad2 },
          { name: 'Home & Garden', icon: Home },
          { name: 'Fashion', icon: Shirt },
          { name: 'Sports & Fitness', icon: Dumbbell },
          { name: 'Baby & Kids', icon: Baby },
          { name: 'Beauty', icon: Sparkles },
          { name: 'Automotive', icon: Car },
          { name: 'Books & Media', icon: Book },
          { name: 'Health & Wellness', icon: Heart }
        ];

        const lifestyleOptions = [
          { name: 'Busy Professional', icon: Clock },
          { name: 'Family Focused', icon: Home },
          { name: 'Health Conscious', icon: Heart },
          { name: 'Budget Minded', icon: DollarSign },
          { name: 'Tech Enthusiast', icon: Gamepad2 },
          { name: 'Fitness Focused', icon: Dumbbell },
          { name: 'Home Chef', icon: Utensils },
          { name: 'Eco-Friendly', icon: TreePine },
          { name: 'Style Conscious', icon: Sparkles }
        ];

        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl mb-6 shadow-lg">
                <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-blue-700" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Shopping Interests</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Tell us what you love to shop for so we can personalize your experience
              </p>
            </div>
            
            <QuickSelectCard
              title="Product Categories"
              options={interestOptions}
              selected={formData.interests}
              onChange={(value) => handleArrayChange('interests', value)}
              icon={ShoppingCart}
            />
            
            <QuickSelectCard
              title="Lifestyle & Needs"
              options={lifestyleOptions}
              selected={formData.lifestyleNeeds}
              onChange={(value) => handleArrayChange('lifestyleNeeds', value)}
              icon={Target}
            />
          </div>
        );

      case 3:
        const healthGoalOptions = [
          { name: 'Weight Management', icon: Dumbbell },
          { name: 'Heart Health', icon: Heart },
          { name: 'Energy & Vitality', icon: Sparkles },
          { name: 'Better Sleep', icon: Clock },
          { name: 'Stress Relief', icon: Heart },
          { name: 'Immunity Support', icon: Pill },
          { name: 'Muscle Building', icon: Dumbbell },
          { name: 'Mental Wellness', icon: Heart },
          { name: 'No Specific Goals', icon: Star }
        ];

        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-lg">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Health & Wellness Goals</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Let us help you achieve your health and wellness aspirations
              </p>
            </div>
            
            <QuickSelectCard
              title="Health Goals"
              options={healthGoalOptions}
              selected={formData.healthGoals}
              onChange={(value) => handleArrayChange('healthGoals', value)}
              icon={Heart}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-50 rounded-xl mr-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Shopping Frequency</h3>
                </div>
                <div className="space-y-3">
                  {['Weekly', 'Bi-weekly', 'Monthly', 'As needed'].map((freq) => (
                    <label key={freq} className="flex items-center space-x-4 p-3 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors duration-200 group">
                      <input
                        type="radio"
                        name="frequency"
                        value={freq}
                        checked={formData.shoppingFrequency === freq}
                        onChange={(e) => handleInputChange('shoppingFrequency', e.target.value)}
                        className="w-5 h-5 text-blue-600 border-gray-300 focus:outline-none"

                      />
                      <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-blue-700">{freq}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-50 rounded-xl mr-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Budget Range</h3>
                </div>
                <div className="space-y-3">
                  {['Under $50', '$50 - $100', '$100 - $200', '$200 - $500', 'Over $500'].map((budget) => (
                    <label key={budget} className="flex items-center space-x-4 p-3 rounded-xl cursor-pointer hover:bg-green-50 transition-colors duration-200 group">
                      <input
                        type="radio"
                        name="budget"
                        value={budget}
                        checked={formData.budget === budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-5 h-5 text-blue-600 border-gray-300 focus:outline-none"

                      />
                      <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-green-700">{budget}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-100 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="max-w-xl mr-9 mb-1 flex items-center space-x-0 ">
              <div className="max-w-xl mr-9 mb-1 flex items-center space-x-0 ">
  <img src={walmart_logo} alt="Walmart Logo" className="w-20 h-20 object-contain" />
  <h1 className="text-3xl sm:text-5xl font-bold text-blue-700">Walmart</h1>
</div>

            </div>
          </div>
          <h2 className="text-xl sm:text-3xl text-gray-700 mb-3 font-semibold">Let's personalize your experience</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            This will only take a minute and help us recommend the best products for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 sm:mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm sm:text-base font-semibold text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm sm:text-base text-gray-500 font-medium">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <ProgressBar />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8 border border-gray-100">
          {renderStep()}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
              currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md active:scale-95'
            }`}
          >
            Previous
          </button>
          
          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg active:scale-95 text-sm sm:text-base"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 sm:px-14 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-700 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 hover:shadow-lg active:scale-95 text-sm sm:text-base"
            >
              Start Shopping
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalizationPage;