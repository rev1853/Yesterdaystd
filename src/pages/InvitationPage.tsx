import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { Camera, Lock, ArrowRight } from 'lucide-react';

export default function InvitationPage() {
  const { inviteCode } = useParams();
  const { user, albums } = useApp();
  const navigate = useNavigate();

  const album = albums.find(a => a.inviteCode === inviteCode);

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      // Store the invitation code to redirect after login
      sessionStorage.setItem('pendingInvite', inviteCode || '');
      navigate('/login');
    }
  }, [user, navigate, inviteCode]);

  if (!album) {
    return (
      <div className="min-h-screen bg-[#0d0d0d]">
        <Navbar />
        <div className="pt-[120px] sm:pt-[150px] md:pt-[180px] lg:pt-[200px] pb-[60px] sm:pb-[80px] lg:pb-[100px] px-4 sm:px-8 md:px-16 lg:px-[138px] text-center">
          <Lock className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-neutral-700 mx-auto mb-4 sm:mb-5 lg:mb-6" />
          <h1 className="font-['Inter'] font-extrabold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] text-neutral-100 tracking-[-1.4px] sm:tracking-[-1.8px] md:tracking-[-2.1px] lg:tracking-[-2.4px] mb-3 sm:mb-4">
            Invalid Invitation
          </h1>
          <p className="font-['Inter'] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-neutral-400 tracking-[-0.7px] sm:tracking-[-0.8px] md:tracking-[-0.9px] lg:tracking-[-1px] mb-6 sm:mb-7 lg:mb-8">
            This invitation link is not valid or has expired.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-neutral-100 text-[#0d0d0d] rounded-xl font-['Inter'] font-extrabold text-[13px] sm:text-[14px] lg:text-[16px] tracking-[-0.65px] sm:tracking-[-0.7px] lg:tracking-[-0.8px] hover:bg-neutral-200 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Only clients should be able to access invitations
  if (user && user.role !== 'client') {
    return (
      <div className="min-h-screen bg-[#0d0d0d]">
        <Navbar />
        <div className="pt-[120px] sm:pt-[150px] md:pt-[180px] lg:pt-[200px] pb-[60px] sm:pb-[80px] lg:pb-[100px] px-4 sm:px-8 md:px-16 lg:px-[138px] text-center">
          <Lock className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-neutral-700 mx-auto mb-4 sm:mb-5 lg:mb-6" />
          <h1 className="font-['Inter'] font-extrabold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] text-neutral-100 tracking-[-1.4px] sm:tracking-[-1.8px] md:tracking-[-2.1px] lg:tracking-[-2.4px] mb-3 sm:mb-4">
            Access Denied
          </h1>
          <p className="font-['Inter'] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-neutral-400 tracking-[-0.7px] sm:tracking-[-0.8px] md:tracking-[-0.9px] lg:tracking-[-1px] mb-6 sm:mb-7 lg:mb-8">
            Only clients can access invitation links.
          </p>
        </div>
      </div>
    );
  }

  const handleAcceptInvitation = () => {
    navigate(`/album/${album.id}`);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      
      <div className="pt-[120px] sm:pt-[150px] md:pt-[180px] lg:pt-[200px] pb-[60px] sm:pb-[80px] lg:pb-[100px] px-4 sm:px-8 md:px-16 lg:px-[138px]">
        <div className="max-w-full sm:max-w-[90%] lg:max-w-[800px] mx-auto text-center">
          <div className="mb-6 sm:mb-7 lg:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6">
              <Camera className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <h1 className="font-['Inter'] font-extrabold text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] text-neutral-100 tracking-[-1.6px] sm:tracking-[-2.4px] md:tracking-[-2.8px] lg:tracking-[-3.2px] mb-3 sm:mb-4">
              You're Invited!
            </h1>
            <p className="font-['Inter'] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-neutral-400 tracking-[-0.7px] sm:tracking-[-0.8px] md:tracking-[-0.9px] lg:tracking-[-1px]">
              {album.creatorName} has shared an album with you
            </p>
          </div>

          <div className="bg-[#1e1e1e] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-neutral-800 mb-6 sm:mb-7 lg:mb-8">
            <div 
              className="h-[250px] sm:h-[320px] md:h-[360px] lg:h-[400px] bg-cover bg-center"
              style={{ backgroundImage: `url(${album.coverImage})` }}
            />
            <div className="p-5 sm:p-6 lg:p-8 text-left">
              <h2 className="font-['Inter'] font-extrabold text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] text-neutral-100 tracking-[-1.1px] sm:tracking-[-1.3px] md:tracking-[-1.5px] lg:tracking-[-1.6px] mb-2">
                {album.title}
              </h2>
              <p className="font-['Inter'] text-[13px] sm:text-[14px] lg:text-[16px] text-neutral-400 mb-3 sm:mb-4">
                {album.date}
              </p>
              {album.description && (
                <p className="font-['Inter'] text-[13px] sm:text-[14px] lg:text-[16px] text-neutral-300 mb-4 sm:mb-5 lg:mb-6">
                  {album.description}
                </p>
              )}
              <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-500">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-['Inter'] text-[12px] sm:text-[13px] lg:text-[14px]">
                  {album.photos.length} photos to choose from
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAcceptInvitation}
            className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-3 sm:py-4 lg:py-5 bg-neutral-100 text-[#0d0d0d] rounded-xl font-['Inter'] font-extrabold text-[14px] sm:text-[16px] lg:text-[18px] tracking-[-0.7px] sm:tracking-[-0.8px] lg:tracking-[-0.9px] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 sm:gap-3 mx-auto"
          >
            View Album & Select Photos
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="mt-8 sm:mt-10 lg:mt-12 p-4 sm:p-5 lg:p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <p className="font-['Inter'] text-[12px] sm:text-[13px] lg:text-[14px] text-blue-400">
              💡 Browse the album and select your favorite photos. Your photographer will receive your selection and begin editing!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}