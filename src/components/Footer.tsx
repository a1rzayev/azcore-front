import Link from "next/link";
import React from "react";
import { Container } from "@/components/Container";

export function Footer() {
  const services = [
    "Web Development",
    "Network Solutions",
    "System Administration",
    "Technical Support",
    "Internet Provider",
  ];
  const company = ["About Us", "Services", "Support Plans", "Contact"];

  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-slate-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-white"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-600 text-white text-lg font-black">
                  Az
                </span>
                <span>
                  AzCore
                  <span className="text-primary-400 font-normal">
                    {" "}
                    OutSource
                  </span>
                </span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
              AzCore OutSource is your trusted IT outsourcing partner. We deliver
              comprehensive technology solutions for businesses of all sizes —
              from web development to network infrastructure and beyond.
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">
              Services
            </h4>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {services.map((item, index) => (
                <a
                  key={index}
                  href="#services"
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-primary-500 focus:text-primary-500 focus:bg-primary-100 focus:outline-none dark:focus:bg-slate-700"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">
              Company
            </h4>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {company.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-primary-500 focus:text-primary-500 focus:bg-primary-100 focus:outline-none dark:focus:bg-slate-700"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">
              Follow Us
            </h4>
            <div className="flex mt-2 space-x-5 text-gray-400 dark:text-gray-500">
              <a href="#" target="_blank" rel="noopener">
                <span className="sr-only">Telegram</span>
                <Telegram />
              </a>
              <a href="#" target="_blank" rel="noopener">
                <span className="sr-only">Instagram</span>
                <Instagram />
              </a>
              <a href="#" target="_blank" rel="noopener">
                <span className="sr-only">Facebook</span>
                <Facebook />
              </a>
              <a href="#" target="_blank" rel="noopener">
                <span className="sr-only">LinkedIn</span>
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright &copy; {new Date().getFullYear()} AzCore OutSource. All
          rights reserved.
        </div>
      </Container>
    </div>
  );
}

const Telegram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
  </svg>
);

const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
  </svg>
);
