"use client";

import Link from "next/link";
import Logout from "./Logout";
import { useAuthContext } from "@/contexts/auth";

const NavBar = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="flex justify-between items-center p-4 border-2 rounded-md border-black">
      <Link href="/">
        <h1 className="text-2xl font-bold">Tasktides</h1>
      </Link>
      {isAuthenticated && (
        <div className="flex gap-4">
          <Link href="/checklists">Checklists</Link>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default NavBar;
