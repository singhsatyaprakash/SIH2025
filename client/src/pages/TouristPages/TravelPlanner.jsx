import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Wifi, Phone, AlertTriangle, Star } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TravelPlanner = () => {
  const [activeTab, setActiveTab] = useState('connectivity');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowNavbar(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  const destinations = [
    {
      name: 'Gangtok',
      state: 'Sikkim',
      rating: 'Excellent',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      description: 'The enchanting capital of Sikkim, surrounded by snow-capped mountains and dotted with Buddhist...',
      highlights: ['Rumtek Monastery', 'MG Marg', 'Tsomgo Lake'],
      bestTime: 'Mar-May, Oct-Dec',
      score: '95/100'
    },
    {
      name: 'Shillong',
      state: 'Meghalaya',
      rating: 'Good',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Known as the "Scotland of the East", this hill station offers rolling hills, waterfalls, and vibrant culture.',
      highlights: ['Elephant Falls', "Ward's Lake", 'Don Bosco Museum'],
      bestTime: 'Apr-Jun, Sep-Nov',
      score: '70/100'
    },
    {
      name: 'Guwahati',
      state: 'Assam',
      rating: 'Excellent',
      image: 'https://www.meghalayatourcabs.com/wp-content/uploads/2024/06/1_pxo-VJcTpuqG7bi33xCS0g.jpg',
      description: 'The gateway to Northeast India, featuring ancient temples, the mighty Brahmaputra river, and rich...',
      highlights: ['Kamakhya Temple', 'Brahmaputra River', 'Assam State Zoo'],
      bestTime: 'Oct-Mar',
      score: '95/100'
    }
  ];

  const connectivityIssues = [
    { location: 'Gangtok', type: 'Network Issue', severity: 'low', date: '9/7/2025' },
    { location: 'Shillong', type: 'Call Drop', severity: 'medium', date: '9/7/2025' },
    { location: 'Guwahati', type: 'Network Issue', severity: 'low', date: '9/7/2025' },
    { location: 'Shillong', type: 'Call Drop', severity: 'high', date: '9/5/2025' }
  ];

  const travelPlans = [
    {
      title: 'Spiritual Sikkim Circuit',
      duration: '7 days',
      difficulty: 'Moderate',
      cost: '₹25,000 - ₹35,000',
      destinations: ['Gangtok', 'Rumtek Monastery', 'Nathu La Pass', 'Tsomgo Lake'],
      highlights: ['Buddhist monasteries', 'Mountain views', 'Sacred lakes', 'Border visit'],
      bestFor: ['Spiritual seekers', 'Mountain lovers', 'Culture enthusiasts']
    },
    {
      title: 'Meghalaya Nature Trail',
      duration: '5 days',
      difficulty: 'Easy',
      cost: '₹18,000 - ₹28,000',
      destinations: ['Shillong', 'Cherrapunji', 'Mawlynnog', 'Living Root Bridges'],
      highlights: ['Wettest place on earth', 'Living bridges', 'Cleanest village', 'Waterfalls'],
      bestFor: ['Nature lovers', 'Photographers', 'Adventure seekers']
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score) => {
    const numScore = parseInt(score);
    if (numScore >= 90) return 'bg-green-500';
    if (numScore >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <>
      <Navbar show={showNavbar} />
      <div className="min-h-screen mt-16 bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-400 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute right-8 bottom-8 w-20 h-24 bg-gradient-to-b from-orange-400 to-red-500 rounded-lg transform rotate-3 shadow-lg"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">Discover Northeast India</h1>
            <p className="text-xl mb-8 text-center max-w-2xl">
              Plan your journey through the mystical mountains, ancient cultures, and pristine landscapes
            </p>
            <button className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2">
              <MapPin size={20} />
              Start Planning
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search destinations..." 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <MapPin size={18} />
                Find Destinations
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Featured Destinations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Destinations</h2>
            <p className="text-gray-600 mb-8">Explore the most beautiful and culturally rich destinations in Northeast India</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {destinations.map((dest, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        dest.rating === 'Excellent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {dest.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{dest.name}</h3>
                      <span className="ml-2 text-gray-500 flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {dest.state}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{dest.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {dest.highlights.map((highlight, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Best time: {dest.bestTime}</span>
                      <div className="flex items-center">
                        <Wifi size={16} className="mr-1" />
                        <span>{dest.score}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Main Content Tabs */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Connectivity & Issues */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Wifi className="mr-2 text-blue-600" size={20} />
                  <h3 className="text-xl font-bold text-gray-800">Connectivity Safety Scores</h3>
                </div>
                
                <div className="space-y-4">
                  {destinations.map((dest, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-800">{dest.name}</span>
                        <span className="text-gray-500 text-sm ml-2">{dest.state}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold text-lg mr-2">{dest.score.split('/')[0]}</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${getScoreColor(dest.score)}`}
                            style={{ width: `${dest.score.split('/')[0]}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="mr-2 text-orange-600" size={20} />
                  <h3 className="text-xl font-bold text-gray-800">Recent Connectivity Issues</h3>
                </div>
                
                <div className="space-y-3">
                  {connectivityIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        {issue.type === 'Network Issue' ? <Wifi size={16} className="mr-2 text-gray-500" /> : <Phone size={16} className="mr-2 text-gray-500" />}
                        <div>
                          <div className="font-medium text-gray-800">{issue.location}</div>
                          <div className="text-sm text-gray-600">{issue.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{issue.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Plans */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <Calendar className="mr-2 text-blue-600" size={20} />
                  <h3 className="text-xl font-bold text-gray-800">Suggested Travel Plans</h3>
                </div>
                
                <div className="space-y-6">
                  {travelPlans.map((plan, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-1" />
                              <span>{plan.duration}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              plan.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {plan.difficulty}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Est. Cost</div>
                          <div className="font-bold text-lg text-orange-600">{plan.cost}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                          <MapPin size={16} className="mr-1" />
                          Destinations
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {plan.destinations.map((dest, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200">
                              {dest}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                          <Star size={16} className="mr-1" />
                          Highlights
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {plan.highlights.map((highlight, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-lg">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-700 mb-2">Best For</h5>
                        <div className="flex flex-wrap gap-2">
                          {plan.bestFor.map((type, i) => (
                            <span key={i} className="bg-orange-50 text-orange-700 text-sm px-3 py-1 rounded-lg border border-orange-200">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200">
                        Customize This Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default TravelPlanner;