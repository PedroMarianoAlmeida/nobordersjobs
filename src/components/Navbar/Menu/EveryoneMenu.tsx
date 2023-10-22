"use client";

import Link from "next/link";
import { useState } from "react";

const EveryoneMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="btn btn-square btn-ghost"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-5 h-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box absolute top-10 right-0 w-28 flex flex-col items-center"
        >
          <li>
            <Link href="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link href="/contribute">
              <button>Contribute</button>
            </Link>
          </li>
          <li>
            <Link href="/job/list?status=open">
              <button>Jobs</button>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <button>About</button>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default EveryoneMenu;
