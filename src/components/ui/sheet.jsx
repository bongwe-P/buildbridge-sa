// src/components/ui/sheet.jsx
import { useEffect, useRef } from 'react'

export function Sheet({ open, onOpenChange, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onOpenChange(false) }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>
  )
}

export function SheetContent({ children, className = '' }) {
  return (
    <div
      className={`absolute right-0 top-0 bottom-0 w-full sm:max-w-md flex flex-col shadow-2xl ${className}`}
      style={{ animation: 'slideInRight 0.25s ease' }}
    >
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>
    </div>
  )
}

export function SheetHeader({ children }) {
  return <div className="mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">{children}</div>
}

export function SheetTitle({ children, className = '' }) {
  return <h2 className={`font-heading font-black text-xl ${className}`}>{children}</h2>
}
