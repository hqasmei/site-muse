import LandingNavbar from '@/components/landing/landing-navbar';
import LandingNavbarMobile from '@/components/landing/landing-navbar-mobile';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingNavbar />
      <LandingNavbarMobile />
      <main className="h-full flex items-center justify-center pt-20">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
