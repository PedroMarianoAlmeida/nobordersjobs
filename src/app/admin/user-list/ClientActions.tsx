"use client";

import {
  demoteUserFromCurator,
  promoteUserToCurator,
} from "@/services/dataBaseServices/curatorServices";

interface ClientActionsProps {
  isCurator: boolean;
  name: string;
}

// TODO: what to do with the own user in the list?
// TODO: add something to confirm the action (and maybe loading state)
const ClientActions = ({ isCurator, name }: ClientActionsProps) => {
  if (isCurator)
    return (
      <button
        className="btn btn-error"
        onClick={() => demoteUserFromCurator(name)}
      >
        Remove curator access
      </button>
    );

  return (
    <button className="btn btn-info" onClick={() => promoteUserToCurator(name)}>
      Add curator access
    </button>
  );
};

export default ClientActions;
