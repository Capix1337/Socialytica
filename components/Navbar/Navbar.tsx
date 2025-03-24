"use client";

import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import NavDropdown from "./NavDropdown";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu when screen size changes beyond desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // Changed from 768px to 1024px (lg breakpoint)
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="flex flex-col items-center w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Bar - right-aligned with no right padding */}
      <div className="w-full pr-0">
        <div className="flex justify-end">
          <div className="flex items-center bg-[#243757] rounded-bl-lg overflow-hidden shadow-sm">
            <button className="text-[#737373] font-geologica text-sm leading-5 tracking-[-0.14px] bg-white px-4 py-2 hover:bg-gray-50 transition-colors hidden sm:block">
              Dashboard
            </button>
            <button className="text-white font-geologica text-sm leading-5 tracking-[-0.14px] bg-[#FC8E77] px-4 py-2 hover:bg-[#e57e68] transition-colors">
              Sign in
            </button>
            <button className="text-white font-geologica text-sm leading-5 tracking-[-0.14px] bg-[#243757] px-4 py-2 hover:bg-[#2f4a75] transition-colors hidden sm:block">
              Create Account
            </button>
            <button className="flex justify-center items-center bg-[#78D0DB] px-4 py-2 hover:bg-[#69c1cc] transition-colors">
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
          <div className="flex items-center justify-between py-2">
            {/* Logo section */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Navigation - only visible on large screens */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className={`flex items-center gap-1 px-3 xl:px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap
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
            
            {/* Mobile menu button - moved to the right side */}
            <button 
              className="lg:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-b shadow-md">
          <div className="max-w-screen-2xl mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.label} className="w-full">
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      if (item.hasDropdown) {
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        );
                      } else {
                        // Handle navigation for items without dropdowns
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    <span className="text-[#171717] font-geologica text-base">
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
                  
                  {/* Mobile Dropdown Content */}
                  {activeDropdown === item.label && item.hasDropdown && (
                    <div className="bg-gray-50 rounded-lg mt-1 py-2 px-2">
                      {item.label === "Relationship Tests" && 
                        relationshipTests.map((test) => (
                          <button 
                            key={test}
                            className="w-full text-left px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {test}
                          </button>
                        ))
                      }
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile-only menu items */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-primary font-medium">
                  Dashboard
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-primary font-medium">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
