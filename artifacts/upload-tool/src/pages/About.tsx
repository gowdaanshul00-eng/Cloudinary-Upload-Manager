import { Link } from "wouter";
import { ArrowRight, Award, Users, BookOpen, Heart } from "lucide-react";
import { useImages, resolveImage } from "../hooks/useImages";

const LEADERSHIP = [
  { name: "Dr. Sandy Meyer", role: "Head of School", img: "image20", idx: 19 },
  { name: "Dr. James Crawford", role: "Upper School Director", img: "image21", idx: 20 },
  { name: "Mrs. Patricia Lowe", role: "Middle School Director", img: "image22", idx: 21 },
  { name: "Ms. Rebecca Tanner", role: "Lower School Director", img: "image23", idx: 22 },
];

const VALUES = [
  { icon: BookOpen, title: "Academic Excellence", desc: "Rigorous, personalized curriculum preparing students for the world's best universities." },
  { icon: Heart, title: "Character Development", desc: "Building integrity, empathy, and leadership alongside intellectual growth." },
  { icon: Users, title: "Community", desc: "A close-knit community of engaged families, dedicated faculty, and inspired students." },
  { icon: Award, title: "Whole-Child Education", desc: "Embracing arts, athletics, and service to develop well-rounded, confident graduates." },
];

export default function About() {
  const { data: images = [] } = useImages();

  return (
    <div>
      <section className="relative h-72 overflow-hidden">
        <img src={resolveImage(images, "image14", 13)} alt="About Cooper" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1e4d2b]/75 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-white/70 text-sm font-medium mb-2">Home / About</div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">About Cooper</h1>
          </div>
        </div>
      </section>

      <nav className="bg-white border-b border-gray-200 sticky top-[116px] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {["Mission", "History", "Leadership", "Campus", "Diversity"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-4 text-sm font-medium text-gray-600 hover:text-[#1e4d2b] border-b-2 border-transparent hover:border-[#1e4d2b] transition-colors whitespace-nowrap">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Our Mission</div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-6">
                Empowering Students to Think, Lead, and Serve
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                The John Cooper School is dedicated to providing a challenging and supportive environment that empowers
                students of exceptional potential to excel academically, develop their character, and contribute meaningfully
                to a complex and changing world.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We believe that education extends beyond the classroom. At Cooper, students discover their passions,
                develop their talents, and build the skills they need to thrive in college and in life.
              </p>
              <blockquote className="border-l-4 border-[#1e4d2b] pl-5 italic text-gray-700">
                "Cooper's mission is to create a community of lifelong learners and leaders who approach every
                challenge with curiosity, integrity, and purpose."
              </blockquote>
            </div>
            <div className="relative">
              <img src={resolveImage(images, "image15", 14)} alt="Mission" className="rounded-xl w-full h-96 object-cover" />
              <div className="absolute -bottom-6 -right-6 bg-[#1e4d2b] text-white p-8 rounded-xl max-w-xs">
                <div className="text-4xl font-bold font-serif">35+</div>
                <div className="text-white/80 text-sm mt-1">Years of Excellence in Education</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Core Values</div>
            <h2 className="text-3xl font-bold font-serif text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val) => (
              <div key={val.title} className="text-center p-8 bg-white rounded-xl shadow-sm">
                <div className="w-14 h-14 bg-[#1e4d2b]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <val.icon size={24} className="text-[#1e4d2b]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="history" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img src={resolveImage(images, "image16", 15)} alt="History" className="rounded-xl w-full h-80 object-cover" />
            </div>
            <div>
              <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Our History</div>
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-6">Founded on a Vision</h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  The John Cooper School was founded in 1988 by a group of passionate educators and parents who shared
                  a vision for an exceptional independent school in The Woodlands, Texas.
                </p>
                <p>
                  Named in honor of John Cooper, a beloved educator and community leader, the school began with just a
                  small class of students and has grown to serve nearly 1,200 students across K–12.
                </p>
                <p>
                  Today, Cooper is recognized as one of the premier college-preparatory schools in the state, with a
                  distinguished alumni network spanning business, medicine, law, the arts, and public service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="leadership" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Administration</div>
            <h2 className="text-3xl font-bold font-serif text-gray-900">School Leadership</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {LEADERSHIP.map((leader) => (
              <div key={leader.name} className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img src={resolveImage(images, leader.img, leader.idx)} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-gray-900">{leader.name}</h3>
                <p className="text-[#1e4d2b] text-sm mt-1">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="campus" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Our Campus</div>
            <h2 className="text-3xl font-bold font-serif text-gray-900">World-Class Facilities</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm">
              Cooper's beautiful campus in The Woodlands offers state-of-the-art facilities for every dimension of student life.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[24, 25, 26, 27, 28, 29].map((idx) => (
              <div key={idx} className="rounded-xl overflow-hidden h-52">
                <img
                  src={resolveImage(images, `image${idx - 10}`, idx - 1)}
                  alt={`Campus ${idx}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1e4d2b] py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold font-serif text-white mb-4">Experience Cooper for Yourself</h2>
          <p className="text-white/80 mb-8">Schedule a campus tour and see why students and families choose Cooper.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/visit" className="px-7 py-3.5 bg-white text-[#1e4d2b] font-bold rounded hover:bg-white/90 transition-colors">
              Plan a Visit
            </Link>
            <Link href="/inquire" className="px-7 py-3.5 border-2 border-white/60 text-white font-bold rounded hover:bg-white/10 transition-colors">
              Learn More <ArrowRight size={16} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
