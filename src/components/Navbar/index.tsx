import Link from "next/link";

import Menu from "./Menu";

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
        <Menu />
      </div>
    </div>
  );
};

export default NavBar;
