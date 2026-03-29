import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, Calendar, ChevronLeft } from "lucide-react";
import { useImages, resolveImage } from "../hooks/useImages";

const HERO_SLIDES = [
  { title: "Excellence in Education", subtitle: "Preparing Tomorrow's Leaders Today", cta: "Learn More", href: "/about" },
  { title: "A Community of Thinkers", subtitle: "Nurturing Curiosity from Kindergarten Through 12th Grade", cta: "Explore Academics", href: "/academics" },
  { title: "Begin Your Cooper Journey", subtitle: "Discover What Makes Cooper Different", cta: "Apply Now", href: "/apply" },
];

const NEWS_ITEMS = [
  {
    label: "image10",
    index: 9,
    category: "Athletics",
    date: "March 20, 2026",
    title: "Hawks Baseball Team Advances to Regional Playoffs",
    excerpt: "The Cooper Hawks baseball team secured their spot in the regional playoffs after an impressive series win, continuing their outstanding season.",
  },
  {
    label: "image11",
    index: 10,
    category: "Academics",
    date: "March 18, 2026",
    title: "Cooper Students Excel at Regional Science Olympiad",
    excerpt: "Seven Cooper students placed in the top three at the Regional Science Olympiad, qualifying for the state competition next month.",
  },
  {
    label: "image12",
    index: 11,
    category: "Arts",
    date: "March 15, 2026",
    title: "Spring Fine Arts Showcase Draws Record Attendance",
    excerpt: "The annual spring arts showcase featured over 200 student works spanning visual art, music, and performing arts.",
  },
];

const EVENTS = [
  { month: "APR", day: "5", title: "Open House & Campus Tour", time: "9:00 AM – 12:00 PM", href: "/visit" },
  { month: "APR", day: "12", title: "Spring Gala Benefit Dinner", time: "6:30 PM – 10:00 PM", href: "/news" },
  { month: "APR", day: "18", title: "AP Exam Week Begins", time: "All Day", href: "/academics" },
  { month: "APR", day: "25", title: "Fine Arts Spring Concert", time: "7:00 PM", href: "/news" },
  { month: "MAY", day: "3", title: "Commencement Ceremony", time: "10:00 AM", href: "/news" },
];

const STATS = [
  { value: "K–12", label: "Grades Served" },
  { value: "1988", label: "Year Founded" },
  { value: "14:1", label: "Student-Teacher Ratio" },
  { value: "100%", label: "College Acceptance Rate" },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const { data: images = [] } = useImages();

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <div className="min-h-screen">
      <section className="relative h-[78vh] min-h-[520px] overflow-hidden">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={resolveImage(images, `image${i + 1}`, i)}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <div className="text-white/80 text-sm font-medium tracking-widest uppercase mb-3">
                The John Cooper School
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight mb-4">
                {current.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
                {current.subtitle}
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href={current.href}
                  className="px-7 py-3.5 bg-[#1e4d2b] text-white font-semibold rounded hover:bg-[#163820] transition-colors text-sm"
                >
                  {current.cta}
                </Link>
                <Link
                  href="/inquire"
                  className="px-7 py-3.5 bg-white/10 border border-white/40 text-white font-semibold rounded hover:bg-white/20 transition-colors text-sm backdrop-blur-sm"
                >
                  Request Information
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
          <button
            onClick={() => setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === slide ? "bg-white scale-125" : "bg-white/40"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setSlide((s) => (s + 1) % HERO_SLIDES.length)}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      <section className="bg-[#1e4d2b] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-8 py-8 text-center">
                <div className="text-3xl md:text-4xl font-bold font-serif mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">About Cooper</div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-6">
                A Tradition of Academic Excellence
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                The John Cooper School is an independent, co-educational, college-preparatory school serving students
                in grades K through 12. Founded in 1988, Cooper has established itself as one of the premier private
                schools in Texas, offering a rigorous academic program within a nurturing community environment.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our faculty members are experts in their fields, dedicated to challenging and supporting each student
                to achieve their personal best. Small class sizes ensure individualized attention and foster meaningful
                connections between teachers and students.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e4d2b] text-white font-semibold text-sm rounded hover:bg-[#163820] transition-colors">
                  Our Story <ArrowRight size={15} />
                </Link>
                <Link href="/admissions" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1e4d2b] text-[#1e4d2b] font-semibold text-sm rounded hover:bg-[#1e4d2b] hover:text-white transition-colors">
                  Admissions
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={resolveImage(images, "image4", 3)}
                alt="Students at Cooper"
                className="rounded-lg w-full h-56 object-cover"
              />
              <img
                src={resolveImage(images, "image5", 4)}
                alt="Campus life"
                className="rounded-lg w-full h-56 object-cover mt-6"
              />
              <img
                src={resolveImage(images, "image6", 5)}
                alt="Arts program"
                className="rounded-lg w-full h-56 object-cover"
              />
              <img
                src={resolveImage(images, "image7", 6)}
                alt="Athletics"
                className="rounded-lg w-full h-56 object-cover mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Divisions</div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900">The Cooper Experience</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm">
              From our youngest learners to graduating seniors, every Cooper student benefits from our commitment to excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Lower School", grades: "K – Grade 4", desc: "Building foundational skills through inquiry-based learning in a warm, supportive environment.", img: "image8", idx: 7, href: "/academics#lower" },
              { title: "Middle School", grades: "Grades 5 – 8", desc: "A pivotal transition where students develop independence, critical thinking, and collaborative skills.", img: "image9", idx: 8, href: "/academics#middle" },
              { title: "Upper School", grades: "Grades 9 – 12", desc: "A rigorous college-preparatory curriculum with AP courses, dual enrollment, and individualized guidance.", img: "image10", idx: 9, href: "/academics#upper" },
            ].map((div) => (
              <Link key={div.title} href={div.href} className="group block">
                <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={resolveImage(images, div.img, div.idx)}
                      alt={div.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="text-white/80 text-xs font-medium mb-1">{div.grades}</div>
                      <h3 className="text-white text-xl font-bold font-serif">{div.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{div.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-[#1e4d2b] text-sm font-semibold group-hover:gap-2.5 transition-all">
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-2">Latest News</div>
              <h2 className="text-3xl font-bold font-serif text-gray-900">Cooper in the News</h2>
            </div>
            <Link href="/news" className="hidden md:inline-flex items-center gap-2 text-sm text-[#1e4d2b] font-semibold hover:gap-3 transition-all">
              View All News <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_ITEMS.map((item, i) => (
              <Link key={i} href="/news" className="group block">
                <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={resolveImage(images, item.label, item.index)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 bg-[#1e4d2b]/10 text-[#1e4d2b] text-xs font-semibold rounded-full">
                        {item.category}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Calendar size={11} /> {item.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#1e4d2b] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{item.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1e4d2b] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-2">Calendar</div>
              <h2 className="text-3xl font-bold font-serif">Upcoming Events</h2>
            </div>
            <Link href="/news#events" className="hidden md:inline-flex items-center gap-2 text-sm text-white/80 hover:text-white font-semibold transition-colors">
              Full Calendar <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EVENTS.map((event, i) => (
              <Link key={i} href={event.href} className="group flex gap-5 bg-white/10 hover:bg-white/15 rounded-xl p-5 transition-colors">
                <div className="text-center shrink-0 w-14">
                  <div className="text-white/60 text-xs font-bold uppercase">{event.month}</div>
                  <div className="text-3xl font-bold font-serif leading-none">{event.day}</div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:underline">{event.title}</h3>
                  <p className="text-white/60 text-xs">{event.time}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 overflow-hidden">
        <img
          src={resolveImage(images, "image13", 12)}
          alt="Cooper campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1e4d2b]/85" />
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-white mb-6">
            Ready to Join the Cooper Community?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Take the first step toward an extraordinary education. Our admissions team is here to guide you every step of the way.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/apply" className="px-8 py-4 bg-white text-[#1e4d2b] font-bold rounded hover:bg-white/90 transition-colors">
              Apply Now
            </Link>
            <Link href="/visit" className="px-8 py-4 border-2 border-white text-white font-bold rounded hover:bg-white/10 transition-colors">
              Schedule a Visit
            </Link>
            <Link href="/inquire" className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded hover:bg-white/10 transition-colors">
              Inquire Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
