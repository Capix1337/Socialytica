"use client";

import Logo from "../ui/Wlogo";
import SocialIcons from "./SocialIcons";

const relationshipTests = [
  "Four-Pillar Relationship Test",
  "Compatibility Test",
  "Toxic Relationship Test",
  "Marriage Readiness Test",
  "Does My Partner Love Me Test?",
];

const personalityTests = ["The Real You – Personality Test"];

const careerTests = [
  "What Type Of Career Am I?",
  "My Professional Potential Test",
];

const mentalTests = [
  "How Strong Is My Self-Confidence?",
  "How Stress-Resistant Am I?",
];

const quickLinks = ["Blog", "Dashboard", "Sign In", "Create Account"];

export default function Footer() {
  return (
    <footer className="w-full bg-[#243757]">
      <div className="max-w-[1440px] mx-auto px-[70px] py-[70px] flex flex-col gap-16 xl:max-w-full xl:px-12 lg:px-8 md:px-6 md:py-12 sm:px-4">
        {/* Top Section with Logo and Social Icons */}
        <div className="flex flex-col items-center gap-8 w-full max-w-[1180px] mx-auto xl:max-w-full md:flex-row md:justify-between">
          <div className="w-[213px] sm:w-[160px]">
            <Logo />
          </div>
          <div className="flex items-center">
            <SocialIcons />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-[repeat(auto-fit,240px)] max-w-[1180px] mx-auto w-full justify-between gap-x-14 gap-y-12 xl:max-w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {/* Relationship Tests */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-geologica text-xl font-medium leading-[140%] pb-2">
              Relationship Tests
            </h3>
            <div className="flex flex-col gap-3">
              {relationshipTests.map((test) => (
                <a
                  key={test}
                  href="#"
                  className="text-[#E2E7F0] font-geologica text-base font-light leading-[140%] hover:text-white transition-colors"
                >
                  {test}
                </a>
              ))}
            </div>
          </div>

          {/* Personality Tests */}
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-geologica text-xl font-medium leading-[140%] pb-2">
                Personality Tests
              </h3>
              {personalityTests.map((test) => (
                <a
                  key={test}
                  href="#"
                  className="text-[#E2E7F0] font-geologica text-base font-light leading-[140%] hover:text-white transition-colors"
                >
                  {test}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-geologica text-xl font-medium leading-[140%] pb-2">
                Career Tests
              </h3>
              {careerTests.map((test) => (
                <a
                  key={test}
                  href="#"
                  className="text-[#E2E7F0] font-geologica text-base font-light leading-[140%] hover:text-white transition-colors"
                >
                  {test}
                </a>
              ))}
            </div>
          </div>

          {/* Mental Well-Being Tests */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-geologica text-xl font-medium leading-[140%] pb-2">
              Mental Well-Being Tests
            </h3>
            <div className="flex flex-col gap-3">
              {mentalTests.map((test) => (
                <a
                  key={test}
                  href="#"
                  className="text-[#E2E7F0] font-geologica text-base font-light leading-[140%] hover:text-white transition-colors"
                >
                  {test}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3 xl:col-span-1 lg:col-span-3 md:col-span-2 sm:col-span-1">
            {quickLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white font-geologica text-base font-normal leading-[140%] hover:text-[#E2E7F0] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-3.5 pt-4 max-w-[1180px] mx-auto w-full xl:max-w-full">
          <div className="w-full h-px bg-[#717D96] opacity-50" />
          <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-4">
            <div className="flex gap-6">
              <a
                href="#"
                className="text-[#CBD2E0] font-geologica text-sm font-light leading-[140%] hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-[#CBD2E0] font-geologica text-sm font-light leading-[140%] hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </div>
            <span className="text-[#717D96] font-geologica text-sm font-light leading-[140%] text-right sm:text-right sm:w-full">
              © Socialytica {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
