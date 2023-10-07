"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const ClientSideNavbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);

  if (!session || session.user === undefined)
    return (
      <button className="btn btn-primary" onClick={() => signIn()}>
        SignIn
      </button>
    );
  const userImage = session.user.image;

  return (
    <div>
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="w-10 rounded-full">
          <img src={userImage ?? ""} />
        </div>
      </label>

      {isOpen && (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
        >
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button onClick={() => signOut()}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ClientSideNavbar;
