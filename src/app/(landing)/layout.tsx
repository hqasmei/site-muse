import LandingNavbar from "@/components/landing/landing-navbar";
import LandingNavbarMobile from "@/components/landing/landing-navbar-mobile";
import { LandingFooter } from "@/components/landing/landing-footer";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingNavbar />
      <LandingNavbarMobile />
      <main className="h-full overflow-auto">{children}</main>
      <LandingFooter />
    </>
  );
};

export default LandingLayout;
