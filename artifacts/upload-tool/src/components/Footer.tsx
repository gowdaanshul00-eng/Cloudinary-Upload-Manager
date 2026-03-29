import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

const FOOTER_LINKS = [
  { label: "Quick Links", href: "#" },
  { label: "About", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Academics", href: "/academics" },
  { label: "News & Events", href: "/news" },
  { label: "Apply", href: "/apply" },
  { label: "Visit", href: "/visit" },
  { label: "Inquire", href: "/inquire" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a3d22] text-white">
      {/* Main footer — shown on desktop, simplified on mobile */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold font-serif">JC</span>
                </div>
                <div>
                  <div className="font-bold font-serif text-sm">The John Cooper School</div>
                  <div className="text-white/60 text-xs">The Woodlands, Texas</div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                An independent, college-preparatory school serving students in grades K–12.
                Empowering the brightest young minds since 1988.
              </p>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs tracking-widest uppercase mb-4 text-white/90">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: "About Cooper", href: "/about" },
                  { label: "Admissions", href: "/admissions" },
                  { label: "Academics", href: "/academics" },
                  { label: "News & Events", href: "/news" },
                  { label: "Apply Now", href: "/apply" },
                  { label: "Visit Campus", href: "/visit" },
                  { label: "Inquire Online", href: "/inquire" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs tracking-widest uppercase mb-4 text-white/90">School Life</h4>
              <ul className="space-y-2">
                {[
                  { label: "Lower School (K–4)", href: "/academics#lower" },
                  { label: "Middle School (5–8)", href: "/academics#middle" },
                  { label: "Upper School (9–12)", href: "/academics#upper" },
                  { label: "Athletics", href: "/academics#athletics" },
                  { label: "Arts Program", href: "/academics#arts" },
                  { label: "College Counseling", href: "/academics#college" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs tracking-widest uppercase mb-4 text-white/90">Contact</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>One John Cooper Drive<br />The Woodlands, TX 77382</li>
                <li>
                  <a href="tel:+12813670900" className="hover:text-white transition-colors">(281) 367-0900</a>
                </li>
                <li>
                  <a href="mailto:admissions@johncooper.org" className="hover:text-white transition-colors">
                    admissions@johncooper.org
                  </a>
                </li>
                <li>
                  <a href="https://www.johncooper.org" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    johncooper.org
                  </a>
                </li>
              </ul>
              <div className="mt-5">
                <Link
                  href="/inquire"
                  className="inline-block px-5 py-2.5 bg-white text-[#1a3d22] text-sm font-semibold rounded-sm hover:bg-white/90 transition-colors"
                >
                  Request Information
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile footer — compact */}
      <div className="md:hidden px-4 py-6">
        <div className="text-center mb-4">
          <p className="font-bold font-serif text-sm">The John Cooper School</p>
          <p className="text-white/60 text-xs mt-1">One John Cooper Drive, The Woodlands, TX 77382</p>
          <a
            href="https://www.johncooper.org"
            className="text-white/60 text-xs hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            johncooper.org
          </a>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-3 mb-5">
          {SOCIAL_LINKS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        {/* Mobile quick nav links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
          {[
            { label: "About", href: "/about" },
            { label: "Admissions", href: "/admissions" },
            { label: "Academics", href: "/academics" },
            { label: "News", href: "/news" },
            { label: "Apply", href: "/apply" },
            { label: "Visit", href: "/visit" },
          ].map((link) => (
            <Link key={link.label} href={link.href} className="text-xs text-white/60 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar — always visible */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <span>© {new Date().getFullYear()} The John Cooper School. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white/70 transition-colors">Non-Discrimination</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
