import { Dashboard } from '@/components/dashboard';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

const DashboardPage = async () => {
  const user = await currentUser();

  const data = await prismadb.project.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  });

  return <Dashboard data={data} />;
};

export default DashboardPage;
