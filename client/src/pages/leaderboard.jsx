import React, { useState } from 'react';
import { Trophy, Medal, Award, Leaf, Star, TrendingUp, Zap, Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useNavigate} from 'react-router-dom';
const ShellyLeaderboard = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const navigate = useNavigate();
  const currentUser = {
    name: 'Sparky',
    greenScore: 0,
    rank: 0,
    level: 'Eco Champion',
    streak: 0,
    items: 0,
    avatar: 'SP'
  };
  
  const leaderboardData = {
    monthly: [
      { id: 1, name: 'SustainableEm', greenScore: 9850, change: '+456', avatar: 'SE', level: 'Eco Champion', streak: 30, items: 98 },
      { id: 2, name: 'EcoSarah92', greenScore: 9720, change: '+389', avatar: 'ES', level: 'Eco Champion', streak: 28, items: 102 },
      { id: 3, name: 'GreenMike', greenScore: 9650, change: '+298', avatar: 'GM', level: 'Green Guardian', streak: 22, items: 87 },
      { id: 4, name: 'OrganicDave', greenScore: 9580, change: '+267', avatar: 'OD', level: 'Planet Protector', streak: 25, items: 76 },
      { id: 5, name: 'ZeroWasteLisa', greenScore: 9520, change: '+334', avatar: 'ZL', level: 'Green Guardian', streak: 18, items: 94 },
      { id: 6, name: 'EarthLover', greenScore: 9480, change: '+276', avatar: 'EL', level: 'Planet Protector', streak: 15, items: 81 },
      { id: 7, name: 'GreenQueen', greenScore: 9420, change: '+192', avatar: 'GQ', level: 'Eco Warrior', streak: 20, items: 89 },
      { id: 8, name: 'EcoJames', greenScore: 9380, change: '+168', avatar: 'EJ', level: 'Green Guardian', streak: 12, items: 73 }
    ]
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold text-sm">{rank}</span>;
    }
  };

  const getScoreColor = (rank) => {
    switch(rank) {
      case 1: return 'text-yellow-600';
      case 2: return 'text-gray-600';
      case 3: return 'text-amber-600';
      default: return 'text-green-600';
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Eco Champion': return 'bg-green-100 text-green-800';
      case 'Green Guardian': return 'bg-blue-100 text-blue-800';
      case 'Planet Protector': return 'bg-purple-100 text-purple-800';
      case 'Eco Warrior': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      {/* App Bar */}
      <div className={`bg-blue-600 text-white sticky top-0 z-50 shadow-lg transition-all duration-300 `}>
        <div className="px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={handleBackClick}
              className="p-2 -ml-2 mr-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">LeaderBoard</h1>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg mb-6 p-4 border-2 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {currentUser.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
              <div className={`text-xs px-2 py-1 rounded-full mt-1 ${getLevelColor(currentUser.level)}`}>
                {currentUser.level}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-xl font-bold text-yellow-600">#{currentUser.rank}</span>
            </div>
            <div className="text-xs text-gray-600">Your Rank</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-green-200">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{currentUser.greenScore.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Green Score</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-orange-600">
              <Zap className="w-4 h-4" />
              <span className="text-lg font-bold">{currentUser.streak}</span>
            </div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-blue-600">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-lg font-bold">{currentUser.items}</span>
            </div>
            <div className="text-xs text-gray-600">Eco Items</div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-2xl shadow-lg mb-6 p-6 border-2 border-green-200">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Top Eco Champions
          </h2>
        </div>
        
        <div className="flex justify-center items-end space-x-4">
          {leaderboardData.monthly.slice(0, 3).map((user, index) => {
            const positions = [1, 0, 2]; // Second, First, Third
            const actualRank = positions.indexOf(index) + 1;
            const heights = ['h-24', 'h-32', 'h-20'];
            const gradients = ['from-amber-400 to-amber-600', 'from-yellow-400 to-yellow-600', 'from-amber-400 to--600'];
            
            return (
              <div key={user.id} className="flex flex-col items-center max-w-20">
                <div className="mb-2 relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user.avatar}
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">{actualRank}</span>
                  </div>
                </div>
                <div className={`bg-gradient-to-t ${gradients[index]} ${heights[index]} w-16 rounded-t-2xl flex flex-col justify-center items-center text-white shadow-lg`}>
                  <div className="text-sm font-bold">{user.greenScore}</div>
                  <div className="text-xs font-medium opacity-90">Score</div>
                </div>
                <div className="text-center mt-2 w-full">
                  <div className="font-bold text-gray-900 text-sm truncate">{user.name}</div>
                  <div className={`text-xs px-1 py-0.5 rounded-full mt-1 ${getLevelColor(user.level)} truncate`}>
                    {user.level}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Community Rankings</h2>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>Streak</span>
              </div>
              <div className="flex items-center space-x-1">
                <ShoppingCart className="w-4 h-4 text-blue-500" />
                <span>Items</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboardData.monthly.map((user, index) => (
            <div key={user.id} className="p-4 hover:bg-green-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="flex items-center justify-center w-6">
                    {getRankIcon(index + 1)}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-gray-900 truncate">{user.name}</div>
                    <div className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${getLevelColor(user.level)}`}>
                      {user.level}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 flex-shrink-0 w-30 h-35">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-orange-600">
                      <Zap className="w-3 h-3" />
                      <span className="text-sm font-medium">{user.streak}</span>
                    </div>
                    <div className="text-xs text-gray-500">streak</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-blue-600">
                      <ShoppingCart className="w-3 h-3" />
                      <span className="text-sm font-medium">{user.items}</span>
                    </div>
                    <div className="text-xs text-gray-500">items</div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold text-lg ${getScoreColor(index + 1)}`}>
                      {user.greenScore.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 flex items-center justify-end">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {user.change}
                    </div>
                  </div>
                  
                  <Leaf className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
{/* Community Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-green-200">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Community Average</div>
              <div className="text-lg sm:text-xl font-bold text-green-600">9,570</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-green-200">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Eco Shoppers</div>
              <div className="text-lg sm:text-xl font-bold text-blue-600">1,247</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-green-200 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Highest Green Score</div>
              <div className="text-lg sm:text-xl font-bold text-yellow-600">9,850</div>
            </div>
          </div>
        </div>
      </div>

      {/* Shelly Motivation */}
      <div className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 text-white text-center">
    
        <h3 className="text-xl font-bold mb-2">Keep up the great work!</h3>
        <p className="text-green-100">Every sustainable choice you make helps our planet. Shelly is proud of our eco-community!</p>
      </div>
    </div>
  );
};

export default ShellyLeaderboard;