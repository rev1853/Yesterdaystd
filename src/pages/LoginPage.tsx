import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { User, Camera, Shield } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'creator' | 'client'>('client');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, selectedRole);
    
    switch (selectedRole) {
      case 'admin':
        navigate('/admin');
        break;
      case 'creator':
        navigate('/creator');
        break;
      case 'client':
        navigate('/client');
        break;
    }
  };

  const roles = [
    { value: 'client', label: 'Client', icon: User, desc: 'View and select photos from your albums' },
    { value: 'creator', label: 'Creator', icon: Camera, desc: 'Upload albums and manage photo selections' },
    { value: 'admin', label: 'Admin', icon: Shield, desc: 'Manage users and moderate content' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      
      <div className="pt-[120px] sm:pt-[150px] md:pt-[180px] lg:pt-[200px] pb-[60px] sm:pb-[80px] lg:pb-[100px] px-4 sm:px-8 md:px-16 lg:px-[138px]">
        <div className="max-w-[90%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h1 className="font-['Inter'] font-extrabold text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] text-neutral-100 tracking-[-1.6px] sm:tracking-[-2.4px] md:tracking-[-2.8px] lg:tracking-[-3.2px] mb-3 sm:mb-4">
              Welcome Back
            </h1>
            <p className="font-['Inter'] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-neutral-400 tracking-[-0.7px] sm:tracking-[-0.8px] md:tracking-[-0.9px] lg:tracking-[-1px]">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <p className="font-['Inter'] font-medium text-[14px] sm:text-[15px] lg:text-[16px] text-neutral-100 mb-3 sm:mb-4">
                Select your role:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value as any)}
                    className={`p-4 sm:p-5 lg:p-6 rounded-xl border-2 transition-all ${
                      selectedRole === role.value
                        ? 'border-neutral-100 bg-neutral-100/5'
                        : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                    }`}
                  >
                    <role.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mb-2 sm:mb-3 mx-auto ${
                      selectedRole === role.value ? 'text-neutral-100' : 'text-neutral-500'
                    }`} />
                    <p className={`font-['Inter'] font-medium text-[13px] sm:text-[14px] mb-1 ${
                      selectedRole === role.value ? 'text-neutral-100' : 'text-neutral-400'
                    }`}>
                      {role.label}
                    </p>
                    <p className="font-['Inter'] text-[9px] sm:text-[10px] text-neutral-600">
                      {role.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-['Inter'] font-medium text-[13px] sm:text-[14px] text-neutral-100 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 bg-[#1e1e1e] border-2 border-neutral-800 rounded-xl text-neutral-100 font-['Inter'] text-[14px] sm:text-[15px] lg:text-[16px] focus:outline-none focus:border-neutral-600 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block font-['Inter'] font-medium text-[13px] sm:text-[14px] text-neutral-100 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 bg-[#1e1e1e] border-2 border-neutral-800 rounded-xl text-neutral-100 font-['Inter'] text-[14px] sm:text-[15px] lg:text-[16px] focus:outline-none focus:border-neutral-600 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 lg:py-4 bg-neutral-100 text-[#0d0d0d] rounded-xl font-['Inter'] font-extrabold text-[14px] sm:text-[15px] lg:text-[16px] tracking-[-0.7px] sm:tracking-[-0.75px] lg:tracking-[-0.8px] hover:bg-neutral-200 transition-colors"
            >
              Sign In
            </button>

            <div className="text-center mt-5 sm:mt-6 space-y-2">
              <p className="font-['Inter'] text-[13px] sm:text-[14px] text-neutral-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-neutral-100 hover:underline">
                  Sign up as a client
                </Link>
              </p>
              <p className="font-['Inter'] text-[11px] sm:text-[12px] text-neutral-500">
                Demo mode: Any email/password combination works
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}