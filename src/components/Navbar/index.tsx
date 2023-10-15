import Link from "next/link";

import UserMenu from "./UserMenu";
import EveryoneMenu from "./EveryoneMenu";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <button className="btn btn-ghost normal-case text-xl">
            No Border Jobs
          </button>
        </Link>
      </div>
      <div className="flex-none">
        <div className="flex gap-5">
          <UserMenu />
          <EveryoneMenu />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
