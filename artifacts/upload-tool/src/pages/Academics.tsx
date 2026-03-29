import { Link } from "wouter";
import { ArrowRight, Microscope, Palette, Trophy, Code, Globe, Music } from "lucide-react";
import { useImages, resolveImage } from "../hooks/useImages";

const DEPARTMENTS = [
  { icon: Microscope, label: "Science & Math" },
  { icon: Globe, label: "Humanities" },
  { icon: Code, label: "Technology" },
  { icon: Palette, label: "Visual Arts" },
  { icon: Music, label: "Performing Arts" },
  { icon: Trophy, label: "Athletics" },
];

const AP_COURSES = [
  "AP Biology", "AP Chemistry", "AP Physics", "AP Calculus AB/BC",
  "AP Statistics", "AP English Literature", "AP English Language",
  "AP US History", "AP World History", "AP European History",
  "AP Government", "AP Economics", "AP Psychology",
  "AP Spanish", "AP French", "AP Computer Science",
  "AP Art History", "AP Studio Art",
];

export default function Academics() {
  const { data: images = [] } = useImages();

  return (
    <div>
      <section className="relative h-72 overflow-hidden">
        <img src={resolveImage(images, "image17", 16)} alt="Academics" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1e4d2b]/75 flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-white/70 text-sm font-medium mb-2">Home / Academics</div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">Academics</h1>
          </div>
        </div>
      </section>

      <nav className="bg-white border-b border-gray-200 sticky top-[116px] z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-0">
            {["Overview", "Lower School", "Middle School", "Upper School", "Arts", "Athletics", "College"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="px-4 py-4 text-sm font-medium text-gray-600 hover:text-[#1e4d2b] border-b-2 border-transparent hover:border-[#1e4d2b] transition-colors whitespace-nowrap">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="overview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Overview</div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">Academic Excellence at Every Level</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Cooper's rigorous curriculum challenges students to think critically, communicate clearly, and approach problems
              creatively — skills that prepare them for success in college and beyond.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.label} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-[#1e4d2b] hover:text-white group transition-colors">
                <dept.icon size={28} className="mx-auto mb-3 text-[#1e4d2b] group-hover:text-white transition-colors" />
                <div className="text-sm font-semibold text-gray-800 group-hover:text-white transition-colors">{dept.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lower-school" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img src={resolveImage(images, "image18", 17)} alt="Lower School" className="rounded-xl w-full h-96 object-cover" />
            </div>
            <div>
              <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-2">Lower School</div>
              <div className="text-gray-400 text-sm mb-3">Kindergarten – Grade 4</div>
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-5">Building the Foundation</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cooper's Lower School nurtures the whole child, cultivating curiosity, creativity, and a love of learning
                in a warm, supportive environment. Our experienced teachers use inquiry-based approaches to make learning
                meaningful and joyful.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Students develop strong foundations in reading, writing, mathematics, and science, while participating
                in art, music, library, physical education, and Spanish beginning in kindergarten.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {["Literacy-rich, language-based curriculum", "Spanish instruction from Kindergarten", "STEM integration and Maker Space", "Character education and service learning"].map(pt => (
                  <li key={pt} className="flex gap-2"><span className="text-[#1e4d2b] font-bold">•</span>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="middle-school" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-2">Middle School</div>
              <div className="text-gray-400 text-sm mb-3">Grades 5 – 8</div>
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-5">Discovering Identity & Possibility</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Middle School at Cooper is a pivotal time of discovery. Students transition to a departmentalized model
                with specialist teachers in every subject, challenging them to develop independence, critical thinking,
                and collaborative skills.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                {["Project-based and interdisciplinary learning", "Electives in arts, technology, and leadership", "Athletics and interscholastic sports", "Advisory program for academic and social support"].map(pt => (
                  <li key={pt} className="flex gap-2"><span className="text-[#1e4d2b] font-bold">•</span>{pt}</li>
                ))}
              </ul>
            </div>
            <div>
              <img src={resolveImage(images, "image19", 18)} alt="Middle School" className="rounded-xl w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="upper-school" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img src={resolveImage(images, "image20", 19)} alt="Upper School" className="rounded-xl w-full h-96 object-cover" />
            </div>
            <div>
              <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-2">Upper School</div>
              <div className="text-gray-400 text-sm mb-3">Grades 9 – 12</div>
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-5">College Preparation & Leadership</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Cooper's Upper School offers a dynamic, college-preparatory curriculum designed to challenge the most
                ambitious students while supporting their individual growth. With over 18 AP courses and a dedicated
                college counseling team, our graduates are prepared to thrive at the nation's top universities.
              </p>
              <div className="bg-[#1e4d2b]/5 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">AP Courses Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {AP_COURSES.map((course) => (
                    <span key={course} className="px-2.5 py-1 bg-[#1e4d2b]/10 text-[#1e4d2b] text-xs rounded-full font-medium">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="arts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Fine Arts</div>
            <h2 className="text-3xl font-bold font-serif text-gray-900">Arts at Cooper</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Visual Arts", img: "image21", idx: 20, desc: "Studio art, photography, ceramics, graphic design, and AP Studio Art" },
              { title: "Performing Arts", img: "image22", idx: 21, desc: "Theater productions, musicals, improv, film studies, and speech" },
              { title: "Music", img: "image23", idx: 22, desc: "Band, orchestra, choir, guitar, and jazz ensemble from K–12" },
            ].map((prog) => (
              <div key={prog.title} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={resolveImage(images, prog.img, prog.idx)} alt={prog.title} className="w-full h-52 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{prog.title}</h3>
                  <p className="text-gray-500 text-sm">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="athletics" className="py-20 bg-[#1e4d2b] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-3">Athletics</div>
              <h2 className="text-3xl font-bold font-serif mb-5">Cooper Hawks Athletics</h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Competing in the Southwest Preparatory Conference (SPC), the Cooper Hawks field teams in 19 varsity
                sports. Athletics at Cooper teach teamwork, resilience, and leadership while supporting academic success.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {["Baseball", "Basketball", "Cross Country", "Football", "Golf", "Lacrosse", "Soccer", "Softball", "Swimming", "Tennis", "Track & Field", "Volleyball"].map((sport) => (
                  <div key={sport} className="flex items-center gap-2 text-sm text-white/80">
                    <Trophy size={12} className="text-white/50" /> {sport}
                  </div>
                ))}
              </div>
              <Link href="/admissions" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e4d2b] font-semibold rounded hover:bg-white/90 transition-colors text-sm">
                Explore Athletics <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[24, 25, 26, 27].map((idx) => (
                <img key={idx} src={resolveImage(images, `image${idx}`, idx - 1)} alt={`Athletics ${idx}`} className="rounded-xl w-full h-44 object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
