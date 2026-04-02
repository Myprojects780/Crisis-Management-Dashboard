export default function FilterPill({ label, value, options, onChange }) {
  return (
    <label className="flex min-w-[170px] flex-col gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent text-sm font-semibold text-white outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-950 text-white">
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
