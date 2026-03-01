"use client";
import React from "react";
import { Container } from "@/components/Container";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div id="faq" className="w-full max-w-2xl p-2 mx-auto rounded-2xl scroll-mt-20">
        {faqdata.map((item) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-100 focus-visible:ring-opacity-75 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-primary-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "What services does AzCore OutSource provide?",
    answer:
      "We offer a full range of IT services including web development (websites, Telegram bots, applications), network solutions (routing, switching, firewalls, security), system administration (infrastructure, Windows/Linux servers, backup), technical support (CCTV, HelpDesk, cabling), and corporative optical internet.",
  },
  {
    question: "Do you offer both one-time and ongoing support?",
    answer:
      "Yes! We provide both one-time project-based services (installations, migrations, setups) and monthly support plans with 24/7 monitoring, maintenance, and dedicated helpdesk support.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "AzCore OutSource operates across Azerbaijan, serving businesses in Baku and throughout the country. We can also provide remote support for clients outside our immediate area.",
  },
  {
    question: "How quickly can you respond to urgent issues?",
    answer:
      "Monthly support clients receive priority response times. For critical infrastructure issues, our team is available 24/7 with rapid response capabilities to minimize downtime.",
  },
  {
    question: "Can you handle the complete IT infrastructure for a new office?",
    answer:
      "Absolutely. We specialize in end-to-end office IT setup including structured cabling, network infrastructure, server installation, CCTV systems, internet connectivity, and ongoing maintenance — all from a single provider.",
  },
  {
    question: "What makes AzCore OutSource different from other IT providers?",
    answer:
      "We combine deep technical expertise across multiple domains with a client-focused approach. Instead of working with multiple vendors, you get a single partner for all your IT needs — web, network, systems, physical infrastructure, and internet connectivity.",
  },
];
