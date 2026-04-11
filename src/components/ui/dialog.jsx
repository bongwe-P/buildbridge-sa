// src/components/ui/dialog.jsx
import { useEffect } from 'react'

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onOpenChange(false) }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>
  )
}

export function DialogContent({ children, className = '' }) {
  return (
    <div
      className={`relative z-10 w-full max-w-sm p-8 shadow-2xl ${className}`}
      style={{ animation: 'scaleIn 0.2s ease' }}
    >
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      {children}
    </div>
  )
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children, className = '' }) {
  return <h2 className={`font-heading font-black text-2xl ${className}`}>{children}</h2>
}
