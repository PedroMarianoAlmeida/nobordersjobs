import { getCurrentPath } from "@/utils/routeUtils";

const JobDetailsLayout = ({ children }: { children: React.ReactNode }) => {
  const currentPath = getCurrentPath(children);
  console.log("layout", { currentPath });
  return <>{children}</>;
};
export default JobDetailsLayout;
