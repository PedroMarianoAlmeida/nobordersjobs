"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import PostJobButton from "./CuratorActionsMenu";
import { MenuChildProps } from ".";

const UserMenu = ({ menuState, setMenuState }: MenuChildProps) => {
  const { data: session } = useSession();

  if (!session || session.user === undefined)
    return (
      <button className="btn btn-primary" onClick={() => signIn()}>
        SignIn
      </button>
    );
  const userImage = session.user.image;

  return (
    <div className="relative">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar"
        onClick={() =>
          setMenuState((prev) => (prev === "user" ? null : "user"))
        }
      >
        <div className="w-10 rounded-full">
          <img src={userImage ?? ""} />
        </div>
      </label>

      {menuState === "user" && (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box absolute top-10 right-0 w-28 flex flex-col items-center"
          onMouseLeave={() => setMenuState(null)}
        >
          <li>
            <button onClick={() => signOut()}>Logout</button>
          </li>
          <PostJobButton />
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
