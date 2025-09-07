import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { mockDashboardStats } from '../mock';
import { 
  LogOut, 
  Activity, 
  Network, 
  Database, 
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  Cpu
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    setUser(JSON.parse(userData));
    setStats(mockDashboardStats);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const getIcon = (iconName) => {
    const iconProps = { className: "h-6 w-6" };
    switch (iconName) {
      case 'activity': return <Activity {...iconProps} />;
      case 'network': return <Network {...iconProps} />;
      case 'database': return <Database {...iconProps} />;
      case 'shield': return <Shield {...iconProps} />;
      default: return <Activity {...iconProps} />;
    }
  };

  const getTrendIcon = (trend) => {
    const iconProps = { className: "h-4 w-4" };
    switch (trend) {
      case 'up': return <TrendingUp {...iconProps} className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown {...iconProps} className="h-4 w-4 text-red-400" />;
      case 'stable': return <Minus {...iconProps} className="h-4 w-4 text-gray-400" />;
      default: return <Minus {...iconProps} className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 right-16 w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
            <circle cx="25" cy="25" r="1" fill="currentColor" className="animate-pulse" />
            <circle cx="75" cy="25" r="1" fill="currentColor" className="animate-pulse delay-300" />
            <circle cx="25" cy="75" r="1" fill="currentColor" className="animate-pulse delay-700" />
            <circle cx="75" cy="75" r="1" fill="currentColor" className="animate-pulse delay-1000" />
            <path d="M25 25 L75 25 L75 75 L25 75 Z" stroke="currentColor" strokeWidth="0.2" fill="none" />
            <path d="M25 25 L75 75" stroke="currentColor" strokeWidth="0.2" />
            <path d="M75 25 L25 75" stroke="currentColor" strokeWidth="0.2" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">System Control</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-red-900/30 hover:border-red-700 hover:text-red-300 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-1000">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name.split(' ')[0]}
          </h2>
          <p className="text-gray-400">
            Your system is running optimally. Here's your dashboard overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-300">
          {stats.map((stat, index) => (
            <Card 
              key={stat.id} 
              className="bg-gray-900/80 backdrop-blur-md border-gray-800 hover:border-gray-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className="text-blue-400">
                  {getIcon(stat.icon)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center text-xs">
                  {getTrendIcon(stat.trend)}
                  <span className={`ml-1 ${getTrendColor(stat.trend)}`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last hour</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Content */}
        <div className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
          <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white">All systems operational</span>
                  </div>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white">Network connectivity</span>
                  </div>
                  <span className="text-blue-400 text-sm">Stable</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-white">Security protocols</span>
                  </div>
                  <span className="text-yellow-400 text-sm">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;