"use client";

import EveryoneMenu from "./EveryoneMenu";
import UserMenu from "./UserMenu";

const Menu = () => {
  return (
    <div className="flex gap-5">
      <UserMenu />
      <EveryoneMenu />
    </div>
  );
};

export default Menu;
