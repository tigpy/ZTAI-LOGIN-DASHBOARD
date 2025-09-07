// Enhanced ZTAI-Block mock data and validation

export const mockUsers = [
  {
    id: 1,
    email: "admin@ztai-block.com",
    password: "admin123",
    name: "Admin User",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    email: "employee@ztai-block.com", 
    password: "emp123",
    name: "John Smith",
    role: "Employee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    email: "client@ztai-block.com",
    password: "client123", 
    name: "Sarah Johnson",
    role: "Client",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    email: "hr@ztai-block.com",
    password: "hr123",
    name: "Mike Wilson", 
    role: "HR",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  }
];

export const mockAccessFeed = [
  {
    id: 1,
    user: "alice.chen@ztai.com",
    location: "San Francisco, US",
    risk: "low",
    decision: "allowed",
    timestamp: new Date(Date.now() - 2000),
    ip: "192.168.1.45",
    device: "MacBook Pro"
  },
  {
    id: 2,
    user: "bob.martinez@ztai.com", 
    location: "Mexico City, MX",
    risk: "medium",
    decision: "allowed",
    timestamp: new Date(Date.now() - 15000),
    ip: "10.0.0.23",
    device: "iPhone 15"
  },
  {
    id: 3,
    user: "eve.hacker@unknown.net",
    location: "Unknown Location",
    risk: "high", 
    decision: "denied",
    timestamp: new Date(Date.now() - 30000),
    ip: "203.0.113.42",
    device: "Linux Terminal"
  },
  {
    id: 4,
    user: "charlie.dev@ztai.com",
    location: "London, UK",
    risk: "low",
    decision: "allowed", 
    timestamp: new Date(Date.now() - 45000),
    ip: "172.16.0.10",
    device: "Windows 11"
  },
  {
    id: 5,
    user: "suspicious.user@temp.mail",
    location: "Moscow, RU",
    risk: "high",
    decision: "denied",
    timestamp: new Date(Date.now() - 60000),
    ip: "198.51.100.8",
    device: "Android"
  },
  {
    id: 6,
    user: "diana.admin@ztai.com",
    location: "Tokyo, JP", 
    risk: "medium",
    decision: "allowed",
    timestamp: new Date(Date.now() - 90000),
    ip: "203.0.113.15",
    device: "iPad"
  },
  {
    id: 7,
    user: "frank.wilson@ztai.com",
    location: "Sydney, AU",
    risk: "low",
    decision: "allowed",
    timestamp: new Date(Date.now() - 120000),
    ip: "10.20.30.40",
    device: "MacBook Air"
  },
  {
    id: 8,
    user: "malware.bot@darkweb.onion",
    location: "Unknown Location",
    risk: "high",
    decision: "denied",
    timestamp: new Date(Date.now() - 150000),
    ip: "192.0.2.123",
    device: "Bot Network"
  },
  {
    id: 9,
    user: "grace.kim@ztai.com",
    location: "Seoul, KR",
    risk: "low",
    decision: "allowed",
    timestamp: new Date(Date.now() - 180000),
    ip: "172.31.0.100",
    device: "Galaxy S24"
  },
  {
    id: 10,
    user: "henry.jones@ztai.com",
    location: "Berlin, DE",
    risk: "medium",
    decision: "allowed",
    timestamp: new Date(Date.now() - 210000),
    ip: "10.0.1.50",
    device: "ThinkPad X1"
  },
  {
    id: 11,
    user: "threat.actor@anon.net",
    location: "Proxy Server",
    risk: "high",
    decision: "denied",
    timestamp: new Date(Date.now() - 240000),
    ip: "198.51.100.255",
    device: "Kali Linux"
  },
  {
    id: 12,
    user: "isabel.garcia@ztai.com",
    location: "Madrid, ES",
    risk: "low",
    decision: "allowed",
    timestamp: new Date(Date.now() - 270000),
    ip: "192.168.0.75",
    device: "Surface Pro"
  },
  {
    id: 13,
    user: "jack.developer@ztai.com",
    location: "Toronto, CA",
    risk: "medium",
    decision: "allowed",
    timestamp: new Date(Date.now() - 300000),
    ip: "10.10.10.25",
    device: "iMac"
  },
  {
    id: 14,
    user: "phishing.attempt@fake.com",
    location: "VPN Exit Node",
    risk: "high",
    decision: "denied",
    timestamp: new Date(Date.now() - 330000),
    ip: "203.0.113.99",
    device: "Mobile Device"
  },
  {
    id: 15,
    user: "kate.analyst@ztai.com",
    location: "Mumbai, IN",
    risk: "low",
    decision: "allowed",
    timestamp: new Date(Date.now() - 360000),
    ip: "172.16.5.10",
    device: "Dell XPS"
  }
];

export const mockAnomalyAlerts = [
  {
    id: 1,
    type: "Unusual Login Pattern",
    user: "eve.hacker@unknown.net",
    severity: "high",
    description: "Multiple failed login attempts from different geographic locations",
    timestamp: new Date(Date.now() - 5000),
    status: "active"
  },
  {
    id: 2,
    type: "Data Exfiltration Attempt", 
    user: "suspicious.user@temp.mail",
    severity: "critical",
    description: "Attempting to download large datasets outside business hours",
    timestamp: new Date(Date.now() - 180000),
    status: "active"
  },
  {
    id: 3,
    type: "Anomalous API Usage",
    user: "bob.martinez@ztai.com",
    severity: "medium", 
    description: "API calls 300% above normal baseline",
    timestamp: new Date(Date.now() - 300000),
    status: "investigating"
  }
];

export const mockBlockchainLogs = [
  {
    id: 1,
    action: "Access Granted",
    user: "alice.chen@ztai.com",
    hash: "0x8f9b2c7d1e6a5b4c9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5",
    blockNumber: 245891,
    timestamp: new Date(Date.now() - 2000),
    gasUsed: "21000"
  },
  {
    id: 2, 
    action: "Access Denied",
    user: "eve.hacker@unknown.net",
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
    blockNumber: 245892,
    timestamp: new Date(Date.now() - 30000),
    gasUsed: "18500"
  },
  {
    id: 3,
    action: "Anomaly Detected", 
    user: "suspicious.user@temp.mail",
    hash: "0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7",
    blockNumber: 245893,
    timestamp: new Date(Date.now() - 60000),
    gasUsed: "25000"
  }
];

export const mockDashboardStats = {
  totalAccessAttempts: 15847,
  allowedAccess: 13892,
  deniedAccess: 1955,
  highRiskAlerts: 7,
  activeAnomalies: 3,
  blockchainEntries: 245893,
  systemUptime: "99.97%",
  averageResponseTime: "0.23s"
};

export const validateLogin = (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar
      }
    };
  }
  return {
    success: false,
    error: "Invalid credentials or unauthorized access"
  };
};

export const mockSocialLogin = (provider) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          id: 999,
          email: `user@${provider}.com`,
          name: `${provider} User`,
          role: "Client",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
        }
      });
    }, 1500);
  });
};

// Live feed simulation
export const generateLiveAccessEvent = () => {
  const users = [
    "alice.chen@ztai.com", "bob.martinez@ztai.com", "charlie.dev@ztai.com",
    "diana.admin@ztai.com", "eve.hacker@unknown.net", "frank.user@ztai.com"
  ];
  
  const locations = [
    "San Francisco, US", "London, UK", "Tokyo, JP", "Sydney, AU", 
    "Berlin, DE", "Singapore, SG", "Unknown Location", "Moscow, RU"
  ];
  
  const devices = ["MacBook Pro", "iPhone 15", "Windows 11", "Android", "iPad", "Linux Terminal"];
  
  const riskLevels = ["low", "medium", "high"];
  const decisions = ["allowed", "denied"];
  
  const user = users[Math.floor(Math.random() * users.length)];
  const isHighRisk = user.includes("hacker") || user.includes("suspicious");
  const risk = isHighRisk ? "high" : riskLevels[Math.floor(Math.random() * 2)]; // Bias towards low/medium
  const decision = risk === "high" ? "denied" : (Math.random() > 0.1 ? "allowed" : "denied");
  
  return {
    id: Date.now(),
    user,
    location: locations[Math.floor(Math.random() * locations.length)],
    risk,
    decision,
    timestamp: new Date(),
    ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    device: devices[Math.floor(Math.random() * devices.length)]
  };
};