import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const contacts = [
  { icon: Mail,   label: 'Email',    value: 'hello@buildbridgesa.co.za' },
  { icon: Phone,  label: 'WhatsApp', value: '+27 21 000 0000' },
  { icon: MapPin, label: 'Location', value: 'Cape Town, Western Cape, South Africa' },
]

export default function ContactInfo() {
  return (
    <div className="relative bg-slate-900 p-8 md:p-12 overflow-hidden">
      {/* Orange gradient blob */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-10 pointer-events-none" />

      <p className="font-body text-orange-500 text-xs uppercase tracking-widest font-semibold mb-8">Reach Us</p>

      <div className="space-y-4 mb-10">
        {contacts.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-body text-xs text-slate-500 uppercase tracking-wide mb-0.5">{label}</p>
              <p className="font-body text-white text-sm font-medium">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <p className="font-body text-xs text-slate-500 uppercase tracking-wide mb-1">Office Hours</p>
          <p className="font-body text-white text-sm">Mon – Fri: 08:00 – 17:00 SAST</p>
          <p className="font-body text-slate-400 text-xs mt-0.5">We respond within 24 hours</p>
        </div>
      </div>
    </div>
  )
}
