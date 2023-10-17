const CuratorDashboardPage = async ({
  params: { curatorName },
}: {
  params: { curatorName: string };
}) => {
  return (
    <main>
      <h1>{curatorName} Dashboard</h1>
    </main>
  );
};

export default CuratorDashboardPage;
