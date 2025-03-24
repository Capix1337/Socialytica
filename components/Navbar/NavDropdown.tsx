interface NavDropdownProps {
  items: string[];
}

export default function NavDropdown({ items }: NavDropdownProps) {
  return (
    <div className="absolute top-full left-0 mt-2 py-3 bg-white rounded-lg shadow-lg min-w-[280px] z-50">
      {items.map((item) => (
        <button
          key={item}
          className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-gray-50 transition-colors group"
        >
          <span className="text-[#404040] font-geologica text-base leading-[23px] tracking-[-0.16px] font-light">
            {item}
          </span>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-[-90deg] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <path
              d="M4.5 10.5L8.5 6.5L4.5 2.5"
              stroke="#FC8E77"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
