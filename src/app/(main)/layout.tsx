import BottomNav from '@/components/bottom-nav';
import Navbar from '@/components/navbar';
import NavbarMobile from '@/components/navbar-mobile';
import SideNav from '@/components/side-nav';
import { currentUser } from '@clerk/nextjs';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1 sm:ml-[65px] md:ml-[220px]">{children}</main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
