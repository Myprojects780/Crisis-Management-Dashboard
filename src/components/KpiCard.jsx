import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { Card } from './Card'
import StatusBadge from './StatusBadge'

const toneStyles = {
  red: 'from-red-50 to-white text-crisis-red',
  amber: 'from-amber-50 to-white text-crisis-amber',
  green: 'from-green-50 to-white text-crisis-green',
  blue: 'from-blue-50 to-white text-crisis-blue',
}

const deltaStyles = {
  up: { icon: ArrowUpRight, label: 'Rising', className: 'text-crisis-red' },
  down: { icon: ArrowDownRight, label: 'Improving', className: 'text-crisis-green' },
  flat: { icon: Minus, label: 'Stable', className: 'text-slate-500' },
}

export default function KpiCard({ item, spotlight = false }) {
  const Icon = item.icon
  const delta = deltaStyles[item.trend] ?? deltaStyles.flat
  const DeltaIcon = delta.icon

  return (
    <Card className={`bg-gradient-to-br ${toneStyles[item.tone] ?? toneStyles.blue} ${spotlight ? 'shadow-glow ring-1 ring-red-200' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <div className="flex items-end gap-1">
            <span className="metric-value">{item.value}</span>
            {item.suffix ? <span className="pb-1 text-sm font-semibold text-slate-500">{item.suffix}</span> : null}
          </div>
        </div>
        <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className={`flex items-center gap-1 text-sm font-semibold ${delta.className}`}>
          <DeltaIcon className="h-4 w-4" />
          <span>{item.delta}</span>
        </div>
        <StatusBadge label={delta.label} tone={item.tone === 'amber' ? 'amber' : item.tone === 'red' ? 'red' : item.tone === 'green' ? 'green' : 'blue'} />
      </div>
    </Card>
  )
}
