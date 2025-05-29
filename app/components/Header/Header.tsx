"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLikes } from "@/app/context/LikesProvider";
import { useAuth } from "@/app/context/AuthProvider";

const navItems = [
  { path: "/jobs", label: "Jobs" },
  { path: "/liked", label: "🤍" },
  { path: "/create-profile", label: "Profile" },
];

const Header = () => {
  const pathname = usePathname();
  const { liked } = useLikes();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/">
          <span className="text-lg font-bold text-foreground hover:opacity-80 transition">
            Job Search App
          </span>
        </Link>

        <nav className="flex gap-6 items-center">
          {navItems.map(({ path, label }) => {
            const isActive = pathname === path;

            return (
              <Link
                key={path}
                href={path}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  isActive ? "text-blue-600" : "text-foreground"
                )}
              >
                {path === "/liked" && liked.length > 0 ? "❤️" : label}
              </Link>
            );
          })}

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-800 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/signIn"
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  pathname === "/signIn" ? "text-blue-600" : "text-foreground"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/signUp"
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  pathname === "/signUp" ? "text-blue-600" : "text-foreground"
                )}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
