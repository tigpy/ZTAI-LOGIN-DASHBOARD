import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';
import { useToast } from '../hooks/use-toast';
import { validateLogin, mockSocialLogin } from '../mock';
import { 
  Mail, 
  Lock, 
  Shield, 
  Loader2,
  Chrome,
  Smartphone,
  Twitter,
  Zap,
  Activity,
  Eye
} from 'lucide-react';

const ZTAILogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate security scan
    await new Promise(resolve => setTimeout(resolve, 1200));

    const result = validateLogin(email, password);
    
    if (result.success) {
      localStorage.setItem('user', JSON.stringify(result.user));
      toast({
        title: "Access Granted",
        description: `Welcome to ZTAI-Block, ${result.user.name}`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Access Denied",
        description: result.error,
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    
    try {
      const result = await mockSocialLogin(provider);
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        toast({
          title: "Social Login Successful",
          description: `Authenticated via ${provider}`,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Authentication Failed", 
        description: "Social login temporarily unavailable",
        variant: "destructive"
      });
    }
    
    setSocialLoading(null);
  };

  const getSocialIcon = (provider) => {
    switch (provider) {
      case 'google': return <Chrome className="h-5 w-5" />;
      case 'apple': return <Smartphone className="h-5 w-5" />;
      case 'twitter': return <Twitter className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Enhanced Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        {/* Corner Circuit Patterns */}
        <motion.div 
          className="absolute top-8 left-8 w-40 h-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400">
            <motion.circle 
              cx="20" cy="20" r="2" fill="currentColor" 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle 
              cx="80" cy="20" r="2" fill="currentColor"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle 
              cx="50" cy="80" r="2" fill="currentColor"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <path d="M20 20 L80 20 L50 80 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M20 20 L50 80" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 right-8 w-48 h-48 rotate-180"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
            <motion.circle 
              cx="30" cy="30" r="1.5" fill="currentColor"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.circle 
              cx="70" cy="30" r="1.5" fill="currentColor"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
            />
            <motion.circle 
              cx="50" cy="70" r="1.5" fill="currentColor"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
            />
            <path d="M30 30 L70 30 L50 70 L30 70 Z" stroke="currentColor" strokeWidth="0.3" fill="none" />
          </svg>
        </motion.div>

        {/* Additional glowing elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-blue-400 rounded-full"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md bg-gray-900/90 backdrop-blur-xl border-gray-800 shadow-2xl shadow-cyan-500/10 relative z-10">
          <CardHeader className="text-center pb-8 pt-8">
            {/* ZTAI-Block Logo */}
            <motion.div 
              className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 border-2 border-cyan-400/30"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Shield className="h-10 w-10 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-4 w-4 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Don't have an account yet?{' '}
              <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors font-medium">
                Sign up
              </span>
            </motion.p>
            <motion.div 
              className="text-xs text-cyan-500/60 mt-2 flex items-center justify-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Eye className="h-3 w-3" />
              Zero Trust AI + Blockchain Security
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 hover:bg-gray-800/70 focus:shadow-lg focus:shadow-cyan-500/20"
                  required
                />
              </motion.div>

              {/* Password Input */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 hover:bg-gray-800/70 focus:shadow-lg focus:shadow-cyan-500/20"
                  required
                />
              </motion.div>

              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="flex items-center gap-2">
                        Authenticating
                        <Activity className="h-4 w-4 animate-pulse" />
                      </span>
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Access ZTAI-Block
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Demo Credentials */}
            <motion.div 
              className="text-xs text-gray-500 text-center space-y-1 bg-gray-800/30 p-3 rounded-lg border border-gray-700/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-cyan-400 font-medium">Demo Accounts:</p>
              <p>👤 Admin: admin@ztai-block.com / admin123</p>
              <p>👤 Employee: employee@ztai-block.com / emp123</p>
              <p>👤 Client: client@ztai-block.com / client123</p>
              <p>👤 HR: hr@ztai-block.com / hr123</p>
            </motion.div>

            {/* Divider */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <Separator className="flex-1 bg-gray-700" />
              <span className="px-4 text-gray-400 text-sm">OR</span>
              <Separator className="flex-1 bg-gray-700" />
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div 
              className="grid grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {['google', 'apple', 'twitter'].map((provider, index) => (
                <motion.div
                  key={provider}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin(provider)}
                    disabled={socialLoading === provider}
                    className="p-3 bg-gray-800/50 border-gray-700 hover:bg-gray-700/70 hover:border-gray-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    {socialLoading === provider ? (
                      <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                    ) : (
                      <span className="text-gray-300 hover:text-white transition-colors">
                        {getSocialIcon(provider)}
                      </span>
                    )}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ZTAILogin;