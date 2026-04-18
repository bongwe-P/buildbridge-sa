// src/components/landing/SupplierCTA.jsx
export default function SupplierCTA() {
  return (
    <section className="py-24 px-6 bg-slate-900 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full font-body mb-6 uppercase tracking-widest">
          For Contractors
        </span>
        <h2 className="font-heading font-black text-5xl text-white leading-tight mb-6">
          Got surplus materials sitting on site?
        </h2>
        <p className="font-body text-slate-400 text-lg mb-10 leading-relaxed">
          List them on BuildBridge SA for free. Avoid dump fees, earn ESG compliance points, and directly support township communities in the Western Cape.
        </p>
        <button
          onClick={() => alert('Supplier onboarding coming soon! Contact us at suppliers@buildbridgesa.co.za')}
          className="px-10 py-5 bg-orange-500 text-white font-heading font-bold text-xl rounded-2xl hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
        >
          List Your Surplus for Free
        </button>
      </div>
    </section>
  )
}
