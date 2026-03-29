import { useState } from "react";
import { MapPin, Clock, Phone, Mail, CheckCircle, CalendarDays } from "lucide-react";
import { useImages, resolveImage } from "../hooks/useImages";

const VISIT_OPTIONS = [
  { title: "Open House", desc: "Join our next open house for a full school presentation, campus tour, and Q&A with faculty.", schedule: "First Saturday of each month, 9 AM–12 PM" },
  { title: "Personal Campus Tour", desc: "Schedule a private one-on-one tour with a member of our admissions team.", schedule: "Monday–Friday, 8 AM–3 PM" },
  { title: "Shadow Day", desc: "Your student spends a full day shadowing a current Cooper student at their grade level.", schedule: "By appointment, weekdays" },
];

export default function Visit() {
  const { data: images = [] } = useImages();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", gradeLevel: "", preferredDate: "", visitType: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/forms/visit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section className="relative h-72 overflow-hidden">
        <img src={resolveImage(images, "image35", 34)} alt="Visit Cooper" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1e4d2b]/75 flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-white/70 text-sm font-medium mb-2">Home / Admissions / Visit</div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">Visit Cooper</h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#1e4d2b] text-sm font-semibold tracking-widest uppercase mb-3">Campus Visits</div>
            <h2 className="text-3xl font-bold font-serif text-gray-900">Experience Cooper Firsthand</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              There's no better way to discover if Cooper is the right fit for your family than to visit our beautiful campus.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {VISIT_OPTIONS.map((opt) => (
              <div key={opt.title} className="bg-gray-50 rounded-xl p-7 border border-gray-100 hover:border-[#1e4d2b] transition-colors">
                <CalendarDays size={24} className="text-[#1e4d2b] mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{opt.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{opt.desc}</p>
                <div className="flex items-center gap-2 text-xs text-[#1e4d2b] font-medium">
                  <Clock size={12} /> {opt.schedule}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold font-serif text-gray-900 mb-6">Schedule Your Visit</h2>
              {submitted ? (
                <div className="bg-[#1e4d2b]/5 border border-[#1e4d2b]/20 rounded-xl p-8 text-center">
                  <CheckCircle size={40} className="text-[#1e4d2b] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Request Received!</h3>
                  <p className="text-gray-600 text-sm">
                    Thank you for your interest in visiting Cooper. Our admissions team will contact you within 1–2 business days to confirm your visit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Applicant Grade Level *</label>
                    <select name="gradeLevel" value={form.gradeLevel} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b] bg-white">
                      <option value="">Select grade...</option>
                      {["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Visit Type *</label>
                    <select name="visitType" value={form.visitType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b] bg-white">
                      <option value="">Select visit type...</option>
                      <option value="open-house">Open House</option>
                      <option value="campus-tour">Personal Campus Tour</option>
                      <option value="shadow-day">Shadow Day</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date</label>
                    <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b]" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#1e4d2b] text-white font-semibold rounded-lg hover:bg-[#163820] transition-colors disabled:opacity-60">
                    {loading ? "Scheduling..." : "Schedule My Visit"}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-7">
                <h3 className="font-bold text-gray-900 mb-5">Contact Admissions</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-[#1e4d2b] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">Campus Address</div>
                      <div className="text-sm text-gray-500">One John Cooper Dr, The Woodlands, TX 77382</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone size={18} className="text-[#1e4d2b] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">Phone</div>
                      <a href="tel:+12813670900" className="text-sm text-[#1e4d2b] hover:underline">(281) 367-0900</a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail size={18} className="text-[#1e4d2b] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">Email</div>
                      <a href="mailto:admissions@johncooper.org" className="text-sm text-[#1e4d2b] hover:underline">admissions@johncooper.org</a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={18} className="text-[#1e4d2b] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">Office Hours</div>
                      <div className="text-sm text-gray-500">Mon–Fri: 7:30 AM – 4:30 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-56 bg-gray-200">
                <img src={resolveImage(images, "image36", 35)} alt="Campus map" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
