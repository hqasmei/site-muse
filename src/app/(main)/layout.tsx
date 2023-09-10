import Navbar from "@/components/navbar";
import NavbarMobile from "@/components/navbar-mobile";

import { currentUser } from "@clerk/nextjs";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <>
      <Navbar />
      <NavbarMobile />
      <main className="mx-auto max-w-7xl p-4 md:p-10">{children}</main>
    </>
  );
};

export default MainLayout;
