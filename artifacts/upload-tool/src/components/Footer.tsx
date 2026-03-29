import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a3d22] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-white font-bold font-serif">JC</span>
              </div>
              <div>
                <div className="font-bold font-serif text-sm">The John Cooper School</div>
                <div className="text-white/60 text-xs">The Woodlands, Texas</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              An independent, college-preparatory school serving students in grades K–12.
              Empowering the brightest young minds since 1988.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-5 text-white/90">Quick Links</h4>
            <ul className="space-y-2.5">
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
            <h4 className="font-bold text-sm tracking-widest uppercase mb-5 text-white/90">School Life</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Lower School (K–4)", href: "/academics#lower" },
                { label: "Middle School (5–8)", href: "/academics#middle" },
                { label: "Upper School (9–12)", href: "/academics#upper" },
                { label: "Athletics", href: "/academics#athletics" },
                { label: "Arts Program", href: "/academics#arts" },
                { label: "College Counseling", href: "/academics#college" },
                { label: "Student Life", href: "/academics#life" },
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
            <h4 className="font-bold text-sm tracking-widest uppercase mb-5 text-white/90">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5 text-white/50" />
                <span className="text-sm text-white/70">
                  One John Cooper Dr<br />
                  The Woodlands, TX 77382
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="shrink-0 mt-0.5 text-white/50" />
                <a href="tel:+12819677725" className="text-sm text-white/70 hover:text-white transition-colors">
                  (281) 367-0900
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="shrink-0 mt-0.5 text-white/50" />
                <a href="mailto:admissions@johncooper.org" className="text-sm text-white/70 hover:text-white transition-colors">
                  admissions@johncooper.org
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/inquire"
                className="inline-block px-5 py-2.5 bg-white text-[#1a3d22] text-sm font-semibold rounded hover:bg-white/90 transition-colors"
              >
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
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
