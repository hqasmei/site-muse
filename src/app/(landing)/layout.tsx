import { LandingFooter } from '@/components/landing/landing-footer';
import LandingNavbar from '@/components/landing/landing-navbar';
import LandingNavbarMobile from '@/components/landing/landing-navbar-mobile';

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <LandingNavbar />
      <LandingNavbarMobile />
      {children}
      <LandingFooter />
    </div>
  );
};

export default LandingLayout;
