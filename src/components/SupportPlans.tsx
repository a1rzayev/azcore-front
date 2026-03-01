import React from "react";
import { Container } from "@/components/Container";
import {
  CheckCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

export const SupportPlans = () => {
  return (
    <Container>
      <div id="support" className="scroll-mt-20">
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border-2 border-primary-100 dark:border-slate-700 p-8 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <ClockIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  One-Time Support
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Project-based solutions
                </p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Infrastructure setup & deployment",
                "Network installation & configuration",
                "Server migration & setup",
                "CCTV installation",
                "Cabling & hardware setup",
                "Security audit & implementation",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-block w-full text-center px-6 py-3 text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400 rounded-lg font-medium hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
            >
              Request a Quote
            </a>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 p-8 text-white shadow-xl shadow-primary-200 dark:shadow-primary-900/30">
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
              RECOMMENDED
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20">
                <CalendarDaysIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Monthly Support</h3>
                <p className="text-sm text-primary-200">Ongoing partnership</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "24/7 HelpDesk availability",
                "Proactive monitoring & maintenance",
                "Regular backup & recovery management",
                "Network performance optimization",
                "Security updates & patch management",
                "Dedicated technical team",
                "Priority response time",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-primary-200 flex-shrink-0 mt-0.5" />
                  <span className="text-primary-50">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-block w-full text-center px-6 py-3 text-primary-700 bg-white rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Start Partnership
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};
