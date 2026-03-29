import { Link } from "wouter";
import { ArrowRight, CheckCircle, ExternalLink, FileText, Users, Calendar, ClipboardList } from "lucide-react";
import { useImages, resolveImage } from "../hooks/useImages";

const REQUIREMENTS = [
  { icon: FileText, title: "Online Application", desc: "Complete the digital application form with student and family information." },
  { icon: ClipboardList, title: "Academic Records", desc: "Submit two years of transcripts and the most recent standardized test scores." },
  { icon: Users, title: "Teacher Recommendations", desc: "Two teacher recommendations from current school instructors." },
  { icon: Calendar, title: "Student Interview", desc: "An in-person or virtual interview with the admissions team." },
];

const DEADLINES = [
  { round: "Early Action", deadline: "November 15, 2025", decision: "December 15, 2025", note: "Priority consideration for merit scholarships" },
  { round: "Regular Decision", deadline: "January 15, 2026", decision: "March 1, 2026", note: "Standard admissions timeline" },
  { round: "Rolling Admissions", deadline: "Subject to availability", decision: "Within 4–6 weeks", note: "For grades with open enrollment" },
];

export default function Apply() {
  const { data: images = [] } = useImages();

  return (
    <div>
      <section className="relative h-72 overflow-hidden">
        <img src={resolveImage(images, "image37", 36)} alt="Apply to Cooper" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1e4d2b]/80 flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-white/70 text-sm font-medium mb-2">Home / Admissions / Apply</div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">Apply to Cooper</h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Application</div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">Begin Your Application</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
              We're excited that you're considering The John Cooper School. The application process is straightforward
              and our team is here to support you every step of the way.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1e4d2b]/5 border border-[#1e4d2b]/20 rounded-2xl p-10 text-center mb-16">
              <div className="w-16 h-16 bg-[#1e4d2b] rounded-full flex items-center justify-center mx-auto mb-5">
                <FileText size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">Apply Online via Ravenna</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                Cooper uses the Ravenna admissions platform for all applications. Create an account or log in to
                begin your secure, online application — available 24/7.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e4d2b] text-white font-bold rounded-lg hover:bg-[#163820] transition-colors"
                >
                  Start New Application <ArrowRight size={16} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1e4d2b] text-[#1e4d2b] font-bold rounded-lg hover:bg-[#1e4d2b] hover:text-white transition-colors"
                >
                  Return to Existing Application <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-xl font-bold font-serif text-gray-900 text-center mb-8">Application Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REQUIREMENTS.map((req) => (
                  <div key={req.title} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-[#1e4d2b]/10 rounded-lg flex items-center justify-center shrink-0">
                      <req.icon size={20} className="text-[#1e4d2b]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{req.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{req.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold font-serif text-gray-900 text-center mb-8">Application Deadlines</h3>
              <div className="space-y-4">
                {DEADLINES.map((dl, i) => (
                  <div key={i} className={`p-6 rounded-xl border ${i === 0 ? "border-[#1e4d2b] bg-[#1e4d2b]/5" : "border-gray-200 bg-white"}`}>
                    <div className="flex flex-wrap justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900">{dl.round}</h4>
                          {i === 0 && <span className="px-2 py-0.5 bg-[#1e4d2b] text-white text-xs font-semibold rounded-full">Recommended</span>}
                        </div>
                        <p className="text-gray-500 text-sm">{dl.note}</p>
                      </div>
                      <div className="flex gap-8 text-sm text-right">
                        <div>
                          <div className="text-gray-400 text-xs mb-0.5">Application Deadline</div>
                          <div className="font-semibold text-gray-900">{dl.deadline}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs mb-0.5">Decision Date</div>
                          <div className="font-semibold text-gray-900">{dl.decision}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Application Fee", value: "$75", note: "Non-refundable" },
              { title: "Processing Time", value: "4–6 Weeks", note: "After complete file received" },
              { title: "Open Enrollment", value: "K–12", note: "For qualified applicants" },
            ].map((stat) => (
              <div key={stat.title} className="bg-white rounded-xl p-8 text-center shadow-sm">
                <div className="text-3xl font-bold font-serif text-[#1e4d2b] mb-1">{stat.value}</div>
                <div className="font-semibold text-gray-900">{stat.title}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1e4d2b] py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold font-serif text-white mb-4">Have Questions About the Process?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Our admissions team is available to walk you through every step of the application.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/inquire" className="px-7 py-3.5 bg-white text-[#1e4d2b] font-bold rounded-lg hover:bg-white/90 transition-colors">
              Contact Admissions
            </Link>
            <Link href="/visit" className="px-7 py-3.5 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
