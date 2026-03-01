import React from "react";
import {
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  SignalIcon,
  ArrowsRightLeftIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  ComputerDesktopIcon,
  CommandLineIcon,
  CloudArrowUpIcon,
  VideoCameraIcon,
  LifebuoyIcon,
  WrenchScrewdriverIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";

export type ServiceSlug =
  | "web"
  | "network"
  | "system"
  | "technical-team"
  | "provider";

export interface ServiceItem {
  name: string;
  icon: React.ReactNode;
}

export interface ServiceCategory {
  slug: ServiceSlug;
  title: string;
  icon: React.ReactNode;
  color: string;
  items: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "web",
    title: "Web",
    icon: <GlobeAltIcon className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-400",
    items: [
      { name: "Website Development", icon: <GlobeAltIcon className="w-5 h-5" /> },
      { name: "Telegram Bot", icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
      {
        name: "All Types of Applications",
        icon: <DevicePhoneMobileIcon className="w-5 h-5" />,
      },
    ],
  },
  {
    slug: "network",
    title: "Network",
    icon: <SignalIcon className="w-8 h-8" />,
    color: "from-blue-600 to-blue-400",
    items: [
      { name: "Routing", icon: <SignalIcon className="w-5 h-5" /> },
      { name: "Switching", icon: <ArrowsRightLeftIcon className="w-5 h-5" /> },
      { name: "Firewalls", icon: <ShieldCheckIcon className="w-5 h-5" /> },
      { name: "Security", icon: <LockClosedIcon className="w-5 h-5" /> },
    ],
  },
  {
    slug: "system",
    title: "System",
    icon: <ComputerDesktopIcon className="w-8 h-8" />,
    color: "from-sky-500 to-blue-500",
    items: [
      {
        name: "Building Infrastructure",
        icon: <BuildingOfficeIcon className="w-5 h-5" />,
      },
      { name: "Windows Server", icon: <ComputerDesktopIcon className="w-5 h-5" /> },
      { name: "Linux Server", icon: <CommandLineIcon className="w-5 h-5" /> },
      { name: "Backup Solutions", icon: <CloudArrowUpIcon className="w-5 h-5" /> },
    ],
  },
  {
    slug: "technical-team",
    title: "Technical Team",
    icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
    color: "from-blue-400 to-sky-400",
    items: [
      { name: "CCTV Systems", icon: <VideoCameraIcon className="w-5 h-5" /> },
      { name: "HelpDesk Support", icon: <LifebuoyIcon className="w-5 h-5" /> },
      {
        name: "Structured Cabling",
        icon: <WrenchScrewdriverIcon className="w-5 h-5" />,
      },
    ],
  },
  {
    slug: "provider",
    title: "Provider Offers",
    icon: <WifiIcon className="w-8 h-8" />,
    color: "from-cyan-500 to-blue-500",
    items: [
      {
        name: "Corporative Optical Internet",
        icon: <WifiIcon className="w-5 h-5" />,
      },
    ],
  },
];

export function getServiceSectionId(slug: ServiceSlug): string {
  return `services-${slug}`;
}

export function getServiceHref(slug: ServiceSlug): string {
  return `#${getServiceSectionId(slug)}`;
}
