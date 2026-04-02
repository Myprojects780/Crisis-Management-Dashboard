const toneMap = {
  red: 'bg-crisis-redSoft text-crisis-red border border-red-400/15',
  amber: 'bg-crisis-amberSoft text-crisis-amber border border-amber-300/15',
  green: 'bg-crisis-greenSoft text-crisis-green border border-green-300/15',
  blue: 'bg-crisis-blueSoft text-crisis-blue border border-blue-300/15',
  slate: 'bg-slate-100 text-slate-300 border border-white/10',
}

export default function StatusBadge({ label, tone = 'slate' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneMap[tone] ?? toneMap.slate}`}>
      {label}
    </span>
  )
}
