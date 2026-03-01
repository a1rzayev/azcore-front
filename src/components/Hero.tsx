"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { SERVICE_CATEGORIES, type ServiceSlug } from "@/data/services";

export const Hero = () => {
  const [activeService, setActiveService] = useState<ServiceSlug>("web");
  const category = SERVICE_CATEGORIES.find((c) => c.slug === activeService)!;

  return (
    <>
      <Container className="flex flex-wrap">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Your Trusted IT
              <span className="text-primary-600"> OutSource</span> Partner
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              AzCore OutSource delivers comprehensive IT solutions — from web
              development and network infrastructure to system administration
              and technical support. One-time or monthly, we&apos;ve got you covered.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="#services"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="grid grid-cols-2 gap-4 p-6 w-full max-w-md">
            {/* Service switcher tabs */}
            <div className="col-span-2 flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveService(cat.slug)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeService === cat.slug
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-primary-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-slate-700 border border-primary-100 dark:border-slate-700"
                  }`}
                >
                  <span className="flex-shrink-0 text-current opacity-90">
                    {cat.icon}
                  </span>
                  <span>{cat.title}</span>
                </button>
              ))}
            </div>

            {/* Subservices for selected category */}
            <div className="col-span-2 min-h-[280px] rounded-2xl bg-primary-50 dark:bg-slate-800 border border-primary-100 dark:border-slate-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {category.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <span className="flex-shrink-0 text-primary-500 dark:text-primary-400">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Trusted by{" "}
            <span className="text-primary-600 font-semibold">businesses</span>{" "}
            across Azerbaijan
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-10 md:justify-around">
            <StatBadge value="5+" label="Years Experience" />
            <StatBadge value="100+" label="Projects Delivered" />
            <StatBadge value="50+" label="Active Clients" />
            <StatBadge value="24/7" label="Support Available" />
          </div>
        </div>
      </Container>
    </>
  );
};

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
        {value}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}
