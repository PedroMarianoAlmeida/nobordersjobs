"use client";

import { Dispatch, useState } from "react";
import EveryoneMenu from "./EveryoneMenu";
import UserMenu from "./UserMenu";

type menuStates = "user" | "everyone" | null;
export interface MenuChildProps {
  menuState: menuStates;
  setMenuState: Dispatch<React.SetStateAction<menuStates>>;
}
const Menu = () => {
  const [menuState, setMenuState] = useState<menuStates>(null);

  return (
    <div className="flex gap-5">
      <UserMenu menuState={menuState} setMenuState={setMenuState} />
      <EveryoneMenu menuState={menuState} setMenuState={setMenuState} />
    </div>
  );
};

export default Menu;
