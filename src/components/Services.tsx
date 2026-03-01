import React from "react";
import { Container } from "@/components/Container";
import {
  SERVICE_CATEGORIES,
  getServiceSectionId,
} from "@/data/services";

export const Services = () => {
  return (
    <Container>
      <div id="services" className="scroll-mt-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((category, idx) => (
            <div
              key={category.slug}
              id={getServiceSectionId(category.slug)}
              className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-8 hover:shadow-xl hover:shadow-primary-100/50 dark:hover:shadow-primary-900/20 transition-all duration-300 scroll-mt-24 ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color}`}
              />

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <ul className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center space-x-3">
                    <span className="flex-shrink-0 text-primary-500 dark:text-primary-400">
                      {item.icon}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
