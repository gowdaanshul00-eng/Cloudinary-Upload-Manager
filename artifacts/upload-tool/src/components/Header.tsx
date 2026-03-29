import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Mission & Philosophy", href: "/about" },
      { label: "History", href: "/about#history" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Campus", href: "/about#campus" },
      { label: "Diversity & Inclusion", href: "/about#diversity" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Why Cooper", href: "/admissions" },
      { label: "Apply", href: "/apply" },
      { label: "Visit Campus", href: "/visit" },
      { label: "Inquire Online", href: "/inquire" },
      { label: "Financial Aid", href: "/admissions#aid" },
      { label: "Tuition", href: "/admissions#tuition" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Overview", href: "/academics" },
      { label: "Lower School", href: "/academics#lower" },
      { label: "Middle School", href: "/academics#middle" },
      { label: "Upper School", href: "/academics#upper" },
      { label: "Arts", href: "/academics#arts" },
      { label: "Athletics", href: "/academics#athletics" },
    ],
  },
  {
    label: "News & Events",
    href: "/news",
    children: [
      { label: "Latest News", href: "/news" },
      { label: "Upcoming Events", href: "/news#events" },
      { label: "Hawk Herald Blog", href: "/news#blog" },
      { label: "Press Releases", href: "/news#press" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full z-50 sticky top-0">
      <div className="bg-[#1e4d2b] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-8">
          <span className="opacity-70">The Woodlands, Texas | K–12 | Est. 1988</span>
          <div className="flex items-center gap-0">
            <Link href="/login" className="px-4 py-1 border-l border-white/20 hover:bg-white/10 transition-colors h-8 flex items-center font-medium tracking-wider uppercase text-[10px]">
              Login
            </Link>
            <Link href="/apply" className="px-4 py-1 border-l border-white/20 hover:bg-white/10 transition-colors h-8 flex items-center font-medium tracking-wider uppercase text-[10px]">
              Apply
            </Link>
            <Link href="/visit" className="px-4 py-1 border-l border-white/20 hover:bg-white/10 transition-colors h-8 flex items-center font-medium tracking-wider uppercase text-[10px]">
              Visit
            </Link>
            <Link href="/inquire" className="px-4 py-1 border-l border-r border-white/20 hover:bg-white/10 transition-colors h-8 flex items-center font-medium tracking-wider uppercase text-[10px]">
              Inquire
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1e4d2b] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">JC</span>
            </div>
            <div>
              <div className="text-[#1e4d2b] font-bold text-lg leading-tight font-serif">The John Cooper School</div>
              <div className="text-gray-500 text-xs tracking-widest uppercase">The Woodlands, Texas</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide rounded transition-colors ${
                    activeDropdown === item.label
                      ? "text-[#1e4d2b] bg-gray-100"
                      : "text-gray-700 hover:text-[#1e4d2b] hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                </button>

                {activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-1 w-52 bg-white shadow-xl border border-gray-100 rounded-sm z-50"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#1e4d2b] hover:text-white transition-colors border-b border-gray-50 last:border-0"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              className="ml-2 p-2 text-gray-600 hover:text-[#1e4d2b] transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={18} />
            </button>
          </nav>

          <button
            className="lg:hidden p-2 text-[#1e4d2b]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {searchOpen && (
          <div className="border-t border-gray-100 px-4 py-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-xl border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#1e4d2b]"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        )}
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <button
                className="w-full text-left px-4 py-3 font-medium text-gray-800 border-b border-gray-100 flex justify-between items-center"
                onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
              >
                {item.label}
                <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === item.label && (
                <div className="bg-gray-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-8 py-2.5 text-sm text-gray-600 hover:text-[#1e4d2b] border-b border-gray-100"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex border-t border-gray-200">
            {[
              { label: "Login", href: "/login" },
              { label: "Apply", href: "/apply" },
              { label: "Visit", href: "/visit" },
              { label: "Inquire", href: "/inquire" },
            ].map((btn) => (
              <Link
                key={btn.label}
                href={btn.href}
                className="flex-1 text-center py-3 text-sm font-medium text-[#1e4d2b] border-r border-gray-200 last:border-r-0"
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
