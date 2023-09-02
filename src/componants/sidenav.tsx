import React from "react";
import router, { useRouter } from "next/router";
import Link from "next/link";
import { logout } from "../pages/api/auth";

type MenuItem = {
  href: string;
  title: string;
  onClick?: () => void;
};

const menuItems: MenuItem[] = [
  {
    href: "/home",
    title: "Home",
  },
  {
    href: "/requests",
    title: "Requests",
  },
  {
    href: "/DataMigration",
    title: "Data Migration",
  },
  {
    href: "/login",
    title: "Log out",
    onClick: () => logout(router),
  },
];

const SideNav = () => {
  const router = useRouter();

  if (router.pathname === "/login") return null;

  return (
    <aside className="bg-indigo-50 h-screen w-64 fixed top-0 left-0 py-4 px-6">
      <nav>
        <ul className="text-indigo-800 font-bold text-lg">
          {menuItems.map((menuItem) => (
            <li
              key={menuItem.href}
              className={
                router.pathname === menuItem.href
                  ? "bg-indigo-200 rounded-lg"
                  : ""
              }
            >
              <Link
                href={menuItem.href}
                className="block p-2 mt-3 px-3 rounded-lg hover:bg-indigo-100"
                onClick={(e) => {
                  if (menuItem.onClick) {
                    e.preventDefault();
                    menuItem.onClick();
                  }
                }}
              >
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
