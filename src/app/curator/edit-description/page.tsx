import { redirect } from "next/navigation";

import CuratorEditDescriptionForm from "./CuratorEditDescriptionForm";
import { checkUserIsCurator } from "@/services/dataBaseServices/curatorServices";

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

      <CuratorEditDescriptionForm name={name} currentProfile={profile} />
    </main>
  );
};

export default CuratorEditDescriptionPage;
