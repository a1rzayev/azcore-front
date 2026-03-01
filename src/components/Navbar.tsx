"use client";

import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  SERVICE_CATEGORIES,
  getServiceHref,
} from "@/data/services";

export const Navbar = () => {
  const otherNav = [
    { label: "Blog", href: "/blog" },
    { label: "Support", href: "/#support" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-slate-800">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-white">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-600 text-white text-lg font-black">
              Az
            </span>
            <span>
              AzCore
              <span className="text-primary-400 font-normal"> OutSource</span>
            </span>
          </span>
        </Link>

        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
          <ThemeChanger />
          <div className="hidden mr-3 lg:flex nav__item">
            <Link
              href="/#contact"
              className="px-6 py-2 text-white bg-primary-600 rounded-md md:ml-5 hover:bg-primary-700 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 text-gray-500 rounded-md lg:hidden hover:text-primary-500 focus:text-primary-500 focus:bg-primary-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open && (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  )}
                  {!open && (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </Disclosure.Button>

              <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                <div className="w-full">
                  <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    Services
                  </p>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <a
                      key={cat.slug}
                      href={getServiceHref(cat.slug)}
                      className="block w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-primary-500 focus:text-primary-500 focus:bg-primary-100 dark:focus:bg-gray-800 focus:outline-none"
                    >
                      {cat.title}
                    </a>
                  ))}
                </div>
                {otherNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-primary-500 focus:text-primary-500 focus:bg-primary-100 dark:focus:bg-gray-800 focus:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  className="w-full px-6 py-2 mt-3 text-center text-white bg-primary-600 rounded-md lg:ml-5"
                >
                  Get in Touch
                </Link>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            <li className="mr-3 nav__item">
              <Menu as="div" className="relative">
                <MenuButton className="inline-flex items-center gap-1 px-4 py-2 text-lg font-normal text-gray-800 rounded-md dark:text-gray-200 hover:text-primary-500 focus:text-primary-500 focus:bg-primary-100 focus:outline-none dark:focus:bg-gray-800">
                  Services
                  <ChevronDownIcon className="w-4 h-4" />
                </MenuButton>
                <MenuItems
                  anchor="bottom start"
                  className="flex flex-col w-56 py-2 mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-100 dark:border-slate-700 focus:outline-none"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <MenuItem key={cat.slug}>
                      <a
                        href={getServiceHref(cat.slug)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {cat.title}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </li>
            {otherNav.map((menu) => (
              <li className="mr-3 nav__item" key={menu.href}>
                <Link
                  href={menu.href}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-primary-500 focus:text-primary-500 focus:bg-primary-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
