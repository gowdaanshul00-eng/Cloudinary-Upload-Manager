import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Search, Facebook, Instagram, Youtube } from "lucide-react";
import cooperLogo from "@assets/IMG_8402_1774823072768.png";

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

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="X (Twitter)">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: <Facebook size={19} />, href: "#", label: "Facebook" },
  { icon: <Instagram size={19} />, href: "#", label: "Instagram" },
  { icon: <Youtube size={19} />, href: "#", label: "YouTube" },
  { icon: <XIcon />, href: "#", label: "X" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
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
    <header className="w-full z-50 sticky top-0 shadow-sm">

      {/* ── Top dark bar: Menu (left) + Login (right) ── */}
      <div
        style={{
          background: "#000000",
          borderBottom: "3px solid #3d6b4f",
          padding: "14px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 17,
            fontFamily: "Arial, Helvetica, sans-serif",
            letterSpacing: "0.3px",
            fontWeight: 700,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {/* Hamburger — 3 lines, sage green */}
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <rect y="0"  width="22" height="2.5" rx="1.25" fill="#7B8B78" />
            <rect y="6.75" width="22" height="2.5" rx="1.25" fill="#7B8B78" />
            <rect y="13.5" width="22" height="2.5" rx="1.25" fill="#7B8B78" />
          </svg>
          <span style={{ color: "#7B8B78" }}>Menu</span>
        </button>
        <Link
          href="/login"
          style={{
            color: "#7B8B78",
            fontSize: 17,
            fontFamily: "Arial, Helvetica, sans-serif",
            letterSpacing: "0.3px",
            fontWeight: 700,
            textDecoration: "none",
            lineHeight: 1,
          }}
        >
          Login
        </Link>
      </div>

      {/* ── White branding section: Logo + Search + Social ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-md mx-auto px-5 py-4 flex flex-col items-center gap-3 lg:max-w-7xl">

          {/* Cooper logo */}
          <Link href="/" className="block">
            <img
              src={cooperLogo}
              alt="The John Cooper School"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </Link>

          {/* Search bar */}
          <div className="relative w-full max-w-xs lg:max-w-sm">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1e4d2b] focus:ring-1 focus:ring-[#1e4d2b] transition"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e4d2b] transition-colors" aria-label="Search">
              <Search size={16} />
            </button>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-gray-600 hover:text-[#1e4d2b] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Desktop nav — visible on large screens */}
          <nav className="hidden lg:flex items-center gap-1 border-t border-gray-100 w-full justify-center pt-3" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide rounded transition-colors ${
                    activeDropdown === item.label
                      ? "text-[#1e4d2b] bg-gray-50"
                      : "text-gray-700 hover:text-[#1e4d2b] hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={13} className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />
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
          </nav>
        </div>
      </div>

      {/* ── Mobile menu drawer ── */}
      {mobileMenuOpen && (
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
