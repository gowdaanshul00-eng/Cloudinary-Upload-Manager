import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronRight, ChevronLeft, ChevronDown, Play, MapPin } from "lucide-react";
import { useImages, resolveImage } from "../hooks/useImages";

const HERO_SLIDES = [
  { category: "Cooper Faculty", title: "Dedicated and Caring", img: "image1", idx: 0 },
  { category: "Cooper Students", title: "Growing with Purpose", img: "image2", idx: 1 },
  { category: "Cooper Community", title: "Shaping Tomorrow's Leaders", img: "image3", idx: 2 },
];

const NEWS_ITEMS = [
  {
    label: "image10", index: 9,
    month: "FEB", day: "25",
    title: "Cooper Career Fair",
    excerpt: "Join us for the 4th annual Cooper Career Fair at The John Cooper School.",
  },
  {
    label: "image11", index: 10,
    month: "FEB", day: "20",
    title: "2026 Scholastic Art & Writing Awards",
    excerpt: "Cooper students receive top recognition in regional Scholastic competition.",
  },
  {
    label: "image12", index: 11,
    month: "FEB", day: "15",
    title: "Spring Fine Arts Showcase Draws Record Attendance",
    excerpt: "Annual showcase features over 200 student works spanning visual and performing arts.",
  },
  {
    label: "image13", index: 12,
    month: "FEB", day: "10",
    title: "Hawks Basketball Team Advances to Playoffs",
    excerpt: "Cooper's varsity basketball team clinches a playoff spot with an impressive streak.",
  },
  {
    label: "image14", index: 13,
    month: "FEB", day: "5",
    title: "New STEM Innovation Lab Opens",
    excerpt: "State-of-the-art facility now open to all Cooper students across grade levels.",
  },
];

const EVENTS = [
  { month: "APR", day: "1",  title: "Fine Arts Festival",               location: "Quarry Performing Arts/Gymnasium" },
  { month: "APR", day: "2",  title: "Early Release",                    location: "" },
  { month: "APR", day: "2",  title: "Cooper Day",                       location: "Quarry Performing Arts/Dance Studio-Music Room" },
  { month: "APR", day: "3",  title: "All School Holiday",               location: "" },
  { month: "APR", day: "5",  title: "Parents Annual Meeting",           location: "Quarry Performing Arts/Main" },
  { month: "APR", day: "5",  title: "Upper School Annual Choir Concert", location: "Quarry Performing Arts/Main" },
];

const ACCORDION_ITEMS = [
  {
    id: "inquire",
    label: "Inquire",
    href: "/inquire",
    content: "Have questions? Fill out our online inquiry form and a member of our admissions team will be in touch.",
  },
  {
    id: "apply",
    label: "Apply",
    href: "/apply",
    content: "Ready to join the Cooper community? Start your application to The John Cooper School today.",
  },
  {
    id: "visit",
    label: "Visit",
    href: "/visit",
    content: "Schedule a campus visit and experience Cooper's vibrant learning environment first-hand.",
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [newsSlide, setNewsSlide] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { data: images = [] } = useImages();

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNewsSlide((s) => (s + 1) % NEWS_ITEMS.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[82vh] min-h-[560px] overflow-hidden">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={resolveImage(images, s.img, s.idx)}
              alt={s.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
        ))}

        {/* Side nav arrows */}
        <button
          onClick={() => setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={34} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => setSlide((s) => (s + 1) % HERO_SLIDES.length)}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={34} strokeWidth={1.5} />
        </button>

        {/* Hero text + CTAs — centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 md:px-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight mb-2 drop-shadow-md">
            {HERO_SLIDES[slide].title}
          </h1>
          <p className="text-white/85 text-sm md:text-base mb-8 tracking-widest uppercase font-light">
            {HERO_SLIDES[slide].category}
          </p>

          {/* Play Video */}
          <button className="flex items-center gap-3 mb-6 group" aria-label="Play video">
            <span className="w-13 h-13 rounded-full bg-[#1e4d2b] flex items-center justify-center group-hover:bg-[#163820] transition-colors shadow-lg border border-white/20"
              style={{ width: 52, height: 52 }}>
              <Play size={20} fill="white" className="text-white ml-0.5" />
            </span>
            <span className="text-white text-sm font-medium tracking-wide">Play Video</span>
          </button>

          {/* Cooper Experience */}
          <Link
            href="/about"
            className="px-8 py-2.5 bg-[#1e4d2b] text-white text-sm font-semibold tracking-wide hover:bg-[#163820] transition-colors shadow"
          >
            Cooper Experience
          </Link>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${i === slide ? "bg-white w-3 h-3" : "bg-white/40 w-2.5 h-2.5"}`}
            />
          ))}
        </div>
      </section>

      {/* ── Recent News ── */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header row */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[17px] font-bold text-gray-900">Recent News</h2>
            <Link href="/news" className="text-gray-400 hover:text-[#1e4d2b] transition-colors -mr-1">
              <ChevronRight size={22} />
            </Link>
          </div>

          {/* Single news card */}
          <Link href="/news" className="flex gap-3.5 group">
            <div className="relative shrink-0 w-28 h-20 overflow-hidden rounded-sm">
              <img
                src={resolveImage(images, NEWS_ITEMS[newsSlide].label, NEWS_ITEMS[newsSlide].index)}
                alt={NEWS_ITEMS[newsSlide].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-0 left-0 bg-[#1e4d2b] text-white text-[9px] font-bold px-1.5 py-0.5 leading-tight">
                {NEWS_ITEMS[newsSlide].month} {NEWS_ITEMS[newsSlide].day}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#1e4d2b] transition-colors">
                {NEWS_ITEMS[newsSlide].title}
              </h3>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
                {NEWS_ITEMS[newsSlide].excerpt}
              </p>
            </div>
          </Link>

          {/* News carousel dots */}
          <div className="flex gap-1.5 mt-4">
            {NEWS_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setNewsSlide(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === newsSlide ? "bg-gray-700 w-2 h-2" : "bg-gray-300 w-2 h-2"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header row */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[17px] font-bold text-gray-900">Upcoming Events</h2>
            <Link
              href="/news"
              className="px-3 py-1 border border-[#1e4d2b] text-[#1e4d2b] text-[11px] font-semibold hover:bg-[#1e4d2b] hover:text-white transition-colors tracking-wide"
            >
              View Calendar
            </Link>
          </div>

          {/* Events list */}
          <div>
            {EVENTS.map((ev, i) => (
              <Link
                key={i}
                href="/news"
                className={`flex gap-4 py-3.5 hover:bg-gray-50/80 transition-colors -mx-1 px-1 ${
                  i < EVENTS.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="shrink-0 w-10 text-center pt-0.5">
                  <div className="text-[#1e4d2b] text-[10px] font-bold uppercase leading-none tracking-widest">
                    {ev.month}
                  </div>
                  <div className="text-xl font-bold text-gray-900 leading-tight">{ev.day}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-800 text-[13px] font-medium leading-snug">{ev.title}</div>
                  {ev.location && (
                    <div className="text-gray-400 text-[11px] mt-0.5 truncate">{ev.location}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cooper At A Glance ── */}
      <section className="py-7 bg-gray-50 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-[17px] font-bold text-gray-900 mb-5">Cooper At A Glance</h2>

          <div className="flex gap-6 mb-6">
            <p className="flex-1 text-[13px] text-gray-600 leading-relaxed">
              Established in 1988, The John Cooper School is a college-preparatory, independent
              Pre-K through Grade 12 school in the Greater Houston Area.
            </p>
            <div className="shrink-0 flex items-start gap-2">
              <MapPin size={15} className="text-[#1e4d2b] mt-1" />
              <div>
                <div className="text-3xl font-bold text-gray-900 leading-none">1,378</div>
                <div className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">Students</div>
              </div>
            </div>
          </div>

          {/* Experience Cooper accordion */}
          <div className="mt-3 mb-1">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium mb-2">
              Experience Cooper
            </p>
            <div className="flex flex-col gap-px">
              {ACCORDION_ITEMS.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between px-4 py-3.5 bg-[#1e4d2b] text-white hover:bg-[#163820] transition-colors"
                  >
                    <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                    <ChevronDown
                      size={15}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${openAccordion === item.id ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openAccordion === item.id && (
                    <div className="px-4 py-4 bg-white border border-t-0 border-gray-100">
                      <p className="text-[13px] text-gray-600 leading-relaxed mb-3">{item.content}</p>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-[13px] text-[#1e4d2b] font-semibold hover:underline"
                      >
                        {item.label} Online <ChevronRight size={13} />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── School Info Bar ── */}
      <section className="py-5 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-[13px] font-bold text-gray-800">The John Cooper School</p>
          <p className="text-[12px] text-gray-500 mt-0.5">One John Cooper Drive, The Woodlands, TX</p>
          <a
            href="https://www.johncooper.org"
            className="text-[12px] text-[#1e4d2b] hover:underline mt-0.5 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            johncooper.org
          </a>
        </div>
      </section>
    </div>
  );
}
