import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { Card } from './Card'
import StatusBadge from './StatusBadge'

const toneStyles = {
  red: 'from-[#231416] to-[#101a2a] text-crisis-red',
  amber: 'from-[#241b11] to-[#101a2a] text-crisis-amber',
  green: 'from-[#11241b] to-[#101a2a] text-crisis-green',
  blue: 'from-[#142032] to-[#101a2a] text-crisis-blue',
}

const iconTone = {
  blue: 'text-crisis-blue',
  green: 'text-crisis-green',
  amber: 'text-crisis-amber',
  red: 'text-crisis-red',
}

const deltaIconByTrend = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
}

export default function KpiCard({ item, spotlight = false }) {
  const Icon = item.icon
  const DeltaIcon = deltaIconByTrend[item.trend] ?? deltaIconByTrend.flat
  const deltaTone = item.deltaTone ?? (item.trend === 'down' ? 'green' : item.trend === 'flat' ? 'slate' : 'blue')

  return (
    <Card className={`bg-gradient-to-br ${toneStyles[item.tone] ?? toneStyles.blue} ${spotlight ? 'shadow-glow ring-1 ring-red-300/20' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <div className="flex items-end gap-1">
            <span className="metric-value">{item.value}</span>
            {item.suffix ? <span className="pb-1 text-sm font-semibold text-slate-500">{item.suffix}</span> : null}
          </div>
        </div>
        <div className={`rounded-2xl bg-white/80 p-3 shadow-sm ${iconTone[item.tone] ?? iconTone.blue}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className={`flex items-center gap-1 text-sm font-semibold ${iconTone[deltaTone] ?? 'text-slate-500'}`}>
          <DeltaIcon className="h-4 w-4" />
          <span>{item.delta}</span>
        </div>
        <StatusBadge label={item.deltaLabel ?? 'Tracking'} tone={deltaTone === 'slate' ? 'blue' : deltaTone} />
      </div>
    </Card>
  )
}
