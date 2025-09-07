// Mock data and validation for the futuristic login app

export const mockUsers = [
  {
    id: 1,
    email: "admin@futuristic.com",
    password: "admin123",
    name: "Admin User",
    role: "Administrator"
  },
  {
    id: 2,
    email: "user@demo.com", 
    password: "demo123",
    name: "Demo User",
    role: "User"
  }
];

export const mockDashboardStats = [
  {
    id: 1,
    title: "Active Systems",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: "activity"
  },
  {
    id: 2,
    title: "Network Nodes",
    value: "156",
    change: "+3.2%", 
    trend: "up",
    icon: "network"
  },
  {
    id: 3,
    title: "Data Processed",
    value: "8.2TB",
    change: "+18.7%",
    trend: "up", 
    icon: "database"
  },
  {
    id: 4,
    title: "Security Level",
    value: "99.9%",
    change: "0.0%",
    trend: "stable",
    icon: "shield"
  }
];

export const validateLogin = (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
  return {
    success: false,
    error: "Invalid email or password"
  };
};

export const mockSocialLogin = (provider) => {
  // Simulate social login success
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          id: 999,
          email: `user@${provider}.com`,
          name: `${provider} User`,
          role: "User"
        }
      });
    }, 1500); // Simulate API delay
  });
};