import { useCustomCursor } from '../../hooks/useCustomCursor'

export default function CustomCursor() {
  const { dotRef, ringRef } = useCustomCursor()
  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-orange-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-none"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-orange-500/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
      />
    </>
  )
}
