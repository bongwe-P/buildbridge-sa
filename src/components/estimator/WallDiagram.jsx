export default function WallDiagram({ length, height }) {
  const maxW = 280
  const maxH = 160
  const scale = Math.min(maxW / Math.max(length, 1), maxH / Math.max(height, 1))
  const w = Math.max(length * scale, 20)
  const h = Math.max(height * scale, 20)
  const rows = Math.max(Math.round(height * 5), 1)
  const cols = Math.max(Math.round(length * 4), 1)

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={maxW + 50} height={maxH + 50} className="transition-all duration-300">
        <g transform={`translate(20, ${maxH - h + 20})`}>
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={c * (w / cols) + 1}
                y={r * (h / rows) + 1}
                width={w / cols - 2}
                height={h / rows - 2}
                rx="1"
                fill="#FB923C"
                opacity="0.7"
              />
            ))
          )}
          <rect x={0} y={0} width={w} height={h} fill="none" stroke="#F97316" strokeWidth="2" rx="2" />
          <line x1={0} y1={h + 8} x2={w} y2={h + 8} stroke="#64748B" strokeWidth="1" />
          <text x={w / 2} y={h + 20} textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="sans-serif">{length}m</text>
          <line x1={w + 8} y1={0} x2={w + 8} y2={h} stroke="#64748B" strokeWidth="1" />
          <text x={w + 28} y={h / 2 + 4} textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="sans-serif" transform={`rotate(-90, ${w + 28}, ${h / 2})`}>{height}m</text>
        </g>
      </svg>
      <p className="font-body text-xs text-slate-500">Live wall preview</p>
    </div>
  )
}
