import { Link } from "wouter";
import { CheckCircle, ArrowRight, Download, Phone, Mail } from "lucide-react";
import { useImages, resolveImage } from "../hooks/useImages";

const STEPS = [
  { num: "01", title: "Explore & Inquire", desc: "Learn about Cooper's programs and submit an inquiry form to start the conversation with our admissions team.", action: "Inquire Now", href: "/inquire" },
  { num: "02", title: "Visit Campus", desc: "Schedule a personal campus tour and shadow experience to see Cooper life firsthand.", action: "Schedule Visit", href: "/visit" },
  { num: "03", title: "Submit Application", desc: "Complete the online application, including teacher recommendations and academic records.", action: "Apply Online", href: "/apply" },
  { num: "04", title: "Admissions Interview", desc: "Meet with our admissions team and touring faculty for a student interview session.", action: "Learn More", href: "/admissions" },
  { num: "05", title: "Admission Decision", desc: "Receive your admission decision and enrollment materials to join the Cooper community.", action: "Start Today", href: "/apply" },
];

const PROGRAMS = [
  { grade: "Kindergarten", ages: "Age 5", ratio: "12:1", feature: "Inquiry-based learning, reading readiness, and creative exploration." },
  { grade: "Lower School", ages: "Grades 1–4", ratio: "14:1", feature: "Core academics with integrated arts, technology, and physical education." },
  { grade: "Middle School", ages: "Grades 5–8", ratio: "14:1", feature: "Departmentalized instruction, project-based learning, electives, and athletics." },
  { grade: "Upper School", ages: "Grades 9–12", ratio: "12:1", feature: "AP coursework, dual enrollment, college counseling, and leadership opportunities." },
];

export default function Admissions() {
  const { data: images = [] } = useImages();

  return (
    <div>
      <section className="relative h-72 overflow-hidden">
        <img src={resolveImage(images, "image30", 29)} alt="Admissions" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1e4d2b]/75 flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-white/70 text-sm font-medium mb-2">Home / Admissions</div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">Admissions</h1>
          </div>
        </div>
      </section>

      <nav className="bg-white border-b border-gray-200 sticky top-[116px] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {["Why Cooper", "Process", "Programs", "Tuition", "Financial Aid"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="px-5 py-4 text-sm font-medium text-gray-600 hover:text-[#1e4d2b] border-b-2 border-transparent hover:border-[#1e4d2b] transition-colors whitespace-nowrap">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="why-cooper" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Why Cooper</div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-6">
                The Right Place for Exceptional Students
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  "Small class sizes and individualized attention from expert faculty",
                  "100% college acceptance rate with students attending top universities",
                  "Comprehensive arts, athletics, and extracurricular programs",
                  "State-of-the-art campus facilities in The Woodlands",
                  "A diverse, inclusive community of over 1,200 students",
                  "Personalized college counseling beginning in 9th grade",
                ].map((point) => (
                  <li key={point} className="flex gap-3">
                    <CheckCircle size={18} className="text-[#1e4d2b] shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Link href="/apply" className="px-6 py-3 bg-[#1e4d2b] text-white font-semibold text-sm rounded hover:bg-[#163820] transition-colors">
                  Apply Now
                </Link>
                <Link href="/visit" className="px-6 py-3 border-2 border-[#1e4d2b] text-[#1e4d2b] font-semibold text-sm rounded hover:bg-[#1e4d2b] hover:text-white transition-colors">
                  Visit Campus
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[31, 32, 33, 34].map((idx) => (
                <img key={idx} src={resolveImage(images, `image${idx - 16}`, idx - 1)} alt="" className="rounded-lg w-full h-44 object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Application</div>
            <h2 className="text-3xl font-bold font-serif text-gray-900">The Admissions Process</h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto text-sm">
              Our admissions process is designed to help us get to know your student and help you get to know Cooper.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#1e4d2b]/20 z-0" />
                )}
                <div className="bg-white rounded-xl p-6 text-center shadow-sm relative z-10">
                  <div className="w-14 h-14 bg-[#1e4d2b] text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{step.desc}</p>
                  <Link href={step.href} className="text-[#1e4d2b] text-xs font-semibold hover:underline">
                    {step.action} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Programs</div>
            <h2 className="text-3xl font-bold font-serif text-gray-900">Grade-Level Programs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((prog, i) => (
              <div key={prog.grade} className="border border-gray-200 rounded-xl p-6 hover:border-[#1e4d2b] hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-[#1e4d2b]/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-[#1e4d2b] font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{prog.grade}</h3>
                <div className="text-[#1e4d2b] text-xs font-semibold mb-1">{prog.ages}</div>
                <div className="text-gray-400 text-xs mb-3">Ratio: {prog.ratio}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{prog.feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tuition" className="py-20 bg-[#1e4d2b] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-3">Investment</div>
              <h2 className="text-3xl font-bold font-serif mb-6">Tuition & Financial Aid</h2>
              <p className="text-white/80 leading-relaxed mb-6">
                A Cooper education is an investment in your child's future. We are committed to making this education
                accessible through a robust financial aid program.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Kindergarten", amount: "$21,500" },
                  { label: "Grades 1–4", amount: "$24,100" },
                  { label: "Grades 5–8", amount: "$27,800" },
                  { label: "Grades 9–12", amount: "$31,200" },
                ].map((tier) => (
                  <div key={tier.label} className="flex justify-between items-center py-3 border-b border-white/20">
                    <span className="text-white/80">{tier.label}</span>
                    <span className="font-bold">{tier.amount}/year</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1e4d2b] font-semibold text-sm rounded">
                  <Download size={15} /> Download Fee Schedule
                </a>
                <Link href="/inquire" className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/40 text-white font-semibold text-sm rounded hover:bg-white/10">
                  Apply for Aid <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold font-serif mb-4">Financial Aid</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Cooper awards need-based financial aid to families who demonstrate financial need. Over 20% of our
                students receive some form of financial assistance.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Need-based grants and scholarships available",
                  "Multi-child family discounts",
                  "Payment plan options available",
                  "Transparent and confidential process",
                ].map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-sm text-white/80">
                    <CheckCircle size={15} className="shrink-0 mt-0.5 text-white/60" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <a href="tel:+12813670900" className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
                  <Phone size={14} /> (281) 367-0900
                </a>
                <a href="mailto:admissions@johncooper.org" className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
                  <Mail size={14} /> admissions@johncooper.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
