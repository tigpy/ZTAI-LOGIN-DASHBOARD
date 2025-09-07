import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';
import { useToast } from '../hooks/use-toast';
import { validateLogin, mockSocialLogin } from '../mock';
import { 
  Mail, 
  Lock, 
  Cpu, 
  Loader2,
  Chrome,
  Smartphone,
  Twitter
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = validateLogin(email, password);
    
    if (result.success) {
      localStorage.setItem('user', JSON.stringify(result.user));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${result.user.name}!`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login Failed",
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
          title: "Login Successful",
          description: `Welcome, ${result.user.name}!`,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Social Login Failed", 
        description: "Please try again later",
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
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 left-8 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
            <circle cx="20" cy="20" r="2" fill="currentColor" className="animate-pulse" />
            <circle cx="80" cy="20" r="2" fill="currentColor" className="animate-pulse delay-500" />
            <circle cx="50" cy="80" r="2" fill="currentColor" className="animate-pulse delay-1000" />
            <path d="M20 20 L80 20 L50 80 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M20 20 L50 80" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 w-40 h-40 rotate-180">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <circle cx="30" cy="30" r="1.5" fill="currentColor" className="animate-pulse delay-300" />
            <circle cx="70" cy="30" r="1.5" fill="currentColor" className="animate-pulse delay-700" />
            <circle cx="50" cy="70" r="1.5" fill="currentColor" className="animate-pulse delay-1200" />
            <circle cx="30" cy="70" r="1.5" fill="currentColor" className="animate-pulse delay-200" />
            <path d="M30 30 L70 30 L50 70 L30 70 Z" stroke="currentColor" strokeWidth="0.3" fill="none" />
          </svg>
        </div>
      </div>

      {/* Main Login Card */}
      <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-md border-gray-800 shadow-2xl relative z-10 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
        <CardHeader className="text-center pb-8 pt-8">
          {/* Futuristic Logo */}
          <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Cpu className="h-8 w-8 text-white animate-pulse" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Don't have an account yet?{' '}
            <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
              Sign up
            </span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-800/70"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-800/70"
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>Demo credentials:</p>
            <p>admin@futuristic.com / admin123</p>
            <p>user@demo.com / demo123</p>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <Separator className="flex-1 bg-gray-700" />
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <Separator className="flex-1 bg-gray-700" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {['google', 'apple', 'twitter'].map((provider) => (
              <Button
                key={provider}
                variant="outline"
                onClick={() => handleSocialLogin(provider)}
                disabled={socialLoading === provider}
                className="p-3 bg-gray-800/50 border-gray-700 hover:bg-gray-700/70 hover:border-gray-600 transition-all duration-200 transform hover:scale-105"
              >
                {socialLoading === provider ? (
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                ) : (
                  <span className="text-gray-300 hover:text-white transition-colors">
                    {getSocialIcon(provider)}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;