"use client";
// TODO: Check if is possible run this code in server side
import { useState, useEffect } from "react";
import { checkUserIsCurator } from "@/services/dataBaseService";
import Link from "next/link";

const PostJobButton = () => {
  const [isCurator, setIsCurator] = useState(false);

  const getIsUserCurator = async () => {
    const isCuratorChecker = await checkUserIsCurator();
    if (isCuratorChecker.success) setIsCurator(isCuratorChecker.isCurator);
    else setIsCurator(false);
  };

  useEffect(() => {
    getIsUserCurator();
  }, []);

  if (!isCurator) return null;

  return (
    <>
      <li>
        <Link href="/job/new">
          <button>Post Job</button>
        </Link>
      </li>
      <li>
        <Link href="/curator/edit-description">
          <button>Edit Profile</button>
        </Link>
      </li>
    </>
  );
};

export default PostJobButton;
