import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-heading font-black text-2xl mb-3">
            Build<span className="text-orange-500">Bridge</span> SA
          </h3>
          <p className="text-slate-400 font-body text-sm leading-relaxed">
            Connecting construction surplus with community builders across South Africa.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-500 mb-4">Navigate</h4>
          <div className="flex flex-col gap-2">
            {[['/', 'Home'], ['/shop', 'Shop'], ['/estimator', 'Smart Estimator']].map(([to, label]) => (
              <Link key={to} to={to} className="text-slate-400 hover:text-orange-500 transition-colors duration-200 text-sm font-body cursor-pointer">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-500 mb-4">Impact</h4>
          <p className="text-3xl font-heading font-black text-orange-500">2,400+</p>
          <p className="text-slate-400 text-sm font-body">Tonnes diverted from landfill</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-600 text-xs font-body">
        © 2026 BuildBridge SA. Built for INF3014F.
      </div>
    </footer>
  )
}
