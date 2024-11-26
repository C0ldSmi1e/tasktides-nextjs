"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./Logout";
import { useAuthContext } from "@/contexts/auth";

const items = [
  { label: "Checklists", href: "/checklists" },
  { label: "Notes", href: "/notes" },
];

const NavBar = () => {
  const { isAuthenticated } = useAuthContext();
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center p-4 border-2 rounded-md border-black">
      <Link href="/">
        <h1 className="text-2xl font-bold">Tasktides</h1>
      </Link>
      {isAuthenticated && (
        <div className="flex gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "font-bold" : ""}
            >
              {item.label}
            </Link>
          ))}
          <Logout />
        </div>
      )}
    </div>
  );
};

export default NavBar;
