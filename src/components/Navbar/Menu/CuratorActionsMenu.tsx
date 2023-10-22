"use client";
// TODO: Check if is possible run this code in server side
import { useState, useEffect } from "react";
import Link from "next/link";
import { checkUserIsCurator } from "@/services/dataBaseServices/curatorServices";

const PostJobButton = () => {
  const [isCurator, setIsCurator] = useState(false);
  const [curatorName, setCuratorName] = useState("");

  const getIsUserCurator = async () => {
    const isCuratorChecker = await checkUserIsCurator();
    if (isCuratorChecker.success) {
      setIsCurator(isCuratorChecker.isCurator);

      if (isCuratorChecker.isCurator && isCuratorChecker.curator) {
        setCuratorName(isCuratorChecker.curator.name);
      }
    } else setIsCurator(false);
  };

  useEffect(() => {
    getIsUserCurator();
  }, []);

  if (!isCurator) return null;

  return (
    <>
      <li>
        <Link href="/curator/edit-description">
          <button>Edit Profile</button>
        </Link>
      </li>
      <li>
        <Link href="/job/new">
          <button>New Job</button>
        </Link>
      </li>
      <li>
        <Link href={`/curator/${curatorName}/job-list`}>
          <button>Jobs List</button>
        </Link>
      </li>
    </>
  );
};

export default PostJobButton;
