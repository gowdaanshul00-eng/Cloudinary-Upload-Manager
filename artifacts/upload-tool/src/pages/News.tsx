import { Link } from "wouter";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { useImages, resolveImage } from "../hooks/useImages";

const NEWS = [
  { label: "image28", idx: 27, category: "Academics", date: "March 20, 2026", title: "Seven Cooper Students Named National Merit Semifinalists", excerpt: "A record seven Cooper students earned National Merit Semifinalist recognition, highlighting the school's commitment to academic excellence." },
  { label: "image29", idx: 28, category: "Athletics", date: "March 18, 2026", title: "Hawks Swim Team Wins SPC Championships for Third Consecutive Year", excerpt: "The Cooper Hawks swim team defended their Southwest Preparatory Conference title, capturing gold in 8 events." },
  { label: "image30", idx: 29, category: "Arts", date: "March 15, 2026", title: "Upper School Drama Department Opens Spring Musical", excerpt: "The Cooper Players open their spring production of 'Into the Woods' to sold-out audiences and rave reviews." },
  { label: "image31", idx: 30, category: "Community", date: "March 12, 2026", title: "Cooper Community Raises Over $180,000 at Annual Auction Gala", excerpt: "The annual Auction Gala brought the Cooper community together for a record-setting fundraising evening." },
  { label: "image32", idx: 31, category: "Academics", date: "March 8, 2026", title: "Robotics Team Advances to World Championship", excerpt: "The Cooper Robotics Team secured their spot at the FIRST Robotics World Championship after a dominant performance." },
  { label: "image33", idx: 32, category: "College Counseling", date: "March 5, 2026", title: "Class of 2026 College Acceptances Highlight Year of Achievement", excerpt: "Cooper seniors have received acceptances to Harvard, MIT, Stanford, and dozens of other top universities nationwide." },
];

const EVENTS = [
  { month: "APR", day: "5", title: "Open House & Campus Tour", time: "9:00 AM – 12:00 PM", type: "Admissions" },
  { month: "APR", day: "10", title: "Upper School Drama: Into the Woods", time: "7:00 PM", type: "Arts" },
  { month: "APR", day: "12", title: "Spring Gala Benefit Dinner", time: "6:30 PM – 10:00 PM", type: "Community" },
  { month: "APR", day: "15", title: "Middle School Science Fair", time: "1:00 PM – 4:00 PM", type: "Academics" },
  { month: "APR", day: "18", title: "AP Exam Week Begins", time: "All Day", type: "Academics" },
  { month: "APR", day: "22", title: "Earth Day Stewardship Projects", time: "8:00 AM", type: "Community" },
  { month: "APR", day: "25", title: "Fine Arts Spring Concert", time: "7:00 PM", type: "Arts" },
  { month: "APR", day: "28", title: "Varsity Track Invitational", time: "9:00 AM", type: "Athletics" },
  { month: "MAY", day: "3", title: "Commencement Ceremony", time: "10:00 AM", type: "School" },
  { month: "MAY", day: "10", title: "Lower School Field Day", time: "9:00 AM", type: "School" },
  { month: "MAY", day: "15", title: "Spring Sports Banquet", time: "6:30 PM", type: "Athletics" },
  { month: "MAY", day: "22", title: "Last Day of School", time: "All Day", type: "School" },
];

const TYPE_COLORS: Record<string, string> = {
  Admissions: "bg-blue-100 text-blue-700",
  Arts: "bg-purple-100 text-purple-700",
  Community: "bg-amber-100 text-amber-700",
  Academics: "bg-green-100 text-green-700",
  Athletics: "bg-red-100 text-red-700",
  School: "bg-gray-100 text-gray-700",
};

export default function News() {
  const { data: images = [] } = useImages();

  return (
    <div>
      <section className="relative h-72 overflow-hidden">
        <img src={resolveImage(images, "image34", 33)} alt="News" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1e4d2b]/75 flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-white/70 text-sm font-medium mb-2">Home / News & Events</div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">News & Events</h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-2">Latest</div>
              <h2 className="text-3xl font-bold font-serif text-gray-900">School News</h2>
            </div>
            <div className="flex gap-2">
              {["All", "Academics", "Athletics", "Arts", "Community"].map((cat) => (
                <button key={cat} className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-full hover:border-[#1e4d2b] hover:text-[#1e4d2b] transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEWS.map((item, i) => (
              <Link key={i} href="#" className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-52 overflow-hidden">
                  <img src={resolveImage(images, item.label, item.idx)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${TYPE_COLORS[item.category] ?? "bg-gray-100 text-gray-600"}`}>
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
                  <div className="mt-4 flex items-center gap-1 text-[#1e4d2b] text-sm font-semibold group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Calendar</div>
            <h2 className="text-3xl font-bold font-serif text-gray-900">Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EVENTS.map((event, i) => (
              <div key={i} className="flex gap-5 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center shrink-0 w-16 bg-[#1e4d2b] rounded-lg p-2 text-white">
                  <div className="text-xs font-bold uppercase">{event.month}</div>
                  <div className="text-2xl font-bold font-serif leading-tight">{event.day}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{event.title}</h3>
                    <span className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded-full ${TYPE_COLORS[event.type] ?? "bg-gray-100 text-gray-600"}`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-gray-400 text-xs">
                    <Clock size={11} /> {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
