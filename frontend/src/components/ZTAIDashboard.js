import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  mockAccessFeed, 
  mockAnomalyAlerts, 
  mockBlockchainLogs, 
  mockDashboardStats,
  generateLiveAccessEvent 
} from '../mock';
import { 
  LogOut, 
  Shield, 
  AlertTriangle,
  Activity,
  Eye,
  Globe,
  Users,
  Clock,
  Database,
  Zap,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Monitor,
  Smartphone,
  Server
} from 'lucide-react';

const ZTAIDashboard = () => {
  const [user, setUser] = useState(null);
  const [accessFeed, setAccessFeed] = useState([]);
  const [anomalyAlerts, setAnomalyAlerts] = useState([]);
  const [blockchainLogs, setBlockchainLogs] = useState([]);
  const [stats, setStats] = useState(mockDashboardStats);
  const [newEventAnimation, setNewEventAnimation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    setUser(JSON.parse(userData));
    setAccessFeed(mockAccessFeed);
    setAnomalyAlerts(mockAnomalyAlerts);
    setBlockchainLogs(mockBlockchainLogs);

    // Simulate live feed updates
    const interval = setInterval(() => {
      const newEvent = generateLiveAccessEvent();
      setAccessFeed(prev => [newEvent, ...prev.slice(0, 9)]);
      setNewEventAnimation(newEvent.id);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalAccessAttempts: prev.totalAccessAttempts + 1,
        allowedAccess: newEvent.decision === 'allowed' ? prev.allowedAccess + 1 : prev.allowedAccess,
        deniedAccess: newEvent.decision === 'denied' ? prev.deniedAccess + 1 : prev.deniedAccess,
        highRiskAlerts: newEvent.risk === 'high' ? prev.highRiskAlerts + 1 : prev.highRiskAlerts
      }));

      setTimeout(() => setNewEventAnimation(null), 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDecisionIcon = (decision) => {
    return decision === 'allowed' ? 
      <CheckCircle className="h-4 w-4 text-green-400" /> : 
      <XCircle className="h-4 w-4 text-red-400" />;
  };

  const getDecisionBadge = (decision) => {
    return decision === 'allowed' ? 
      'bg-green-500/20 text-green-400 border-green-500/30' : 
      'bg-red-500/20 text-red-400 border-red-500/30';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const allowedPercentage = Math.round((stats.allowedAccess / stats.totalAccessAttempts) * 100);
  const deniedPercentage = 100 - allowedPercentage;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400">
            <circle cx="50" cy="20" r="2" fill="currentColor" />
            <circle cx="80" cy="50" r="2" fill="currentColor" />
            <circle cx="50" cy="80" r="2" fill="currentColor" />
            <circle cx="20" cy="50" r="2" fill="currentColor" />
            <path d="M50 20 L80 50 L50 80 L20 50 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </svg>
        </motion.div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ZTAI-Block</h1>
                <p className="text-xs text-cyan-400">Zero Trust AI + Blockchain</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-cyan-400">{user.role} Dashboard</p>
              </div>
              <Avatar className="h-8 w-8 border-2 border-cyan-400/50">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-cyan-500 text-white text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-red-900/30 hover:border-red-700 hover:text-red-300 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Real-Time Monitoring Dashboard
          </h2>
          <p className="text-gray-400 flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-400 animate-pulse" />
            System operational • Last updated: {formatTimestamp(new Date())}
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { title: "Total Access Attempts", value: stats.totalAccessAttempts.toLocaleString(), icon: Users, color: "text-blue-400" },
            { title: "System Uptime", value: stats.systemUptime, icon: Activity, color: "text-green-400" },
            { title: "Avg Response Time", value: stats.averageResponseTime, icon: Clock, color: "text-cyan-400" },
            { title: "Blockchain Entries", value: stats.blockchainEntries.toLocaleString(), icon: Database, color: "text-purple-400" }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800 hover:border-gray-700 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ZTAI-Block Access Monitor */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="h-5 w-5 text-cyan-400" />
                  ZTAI-Block Access Monitor
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-auto">
                    <Activity className="h-3 w-3 mr-1 animate-pulse" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-400 pb-2 border-b border-gray-700">
                    <div className="col-span-4">User</div>
                    <div className="col-span-3">Location</div>
                    <div className="col-span-2">Risk</div>
                    <div className="col-span-2">Decision</div>
                    <div className="col-span-1">Time</div>
                  </div>
                  <AnimatePresence>
                    {accessFeed.map((event) => (
                      <motion.div
                        key={event.id}
                        className={`grid grid-cols-12 gap-4 text-sm py-2.5 px-2 rounded-lg transition-all duration-300 ${
                          newEventAnimation === event.id 
                            ? 'bg-cyan-500/20 border border-cyan-500/30' 
                            : 'hover:bg-gray-800/50'
                        }`}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="col-span-4 text-gray-300 truncate">{event.user}</div>
                        <div className="col-span-3 text-gray-400 flex items-center gap-1 truncate">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-2 rounded-full ${getRiskColor(event.risk)}`} />
                            <Badge className={`text-xs ${getRiskBadgeColor(event.risk)}`}>
                              {event.risk}
                            </Badge>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Badge className={`text-xs flex items-center gap-1 ${getDecisionBadge(event.decision)}`}>
                            {getDecisionIcon(event.decision)}
                            {event.decision}
                          </Badge>
                        </div>
                        <div className="col-span-1 text-xs text-gray-500">
                          {formatTimestamp(event.timestamp)}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side Cards */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* High-Risk Alerts */}
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  High-Risk Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <motion.div 
                    className="text-4xl font-bold text-red-400 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stats.highRiskAlerts}
                  </motion.div>
                  <p className="text-gray-400 text-sm">in last 10 minutes</p>
                  <div className="mt-4 space-y-2">
                    {anomalyAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="text-left p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-xs text-red-400 font-medium">{alert.type}</p>
                        <p className="text-xs text-gray-400 truncate">{alert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decision Stats */}
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Decision Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Allowed</span>
                    <span className="text-sm font-medium text-green-400">{allowedPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${allowedPercentage}%` }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Denied</span>
                    <span className="text-sm font-medium text-red-400">{deniedPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${deniedPercentage}%` }}
                      transition={{ duration: 1.5, delay: 1.0 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Anomaly Detection */}
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Anomaly Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Active Scans</span>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      <Activity className="h-3 w-3 mr-1 animate-pulse" />
                      Running
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    • Pattern Recognition: Active
                    <br />
                    • Behavioral Analysis: Active  
                    <br />
                    • Threat Prediction: Active
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Logger */}
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Blockchain Logger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">Immutable log entry recorded</span>
                  </div>
                  <div className="text-xs text-gray-500 font-mono bg-gray-800/50 p-2 rounded">
                    Block #{stats.blockchainEntries}
                    <br />
                    Hash: 0x8f9b...7b6a5
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Content Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Network Topology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  Network Topology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { node: "Core Gateway", status: "online", connections: 24 },
                      { node: "Edge Nodes", status: "online", connections: 156 },
                      { node: "Client Endpoints", status: "monitoring", connections: 2847 }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2 animate-pulse"></div>
                        <p className="text-xs font-medium text-white">{item.node}</p>
                        <p className="text-xs text-gray-400">{item.connections} active</p>
                        <Badge className="mt-1 bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400">Secure Connections</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400">Under Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400">Blocked</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Blockchain Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="h-5 w-5 text-yellow-400" />
                  Recent Blockchain Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blockchainLogs.slice(0, 4).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <div>
                          <p className="text-sm text-white font-medium">{log.action}</p>
                          <p className="text-xs text-gray-400 truncate max-w-48">{log.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-yellow-400 font-mono">#{log.blockNumber}</p>
                        <p className="text-xs text-gray-500">{formatTimestamp(log.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-4">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      <Database className="h-3 w-3 mr-1" />
                      {stats.blockchainEntries.toLocaleString()} Total Entries
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* System Performance & Threat Intelligence */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Server className="h-5 w-5 text-green-400" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "CPU Usage", value: "23%", color: "bg-green-500" },
                    { metric: "Memory", value: "67%", color: "bg-yellow-500" },
                    { metric: "Network I/O", value: "12%", color: "bg-green-500" },
                    { metric: "Storage", value: "45%", color: "bg-green-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{item.metric}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <motion.div 
                            className={`${item.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: item.value }}
                            transition={{ duration: 1.5, delay: 1.2 + index * 0.1 }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-8">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Threat Intelligence Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                  Threat Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { threat: "New IoC detected", severity: "medium", time: "2m ago" },
                    { threat: "Suspicious domain activity", severity: "high", time: "5m ago" },
                    { threat: "Malware signature update", severity: "low", time: "8m ago" },
                    { threat: "Geolocation anomaly", severity: "medium", time: "12m ago" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          item.severity === 'high' ? 'bg-red-400' : 
                          item.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                        } animate-pulse`}></div>
                        <span className="text-sm text-gray-300">{item.threat}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Posture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Security Posture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <motion.div 
                    className="text-4xl font-bold text-cyan-400 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    A+
                  </motion.div>
                  <p className="text-gray-400 text-sm">Overall Security Score</p>
                </div>
                <div className="space-y-2">
                  {[
                    { component: "Access Control", score: 98 },
                    { component: "Data Protection", score: 95 },
                    { component: "Network Security", score: 97 },
                    { component: "Compliance", score: 99 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{item.component}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-1">
                          <motion.div 
                            className="bg-cyan-400 h-1 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ duration: 1.8, delay: 1.4 + index * 0.1 }}
                          />
                        </div>
                        <span className="text-xs text-cyan-400 w-6">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ZTAIDashboard;