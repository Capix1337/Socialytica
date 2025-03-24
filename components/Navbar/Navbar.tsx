"use client";

import { useState } from "react";
import Logo from "../ui/Logo";
import NavDropdown from "./NavDropdown";

const navItems = [
  { label: "Relationship Tests", hasDropdown: true },
  { label: "Personality Tests", hasDropdown: true },
  { label: "Career Tests", hasDropdown: true },
  { label: "Mental Well-Being Tests", hasDropdown: true },
  { label: "Blog", hasDropdown: false },
];

const relationshipTests = [
  "Four-Pillar Relationship Test",
  "Compatibility Test",
  "Toxic Relationship Test",
  "Marriage Readiness Test",
  "Does My Partner Love Me Test?",
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="flex flex-col items-center w-full bg-white">
      {/* Top Bar */}
      <div className="w-full max-w-screen-2xl mx-auto px-4">
        <div className="flex justify-end py-2">
          <div className="flex items-center bg-[#243757] rounded-lg overflow-hidden shadow-sm">
            <button className="text-[#737373] font-geologica text-sm leading-5 tracking-[-0.14px] bg-white px-4 py-2.5 hover:bg-gray-50 transition-colors">
              Dashboard
            </button>
            <button className="text-white font-geologica text-sm leading-5 tracking-[-0.14px] bg-[#FC8E77] px-4 py-2.5 hover:bg-[#e57e68] transition-colors">
              Sign in
            </button>
            <button className="text-white font-geologica text-sm leading-5 tracking-[-0.14px] bg-[#243757] px-4 py-2.5 hover:bg-[#2f4a75] transition-colors">
              Create Account
            </button>
            <button className="flex justify-center items-center bg-[#78D0DB] px-4 py-2.5 hover:bg-[#69c1cc] transition-colors">
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform scale-90"
              >
                <path
                  d="M8 16C11.3137 16 14 13.3137 14 10C14 6.68629 11.3137 4 8 4C4.68629 4 2 6.68629 2 10C2 13.3137 4.68629 16 8 16Z"
                  stroke="#243757"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 9.99979H14"
                  stroke="#243757"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.00022 4C9.50099 5.64301 10.3539 7.77522 10.4002 10C10.3539 12.2248 9.50099 14.357 8.00022 16C6.49945 14.357 5.64657 12.2248 5.60022 10C5.64657 7.77522 6.49945 5.64301 8.00022 4Z"
                  stroke="#243757"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="w-full border-b">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Logo />

            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors
                      ${
                        item.label === "Relationship Tests"
                          ? "bg-[rgba(36,55,87,0.10)]"
                          : "hover:bg-gray-50"
                      }
                      ${activeDropdown === item.label ? "bg-gray-50" : ""}
                    `}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.label ? null : item.label,
                      )
                    }
                  >
                    <span className="text-[#171717] font-geologica text-base leading-[26px] tracking-[-0.36px] whitespace-nowrap">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M2 5.46944L6 9.46944L10 5.46944"
                          stroke="black"
                          strokeOpacity="0.3"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                  {activeDropdown === item.label &&
                    item.label === "Relationship Tests" && (
                      <NavDropdown items={relationshipTests} />
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
