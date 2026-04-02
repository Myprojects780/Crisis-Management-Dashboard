const toneMap = {
  red: 'bg-crisis-redSoft text-crisis-red',
  amber: 'bg-crisis-amberSoft text-crisis-amber',
  green: 'bg-crisis-greenSoft text-crisis-green',
  blue: 'bg-crisis-blueSoft text-crisis-blue',
  slate: 'bg-slate-100 text-slate-700',
}

export default function StatusBadge({ label, tone = 'slate' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneMap[tone] ?? toneMap.slate}`}>
      {label}
    </span>
  )
}
