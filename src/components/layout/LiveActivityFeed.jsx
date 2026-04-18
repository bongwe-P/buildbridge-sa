import { useState, useEffect } from 'react'

const messages = [
  "Sipho in Khayelitsha just saved R1,240 on facebrick",
  "3 pallets of cement listed in Bellville, 2 hours ago",
  "Thabo in Mitchells Plain completed an order of timber",
  "New roofing sheets available in Maitland at R180 per sheet",
  "Sarah listed 8,500 surplus bricks from Brackenfell site",
  "Zanele used the Smart Estimator to plan her boundary wall",
]

export default function LiveActivityFeed() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % messages.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`fixed bottom-6 right-6 z-40 max-w-xs bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    }`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-green-600 font-body">Live Activity</span>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-200 font-body leading-snug">{messages[index]}</p>
    </div>
  )
}
