import { useState, useRef } from 'react'
import { useMagneticButton } from '../../hooks/useMagneticButton'
import { Send, CheckCircle } from 'lucide-react'

const subjects = [
  'General Enquiry',
  'Supplier Onboarding',
  'Bulk Order',
  'Technical Support',
]

function FloatingInput({ id, label, type = 'text', value, onChange, required }) {
  const filled = value.length > 0
  return (
    <div className="relative pt-5">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full border-b-2 border-slate-300 dark:border-slate-600 bg-transparent py-3 text-slate-900 dark:text-white font-body text-base outline-none transition-colors duration-200 focus:border-orange-500"
      />
      <label
        htmlFor={id}
        className={`absolute left-0 font-body text-sm transition-all duration-200 pointer-events-none ${
          filled
            ? 'top-0 text-xs text-orange-500'
            : 'top-8 text-slate-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({ id, label, value, onChange, required }) {
  const filled = value.length > 0
  return (
    <div className="relative pt-5">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        placeholder=" "
        className="peer w-full border-b-2 border-slate-300 dark:border-slate-600 bg-transparent py-3 text-slate-900 dark:text-white font-body text-base outline-none resize-none transition-colors duration-200 focus:border-orange-500"
      />
      <label
        htmlFor={id}
        className={`absolute left-0 font-body text-sm transition-all duration-200 pointer-events-none ${
          filled
            ? 'top-0 text-xs text-orange-500'
            : 'top-8 text-slate-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const { ref: btnRef, onMouseMove, onMouseLeave } = useMagneticButton(0.3)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-8 md:p-12">
      <p className="font-body text-orange-500 text-xs uppercase tracking-widest font-semibold mb-8">Send a Message</p>

      {submitted ? (
        <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">Message Sent!</h3>
          <p className="font-body text-slate-500 dark:text-slate-400">We'll respond within 24 hours.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-sm text-orange-500 font-body hover:underline cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <FloatingInput id="name"  label="Full Name"     value={form.name}    onChange={set('name')}    required />
          <FloatingInput id="email" label="Email Address" type="email" value={form.email}   onChange={set('email')}   required />

          {/* Subject select */}
          <div className="relative pt-5">
            <select
              id="subject"
              value={form.subject}
              onChange={set('subject')}
              required
              className="w-full border-b-2 border-slate-300 dark:border-slate-600 bg-transparent py-3 text-slate-900 dark:text-white font-body text-base outline-none appearance-none transition-colors duration-200 focus:border-orange-500 cursor-pointer"
            >
              <option value="" disabled />
              {subjects.map(s => (
                <option key={s} value={s} className="bg-white dark:bg-slate-800">{s}</option>
              ))}
            </select>
            <label
              htmlFor="subject"
              className={`absolute left-0 font-body text-sm transition-all duration-200 pointer-events-none ${
                form.subject ? 'top-0 text-xs text-orange-500' : 'top-8 text-slate-400'
              }`}
            >
              Subject
            </label>
          </div>

          <FloatingTextarea id="message" label="Your Message" value={form.message} onChange={set('message')} required />

          <button
            ref={btnRef}
            type="submit"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="w-full flex items-center justify-center gap-3 py-4 bg-orange-500 text-white font-heading font-bold text-lg rounded-2xl hover:bg-orange-600 hover:ring-4 hover:ring-orange-500/30 transition-all duration-200 cursor-pointer"
          >
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}
