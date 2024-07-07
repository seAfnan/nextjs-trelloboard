"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Button, DropdownMenu, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DarkModeTrigger from "./components/DarkModeTrigger";
import { ThemeContext } from "./components/DarkModeProvider";
import { CiCircleList } from "react-icons/ci";

const NavBar = () => {
  const currentPath = usePathname();
  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};

  const links = [{ label: "Tasks", href: "/", icon: <CiCircleList /> }];
  return (
    <nav
      className="border-b mb-5 px-3 py-3"
      style={
        theme === "dark" ? { background: "#212225" } : { background: "white" }
      }
    >
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/"></Link>
          <ul className="flex space-x-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={
                    theme == "light"
                      ? classnames({
                          "flex text-white bg-indigo-600":
                            link.href === currentPath,
                          "flex text-zinc-500": link.href !== currentPath,
                          "hover:text-zinc-400 transition-colors": true,
                          "pt-2 pb-2 pl-3 pr-3 flex items-center space-x-1":
                            true,
                        })
                      : classnames({
                          "flex text-white bg-indigo-600":
                            link.href === currentPath,
                          "flex text-zinc-500": link.href !== currentPath,
                          "hover:text-zinc-200 transition-colors": true,
                          "pt-2 pb-2 pl-3 pr-3 flex items-center space-x-1":
                            true,
                        })
                  }
                  href={link.href}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <DarkModeTrigger />
      </Flex>
    </nav>
  );
};

export default NavBar;
