import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BellRing,
  BotMessageSquare,
  BrainCircuit,
  Clock3,
  Globe2,
  MapPinned,
  Radar,
  ShieldCheck,
  Siren,
  Users,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, DarkCard } from './components/Card'
import FilterPill from './components/FilterPill'
import KpiCard from './components/KpiCard'
import SectionHeader from './components/SectionHeader'
import StatusBadge from './components/StatusBadge'
import {
  dashboardMeta,
  filterOptions,
  footerBadges,
  getChannelBreakdown,
  getSentimentTrend,
  issueDrivers,
  kpis,
  marketSpread,
  messagingEffectiveness,
  narrativeThemes,
  recommendations,
  responseTracker,
  riskMatrix,
  scenarios,
  stakeholderImpact,
  timeline,
  watchpoints,
} from './data/crisisData'

const toneFill = {
  red: '#C62828',
  amber: '#D97706',
  green: '#15803D',
  blue: '#2563EB',
}

const riskCellStyles = {
  1: 'bg-green-50 text-green-800',
  2: 'bg-amber-50 text-amber-800',
  3: 'bg-red-50 text-red-800',
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <div className="mt-2 space-y-2">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-6 text-sm">
            <span className="font-medium text-slate-500">{entry.name}</span>
            <span className="font-semibold text-slate-900">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Header({ filters, setFilters }) {
  return (
    <DarkCard className="subtle-grid relative overflow-hidden border-red-500/20 bg-[radial-gradient(circle_at_top,_rgba(198,40,40,0.18),_transparent_34%),linear-gradient(135deg,#08111f_0%,#0f172a_35%,#101b31_100%)] p-6 md:p-8">
      <div className="absolute right-[-5rem] top-[-4rem] h-48 w-48 rounded-full bg-red-500/15 blur-3xl" />
      <div className="absolute left-[-3rem] top-24 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex animate-ring items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-200">
                <Siren className="h-4 w-4" />
                War Room Dashboard
              </span>
              <StatusBadge label={dashboardMeta.severity} tone="red" />
              <StatusBadge label={dashboardMeta.statusLine} tone="blue" />
            </div>

            <div className="mt-6 space-y-4">
              <p className="eyebrow text-slate-300">{dashboardMeta.brandName}</p>
              <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                {dashboardMeta.crisisTitle}
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                Live command view for leadership, communications, operations, and risk teams. Monitor escalation, coordinate response,
                and prioritize the next actions that most reduce brand damage.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:min-w-[420px] xl:max-w-[460px] xl:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow text-slate-300">Last Updated</p>
                  <p className="mt-2 text-lg font-semibold text-white">{dashboardMeta.lastUpdated}</p>
                </div>
                <Clock3 className="h-5 w-5 text-slate-300" />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow text-slate-300">Crisis Phase</p>
                  <p className="mt-2 text-lg font-semibold text-white">{dashboardMeta.crisisPhase}</p>
                </div>
                <ShieldCheck className="h-5 w-5 text-slate-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <FilterPill
            label="Time Range"
            value={filters.timeRange}
            options={filterOptions.timeRanges}
            onChange={(value) => setFilters((current) => ({ ...current, timeRange: value }))}
          />
          <FilterPill
            label="Region"
            value={filters.region}
            options={filterOptions.regions}
            onChange={(value) => setFilters((current) => ({ ...current, region: value }))}
          />
          <FilterPill
            label="Channel"
            value={filters.channel}
            options={filterOptions.channels}
            onChange={(value) => setFilters((current) => ({ ...current, channel: value }))}
          />
          <FilterPill
            label="Stakeholder"
            value={filters.stakeholder}
            options={filterOptions.stakeholders}
            onChange={(value) => setFilters((current) => ({ ...current, stakeholder: value }))}
          />
        </div>
      </div>
    </DarkCard>
  )
}

function TimelineSection() {
  return (
    <Card className="p-6">
      <SectionHeader
        icon={Clock3}
        eyebrow="Crisis Sequence"
        title="Timeline of Escalation and Intervention"
        description="Key milestones from detection through recovery signaling. Ordered to help the team quickly anchor the narrative and assess where intervention changed momentum."
      />
      <div className="mt-8 overflow-x-auto pb-2">
        <div className="relative flex min-w-[980px] gap-5">
          <div className="absolute left-6 right-6 top-7 h-px bg-gradient-to-r from-red-200 via-amber-200 to-green-200" />
          {timeline.map((event, index) => (
            <div key={event.title} className="relative flex-1 animate-rise" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-white font-display text-sm font-semibold shadow-md ${
                    event.tone === 'red'
                      ? 'bg-crisis-redSoft text-crisis-red'
                      : event.tone === 'amber'
                        ? 'bg-crisis-amberSoft text-crisis-amber'
                        : event.tone === 'green'
                          ? 'bg-crisis-greenSoft text-crisis-green'
                          : 'bg-crisis-blueSoft text-crisis-blue'
                  }`}
                >
                  {event.time}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-transform duration-300 hover:-translate-y-1">
                <p className="font-semibold text-ink">{event.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{event.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function RiskHeatmap() {
  const cells = [1, 2, 3]

  return (
    <Card className="p-6">
      <SectionHeader
        icon={Radar}
        eyebrow="Decision Tool"
        title="Risk Heatmap"
        description="Probability-impact view for the next executive discussion. High-probability, high-impact risks stay clustered in the upper-right to guide focus."
      />
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-3">
          {cells
            .slice()
            .reverse()
            .map((impact) =>
              cells.map((probability) => {
                const items = riskMatrix.filter((risk) => risk.probability === probability && risk.impact === impact)
                const maxTone = items.some((item) => item.tone === 'red') ? 3 : items.some((item) => item.tone === 'amber') ? 2 : 1

                return (
                  <div key={`${probability}-${impact}`} className={`min-h-[155px] rounded-3xl p-4 ${riskCellStyles[maxTone]}`}>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em]">
                      <span>P{probability}</span>
                      <span>I{impact}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {items.length ? (
                        items.map((item) => (
                          <div key={item.name} className="rounded-2xl bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm">
                            {item.name}
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-dashed border-current/30 px-3 py-5 text-center text-sm opacity-60">
                          No material risk flagged
                        </div>
                      )}
                    </div>
                  </div>
                )
              }),
            )}
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="eyebrow">Executive Readout</p>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-red-100 bg-white p-4">
              <p className="text-sm font-semibold text-red-700">Immediate red-zone concentration</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Reputational decline and regulatory action remain jointly severe, which means slow evidence-sharing now creates outsized downside.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white p-4">
              <p className="text-sm font-semibold text-amber-700">Watch the mid-grid spillover</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Boycott risk and customer churn are not peak-impact risks yet, but they grow fast if the apology or remediation looks insufficient.
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4">
              <p className="text-sm font-semibold text-blue-700">Lower-tier risks still matter</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Competitor exploitation and internal dissatisfaction are secondary, but they can compound if the crisis remains unresolved past 72 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function ResponseTrackerTable() {
  return (
    <Card className="p-6">
      <SectionHeader
        icon={ShieldCheck}
        eyebrow="Control Center"
        title="Response Tracker"
        description="Operational checklist of actions underway, who owns them, and the expected impact on crisis containment and trust recovery."
      />
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1.4fr] gap-4 bg-slate-100 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:grid">
          <span>Action</span>
          <span>Owner</span>
          <span>Deadline</span>
          <span>Status</span>
          <span>Impact Expected</span>
        </div>
        <div className="divide-y divide-slate-200 bg-white">
          {responseTracker.map((row) => (
            <div key={row.action} className="grid grid-cols-1 gap-4 px-5 py-5 text-sm lg:grid-cols-[2fr_1fr_1fr_1fr_1.4fr]">
              <span className="font-semibold text-ink">{row.action}</span>
              <span className="text-slate-500">{row.owner}</span>
              <span className="text-slate-500">{row.deadline}</span>
              <div>
                <StatusBadge
                  label={row.status}
                  tone={row.status === 'Done' ? 'green' : row.status === 'At Risk' ? 'red' : row.status === 'Pending' ? 'amber' : 'blue'}
                />
              </div>
              <span className="text-slate-500">{row.impact}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function RecommendationPanel() {
  return (
    <Card className="p-6">
      <SectionHeader
        icon={BrainCircuit}
        eyebrow="Leadership Priorities"
        title="Immediate Recommendations"
        description="Strategy-led actions designed to stabilize trust, reduce narrative fragmentation, and demonstrate visible control."
      />
      <div className="mt-6 grid gap-4">
        {recommendations.map((item, index) => (
          <div key={item} className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 font-display text-sm font-semibold text-white">
              0{index + 1}
            </div>
            <p className="text-sm leading-7 text-slate-600">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function ScenarioPanel() {
  return (
    <Card className="p-6">
      <SectionHeader
        icon={BellRing}
        eyebrow="Forward View"
        title="Scenario Outlook"
        description="Forward-looking risk framing for the next 24 to 72 hours, including likely path and trigger watchpoints that would require escalation."
      />
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {scenarios.map((scenario) => (
          <div key={scenario.label} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-lg font-semibold text-ink">{scenario.label}</p>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                {Math.round(scenario.probability * 100)}%
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-slate-900" style={{ width: `${scenario.probability * 100}%` }} />
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-500">{scenario.summary}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-slate-50 p-5">
        <p className="eyebrow">Next 72h Watchpoints</p>
        <div className="mt-4 grid gap-3">
          {watchpoints.map((point) => (
            <div key={point} className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              {point}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function NarrativeMonitor() {
  return (
    <Card className="p-6">
      <SectionHeader
        icon={BotMessageSquare}
        eyebrow="Narrative Monitor"
        title="Media and Public Concern Signals"
        description="Thematic scan of how the crisis is being framed publicly, what keywords are accelerating, and which false narratives need active suppression."
      />
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-ink">Top narrative themes</p>
            <div className="mt-4 space-y-3">
              {narrativeThemes.headlines.map((headline) => (
                <div key={headline} className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                  {headline}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-red-50 p-5">
            <p className="text-sm font-semibold text-red-700">Misinformation flags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {narrativeThemes.misinformationFlags.map((flag) => (
                <span key={flag} className="rounded-full border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-700">
                  {flag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-ink">Rising keywords</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {narrativeThemes.risingKeywords.map((word, index) => (
                <span
                  key={word}
                  className="rounded-full bg-white px-4 py-2 font-display text-sm font-medium text-slate-700 shadow-sm"
                  style={{ fontSize: `${0.86 + index * 0.05}rem` }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-ink">Concern clusters</p>
            <div className="mt-4 grid gap-3">
              {narrativeThemes.concernClusters.map((cluster) => (
                <div key={cluster} className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                  {cluster}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function App() {
  const [filters, setFilters] = useState({
    timeRange: '72H',
    region: 'All Markets',
    channel: 'All Channels',
    stakeholder: 'All Stakeholders',
  })

  const sentimentTrend = useMemo(
    () => getSentimentTrend({ timeRange: filters.timeRange, region: filters.region }),
    [filters.timeRange, filters.region],
  )
  const channelBreakdown = useMemo(
    () => getChannelBreakdown({ channel: filters.channel, region: filters.region }),
    [filters.channel, filters.region],
  )
  const visibleStakeholders = useMemo(() => {
    if (filters.stakeholder === 'All Stakeholders') return stakeholderImpact
    return stakeholderImpact.filter((item) => item.name.includes(filters.stakeholder))
  }, [filters.stakeholder])

  return (
    <div className="mx-auto max-w-[1700px] px-4 py-6 md:px-6 lg:px-8 lg:py-8">
      <div className="space-y-6">
        <Header filters={filters} setFilters={setFilters} />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
          {kpis.map((item, index) => (
            <KpiCard key={item.label} item={item} spotlight={index === 0 || index === 3} />
          ))}
        </section>

        <TimelineSection />

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6">
            <SectionHeader
              icon={Activity}
              eyebrow="Monitoring"
              title="Sentiment and Mention Velocity"
              description="Trend lines show the crisis story: early spike, severe peak, official intervention, and the beginning of stabilization."
            />
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="h-[340px] rounded-3xl bg-slate-50 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sentimentTrend}>
                    <defs>
                      <linearGradient id="negFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C62828" stopOpacity={0.34} />
                        <stop offset="95%" stopColor="#C62828" stopOpacity={0.04} />
                      </linearGradient>
                      <linearGradient id="neuFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D97706" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#D97706" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" />
                    <XAxis dataKey="point" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="negative" name="Negative %" stroke="#C62828" fill="url(#negFill)" strokeWidth={3} />
                    <Area type="monotone" dataKey="neutral" name="Neutral %" stroke="#D97706" fill="url(#neuFill)" strokeWidth={2} />
                    <Line type="monotone" dataKey="positive" name="Positive %" stroke="#15803D" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[340px] rounded-3xl bg-slate-50 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" />
                    <XAxis dataKey="point" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="mentions" name="Mentions" stroke="#2563EB" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader
              icon={BarChart3}
              eyebrow="Spread"
              title="Channel Breakdown"
              description="Which channels are carrying the story right now, and how that mix shifts as the crisis moves from social flashpoint to broader institutional attention."
            />
            <div className="mt-6 grid gap-5">
              <div className="h-[220px] rounded-3xl bg-slate-50 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelBreakdown} layout="vertical" margin={{ left: 14, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" horizontal={false} />
                    <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fill: '#334155', fontSize: 12 }} width={95} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                      {channelBreakdown.map((entry) => (
                        <Cell key={entry.name} fill={toneFill[entry.tone]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                <div className="h-[220px] rounded-3xl bg-slate-50 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={channelBreakdown} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3} stroke="none">
                        {channelBreakdown.map((entry) => (
                          <Cell key={entry.name} fill={toneFill[entry.tone]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid gap-3">
                  {channelBreakdown.slice(0, 4).map((item) => (
                    <div key={item.name} className="rounded-2xl bg-slate-50 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-ink">{item.name}</p>
                        <p className="text-sm font-semibold" style={{ color: toneFill[item.tone] }}>
                          {item.value}%
                        </p>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(item.value, 100)}%`, backgroundColor: toneFill[item.tone] }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <SectionHeader
              icon={MapPinned}
              eyebrow="Market Exposure"
              title="Geographic and Market Spread"
              description="A market-priority substitute for a map. Highlights where the issue is strongest, what share of the story sits there, and what narrative cue is driving attention."
            />
            <div className="mt-6 space-y-4">
              {marketSpread.map((market) => (
                <div key={market.region} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-display text-lg font-semibold text-ink">{market.region}</p>
                        <StatusBadge label={market.issueShare} tone={market.intensity > 80 ? 'red' : market.intensity > 55 ? 'amber' : 'blue'} />
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{market.cue}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-500">{market.trend} growth in issue velocity</p>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
                    <div
                      className={`h-full rounded-full ${
                        market.intensity > 80 ? 'bg-crisis-red' : market.intensity > 55 ? 'bg-crisis-amber' : 'bg-crisis-blue'
                      }`}
                      style={{ width: `${market.intensity}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader
              icon={Users}
              eyebrow="Affected Groups"
              title="Stakeholder Impact Panel"
              description="Impact tracker across the people and institutions most likely to alter the trajectory of this crisis."
            />
            <div className="mt-6 space-y-4">
              {visibleStakeholders.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="font-semibold text-ink">{item.name}</p>
                            <StatusBadge
                              label={item.severity}
                              tone={item.tone === 'red' ? 'red' : item.tone === 'amber' ? 'amber' : item.tone === 'blue' ? 'blue' : 'green'}
                            />
                          </div>
                          <p className="mt-2 text-sm text-slate-500">{item.summary}</p>
                        </div>
                      </div>
                      <div className="min-w-[180px]">
                        <div className="flex items-center justify-between text-sm font-semibold">
                          <span className="text-slate-500">Impact level</span>
                          <span className="text-ink">{item.impact}%</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              item.impact > 75 ? 'bg-crisis-red' : item.impact > 55 ? 'bg-crisis-amber' : item.impact > 40 ? 'bg-crisis-blue' : 'bg-crisis-green'
                            }`}
                            style={{ width: `${item.impact}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="p-6">
            <SectionHeader
              icon={AlertTriangle}
              eyebrow="Root Cause Snapshot"
              title="Issue Drivers"
              description="How the crisis is being interpreted internally and externally. This separates the primary operational failure from the narrative accelerants."
            />
            <div className="mt-6 h-[360px] rounded-3xl bg-slate-50 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issueDrivers} layout="vertical" margin={{ left: 8, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis dataKey="driver" type="category" width={120} tickLine={false} axisLine={false} tick={{ fill: '#334155', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]} fill="#0F172A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <RiskHeatmap />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <ResponseTrackerTable />

          <Card className="p-6">
            <SectionHeader
              icon={Globe2}
              eyebrow="Message Performance"
              title="Messaging Effectiveness"
              description="Illustrative scorecards to judge whether the official narrative is landing, being believed, and reducing confusion."
            />
            <div className="mt-6 space-y-4">
              {messagingEffectiveness.map((metric) => (
                <div key={metric.metric} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-ink">{metric.metric}</p>
                      <p className="mt-1 text-sm text-slate-500">{metric.benchmark}</p>
                    </div>
                    <p className="font-display text-2xl font-semibold text-ink">{metric.score}</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className={`h-full rounded-full ${
                        metric.tone === 'red' ? 'bg-crisis-red' : metric.tone === 'amber' ? 'bg-crisis-amber' : metric.tone === 'green' ? 'bg-crisis-green' : 'bg-crisis-blue'
                      }`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <ScenarioPanel />
          <RecommendationPanel />
        </section>

        <NarrativeMonitor />

        <Card className="p-6">
          <SectionHeader
            icon={ShieldCheck}
            eyebrow="Command Notes"
            title="Decision Footer"
            description="Compact notes for presentation use, making assumptions and current phase explicit."
          />
          <div className="mt-6 grid gap-5 xl:grid-cols-4">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="eyebrow">Decision Note</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{dashboardMeta.decisionNote}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="eyebrow">Assumption Note</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{dashboardMeta.assumptionNote}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="eyebrow">Data Source Note</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{dashboardMeta.dataSourceNote}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="eyebrow">Status Tags</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {footerBadges.map((badge) => (
                  <StatusBadge key={badge.label} label={badge.label} tone={badge.tone} />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
