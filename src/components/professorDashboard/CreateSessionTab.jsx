import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { FiBookOpen, FiLink, FiCalendar, FiClock, FiLayers, FiCheckCircle } from "react-icons/fi";

const EMPTY = { title: "", level: "", date: "", time: "", meetLink: "" };

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced", "All Levels"];

export default function CreateSessionTab() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post("/sessions", form);
      setSuccess(true);
      setForm(EMPTY);
      toast.success("Session created successfully!");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create session");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Create New Session</h2>
        <p className="text-sm text-gray-400 mt-0.5">Fill in the details to schedule a tutoring session for your students.</p>
      </div>

      {/* Success Banner */}
      {success && (
        <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl px-5 py-4">
          <FiCheckCircle size={20} />
          <p className="font-medium text-sm">Session created! Students can now enroll.</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Card header */}
        <div className="bg-gradient-to-r from-[#6A11CB] to-[#2575FC] px-6 py-5">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <FiBookOpen size={18} className="text-white/80" />
            Session Details
          </h3>
          <p className="text-white/50 text-xs mt-0.5">All fields are required</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Session Title
            </label>
            <div className="relative">
              <FiBookOpen size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="title"
                placeholder="e.g. Advanced Calculus — Week 3"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A11CB]/40 bg-gray-50 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Level
            </label>
            <div className="relative">
              <FiLayers size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A11CB]/40 bg-gray-50 focus:bg-white transition appearance-none"
              >
                <option value="">Select a level…</option>
                {LEVEL_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Date
              </label>
              <div className="relative">
                <FiCalendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A11CB]/40 bg-gray-50 focus:bg-white transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Time
              </label>
              <div className="relative">
                <FiClock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A11CB]/40 bg-gray-50 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Meeting Link
            </label>
            <div className="relative">
              <FiLink size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="meetLink"
                type="url"
                placeholder="https://meet.google.com/…"
                value={form.meetLink}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A11CB]/40 bg-gray-50 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl font-semibold text-white text-sm
              bg-gradient-to-r from-[#6A11CB] to-[#2575FC]
              hover:from-[#5A0EAD] hover:to-[#1D63D8]
              shadow-md hover:shadow-lg hover:-translate-y-0.5
              transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating…
              </span>
            ) : (
              "Create Session"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
