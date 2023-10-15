import { redirect } from "next/navigation";

import { checkUserIsCurator } from "@/services/dataBaseService";
import CuratorEditDescriptionForm from "./CuratorEditDescriptionForm";

const CuratorEditDescriptionPage = async () => {
  const getCurator = await checkUserIsCurator();

  if (
    !getCurator.success ||
    !getCurator.isCurator ||
    getCurator.curator === undefined
  )
    redirect("/");
  const {
    curator: { name, profile },
  } = getCurator;
  return (
    <main>
      <h1>Curator Edit Description</h1>
      <CuratorEditDescriptionForm
        name={name}
        currentProfile={profile}
      />
    </main>
  );
};

export default CuratorEditDescriptionPage;
