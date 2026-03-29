import { useState } from "react";
import { CheckCircle, MessageSquare } from "lucide-react";

export default function Inquire() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    gradeLevel: "", studentName: "", message: "",
    howHeard: "", currentSchool: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/forms/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section className="bg-[#1e4d2b] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-white/60 text-sm font-medium mb-2">Home / Admissions / Inquire</div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">Inquire Online</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
            Start your Cooper journey today. Fill out the form below and our admissions team will be in touch within 1–2 business days.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                  <CheckCircle size={48} className="text-[#1e4d2b] mx-auto mb-5" />
                  <h2 className="text-2xl font-bold font-serif text-gray-900 mb-3">Thank You for Reaching Out!</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We've received your inquiry and a member of our admissions team will be in touch within 1–2 business days.
                    We look forward to introducing you to The John Cooper School.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold font-serif text-gray-900 mb-6">Inquiry Form</h2>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Student's First Name</label>
                        <input name="studentName" value={form.studentName} onChange={handleChange} placeholder="Prospective student" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Grade Applying For *</label>
                        <select name="gradeLevel" value={form.gradeLevel} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b] bg-white">
                          <option value="">Select grade...</option>
                          {["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Current School</label>
                      <input name="currentSchool" value={form.currentSchool} onChange={handleChange} placeholder="Name of current school" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">How did you hear about Cooper?</label>
                      <select name="howHeard" value={form.howHeard} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b] bg-white">
                        <option value="">Select...</option>
                        <option value="friend">Friend or Family</option>
                        <option value="search">Online Search</option>
                        <option value="event">Admissions Event</option>
                        <option value="social">Social Media</option>
                        <option value="news">News or Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message / Questions</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your student and what you're looking for..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b] resize-none"
                      />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#1e4d2b] text-white font-semibold rounded-lg hover:bg-[#163820] transition-colors disabled:opacity-60 text-sm">
                      {loading ? "Submitting..." : "Submit Inquiry"}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      We respect your privacy. Your information will never be shared or sold.
                    </p>
                  </form>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-[#1e4d2b] text-white rounded-2xl p-7">
                <MessageSquare size={24} className="mb-4 opacity-80" />
                <h3 className="font-bold text-lg font-serif mb-3">We're Here to Help</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-5">
                  Our admissions team is available to answer any questions about The John Cooper School and help guide
                  your family through the process.
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <p>📞 (281) 367-0900</p>
                  <p>📧 admissions@johncooper.org</p>
                  <p>🕐 Mon–Fri: 7:30 AM – 4:30 PM</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Next Steps</h3>
                <ol className="space-y-3">
                  {["Submit this inquiry form", "Receive a welcome call from admissions", "Schedule a campus visit", "Begin the application"].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-[#1e4d2b] text-white text-xs flex items-center justify-center shrink-0 font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
