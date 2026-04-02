import { useMemo, useState } from 'react'
import {
  Activity,
  BellRing,
  BotMessageSquare,
  BrainCircuit,
  Clock3,
  Globe2,
  Landmark,
  MapPinned,
  Radar,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
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
  getSentimentTrend,
  hotspotAnalysis,
  kpis,
  messagingEffectiveness,
  narrativeThemes,
  negativeDrivers,
  positiveDrivers,
  recommendations,
  responseTracker,
  riskMatrix,
  scenarios,
  stakeholderImpact,
  timeline,
  watchpoints,
} from './data/crisisData'

const toneFill = {
  red: '#C56C63',
  amber: '#D7A14B',
  green: '#55B985',
  blue: '#7FA7D6',
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
        {payload.map((entry, index) => (
          <div key={`${entry.dataKey}-${index}`} className="flex items-center justify-between gap-6 text-sm">
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
    <DarkCard className="subtle-grid relative overflow-hidden border-blue-900/20 bg-[radial-gradient(circle_at_top_left,_rgba(36,74,115,0.3),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(164,85,76,0.14),_transparent_28%),linear-gradient(135deg,#081324_0%,#10233d_42%,#163254_100%)] p-6 md:p-8">
      <div className="absolute right-[-5rem] top-[-4rem] h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute left-[-3rem] top-20 h-40 w-40 rounded-full bg-red-400/10 blur-3xl" />

      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex animate-ring items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
                <Landmark className="h-4 w-4" />
                Government Strategy Dashboard
              </span>
              <StatusBadge label={`Migration Status: ${dashboardMeta.severity}`} tone="green" />
              <StatusBadge label={`Sentiment: ${dashboardMeta.currentSentiment}`} tone="blue" />
            </div>

            <div className="mt-6 space-y-4">
              <p className="eyebrow text-slate-300">{dashboardMeta.brandName}</p>
              <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                {dashboardMeta.crisisTitle}
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                Executive command view for economic positioning, migration attraction, and community sentiment management across Texas.
                Measure whether inflow quality is improving, where resistance is forming, and which interventions should move next.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:min-w-[470px] xl:max-w-[500px] xl:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow text-slate-300">Net Inflow Indicator</p>
                  <p className="mt-2 text-lg font-semibold text-white">{dashboardMeta.netInflow}</p>
                </div>
                <TrendingUp className="h-5 w-5 text-slate-300" />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow text-slate-300">Operating Mode</p>
                  <p className="mt-2 text-lg font-semibold text-white">{dashboardMeta.operatingMode}</p>
                </div>
                <Clock3 className="h-5 w-5 text-slate-300" />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow text-slate-300">Last Updated</p>
                  <p className="mt-2 text-lg font-semibold text-white">{dashboardMeta.lastUpdated}</p>
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
            label="City"
            value={filters.region}
            options={filterOptions.regions}
            onChange={(value) => setFilters((current) => ({ ...current, region: value }))}
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
        eyebrow="Migration Story"
        title="Migration & Narrative Timeline"
        description="Key business moves, policy moments, media spikes, and sentiment turns shaping how Texas is perceived by incoming migrants and existing communities."
      />
      <div className="mt-8 overflow-x-auto pb-2">
        <div className="relative flex min-w-[980px] gap-5">
          <div className="absolute left-6 right-6 top-7 h-px bg-gradient-to-r from-blue-200 via-amber-200 to-green-200" />
          {timeline.map((event, index) => (
            <div key={event.title} className="relative flex-1 animate-rise" style={{ animationDelay: `${index * 90}ms` }}>
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-white font-display text-sm font-semibold shadow-md ${
                    event.tone === 'amber'
                      ? 'bg-crisis-amberSoft text-crisis-amber'
                      : event.tone === 'green'
                        ? 'bg-crisis-greenSoft text-crisis-green'
                        : event.tone === 'red'
                          ? 'bg-crisis-redSoft text-crisis-red'
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

function SentimentPanel({ title, eyebrow, icon: Icon, description, children }) {
  return (
    <Card className="p-6">
      <SectionHeader icon={Icon} eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-6">{children}</div>
    </Card>
  )
}

function RiskHeatmap() {
  const cells = [1, 2, 3]

  return (
    <Card className="p-6">
      <SectionHeader
        icon={Radar}
        eyebrow="Strategic Risk"
        title="Risk Heatmap"
        description="Probability-impact view of the main risks that could undermine economic positioning or social cohesion if not addressed early."
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
          <p className="eyebrow">Leadership Readout</p>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-amber-100 bg-white p-4">
              <p className="text-sm font-semibold text-amber-700">Housing is the hinge issue</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                If housing mitigation lacks credibility, the economic opportunity story will increasingly be interpreted through affordability anxiety.
              </p>
            </div>
            <div className="rounded-2xl border border-red-100 bg-white p-4">
              <p className="text-sm font-semibold text-red-700">Watch social tension signals</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Anti-migrant sentiment is not dominant statewide, but it can intensify quickly in hotspot cities if local reassurance stays generic.
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4">
              <p className="text-sm font-semibold text-blue-700">Narrative coordination still matters</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                State messaging should stay consistent across policy, PR, and community outreach so the story feels managed rather than reactive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function CampaignTrackerTable() {
  return (
    <Card className="p-6">
      <SectionHeader
        icon={ShieldCheck}
        eyebrow="Execution"
        title="Campaign Execution Tracker"
        description="Live view of strategic messaging, outreach, and policy workstreams supporting attraction, reassurance, and social harmony."
      />
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
        <div className="hidden grid-cols-[2fr_1fr_1fr_1.4fr] gap-4 bg-slate-100 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:grid">
          <span>Initiative</span>
          <span>Owner</span>
          <span>Status</span>
          <span>Expected Impact</span>
        </div>
        <div className="divide-y divide-slate-200 bg-white">
          {responseTracker.map((row) => (
            <div key={row.action} className="grid grid-cols-1 gap-4 px-5 py-5 text-sm lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
              <div>
                <span className="font-semibold text-ink">{row.action}</span>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{row.deadline}</p>
              </div>
              <span className="text-slate-500">{row.owner}</span>
              <div>
                <StatusBadge
                  label={row.status}
                  tone={row.status === 'Done' ? 'green' : row.status === 'At Risk' ? 'amber' : row.status === 'Pending' ? 'amber' : 'blue'}
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
        title="Strategic Recommendations"
        description="Near-term recommendations designed to improve attraction quality, protect local confidence, and keep the Texas narrative disciplined."
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
        title="Migration Outlook"
        description="Forward-looking framing of how inflow, resident sentiment, and policy confidence could evolve over the next cycle."
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
        <p className="eyebrow">Next Watchpoints</p>
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
        eyebrow="Perception Monitor"
        title="Media and Narrative Signals"
        description="Themes shaping how Texas is discussed by migrants, residents, and the national media. Focused on reputation, resistance, and narrative discipline."
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
            <p className="text-sm font-semibold text-red-700">Misinformation to address</p>
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
    timeRange: '6M',
    region: 'Statewide',
    stakeholder: 'All Stakeholders',
  })

  const sentimentTrend = useMemo(
    () => getSentimentTrend({ timeRange: filters.timeRange, region: filters.region }),
    [filters.timeRange, filters.region],
  )

  const visibleStakeholders = useMemo(() => {
    if (filters.stakeholder === 'All Stakeholders') return stakeholderImpact
    return stakeholderImpact.filter((item) => item.name === filters.stakeholder)
  }, [filters.stakeholder])

  const driverMix = useMemo(
    () => [...positiveDrivers.map((item) => ({ ...item, group: 'Positive drivers' })), ...negativeDrivers.map((item) => ({ ...item, group: 'Resistance drivers' }))],
    [],
  )

  return (
    <div className="theme-dark mx-auto max-w-[1700px] px-4 py-6 md:px-6 lg:px-8 lg:py-8">
      <div className="space-y-6">
        <Header filters={filters} setFilters={setFilters} />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
          {kpis.map((item, index) => (
            <KpiCard key={item.label} item={item} spotlight={index === 0 || index === 5} />
          ))}
        </section>

        <TimelineSection />

        <section className="grid gap-6 xl:grid-cols-2">
          <SentimentPanel
            icon={Users}
            eyebrow="Sentiment Analysis"
            title="Local Sentiment"
            description="Tracks whether Texans see migration as opportunity, pressure, or cultural disruption. Housing and community concerns are the key watchpoints."
          >
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="h-[330px] rounded-3xl bg-slate-50 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sentimentTrend}>
                    <defs>
                      <linearGradient id="localAcceptFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1F7A4E" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#1F7A4E" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" />
                    <XAxis dataKey="point" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="localAcceptance" name="Acceptance" stroke="#1F7A4E" fill="url(#localAcceptFill)" strokeWidth={3} />
                    <Line type="monotone" dataKey="localResistance" name="Resistance" stroke="#B7791F" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[330px] rounded-3xl bg-slate-50 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={sentimentTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" />
                    <XAxis dataKey="point" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="housingConcern" name="Housing concern" fill="#B7791F" radius={[8, 8, 0, 0]} />
                    <Line type="monotone" dataKey="cultureConcern" name="Culture concern" stroke="#A4554C" strokeWidth={2.5} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </SentimentPanel>

          <SentimentPanel
            icon={Globe2}
            eyebrow="Sentiment Analysis"
            title="Migrant Sentiment"
            description="Measures whether incoming businesses and high-net-worth individuals still see Texas as attractive, predictable, and welcoming."
          >
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="h-[330px] rounded-3xl bg-slate-50 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sentimentTrend}>
                    <defs>
                      <linearGradient id="migrantFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#244A73" stopOpacity={0.24} />
                        <stop offset="95%" stopColor="#244A73" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" />
                    <XAxis dataKey="point" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="migrantOptimism" name="Optimism" stroke="#244A73" fill="url(#migrantFill)" strokeWidth={3} />
                    <Line type="monotone" dataKey="migrantConcern" name="Concern" stroke="#B7791F" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-ink">What is shaping migrant confidence?</p>
                <div className="mt-5 h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Tax climate', value: 34, tone: 'green' },
                          { name: 'Business environment', value: 28, tone: 'blue' },
                          { name: 'Cost of living', value: 21, tone: 'green' },
                          { name: 'Community reception', value: 17, tone: 'amber' },
                        ]}
                        dataKey="value"
                        innerRadius={52}
                        outerRadius={86}
                        paddingAngle={4}
                        stroke="none"
                      >
                        {[{ tone: 'green' }, { tone: 'blue' }, { tone: 'green' }, { tone: 'amber' }].map((entry, index) => (
                          <Cell key={index} fill={toneFill[entry.tone]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 grid gap-3">
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">Incoming audiences still rank tax certainty and operating flexibility highest.</div>
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">Community reception is the soft spot that can erode conversion quality if left unmanaged.</div>
                </div>
              </div>
            </div>
          </SentimentPanel>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <SectionHeader
              icon={MapPinned}
              eyebrow="Hotspot Analysis"
              title="City Inflow, Resistance, and Housing Stress"
              description="Where the inflow is strongest, where resistance is forming, and which cities are under the most visible housing pressure."
            />
            <div className="mt-6 space-y-4">
              {hotspotAnalysis.map((market) => (
                <div key={market.city} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-display text-lg font-semibold text-ink">{market.city}</p>
                        <StatusBadge label={market.narrative} tone={market.tone === 'green' ? 'green' : 'amber'} />
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-500">Housing stress {market.housingStress}/100</p>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div>
                      <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                        <span>Inflow</span>
                        <span>{market.inflow}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full bg-crisis-blue" style={{ width: `${market.inflow}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                        <span>Resistance</span>
                        <span>{market.resistance}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full bg-crisis-amber" style={{ width: `${market.resistance}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                        <span>Housing stress</span>
                        <span>{market.housingStress}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full bg-crisis-red" style={{ width: `${market.housingStress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader
              icon={Users}
              eyebrow="Stakeholder Lens"
              title="Stakeholder Panel"
              description="How each major audience is reacting, where sentiment stands now, and which groups require reassurance or activation."
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
                            <StatusBadge label={`Sentiment: ${item.sentiment}`} tone={item.tone} />
                            <StatusBadge label={`Risk: ${item.severity}`} tone={item.severity === 'Low' ? 'green' : item.severity === 'Moderate' ? 'amber' : 'red'} />
                          </div>
                          <p className="mt-2 text-sm text-slate-500">{item.summary}</p>
                        </div>
                      </div>
                      <div className="min-w-[180px]">
                        <div className="flex items-center justify-between text-sm font-semibold">
                          <span className="text-slate-500">Priority score</span>
                          <span className="text-ink">{item.impact}%</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              item.impact > 75 ? 'bg-crisis-blue' : item.impact > 60 ? 'bg-crisis-green' : item.impact > 45 ? 'bg-crisis-amber' : 'bg-crisis-red'
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
              icon={Activity}
              eyebrow="Motivation and Resistance"
              title="Drivers of Migration & Resistance"
              description="Positive pull factors bringing businesses and individuals in, alongside the core reasons local concern can harden."
            />
            <div className="mt-6 grid gap-5">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-ink">Positive drivers</p>
                <div className="mt-4 h-[170px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={positiveDrivers} layout="vertical" margin={{ left: 8, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" horizontal={false} />
                      <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                      <YAxis dataKey="driver" type="category" width={110} tickLine={false} axisLine={false} tick={{ fill: '#334155', fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[10, 10, 10, 10]} fill="#1F7A4E" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-ink">Negative drivers</p>
                <div className="mt-4 h-[170px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={negativeDrivers} layout="vertical" margin={{ left: 8, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" horizontal={false} />
                      <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                      <YAxis dataKey="driver" type="category" width={130} tickLine={false} axisLine={false} tick={{ fill: '#334155', fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[10, 10, 10, 10]} fill="#B7791F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-ink">Driver balance snapshot</p>
                <div className="mt-4 h-[170px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={driverMix}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" />
                      <XAxis dataKey="driver" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={58} />
                      <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {driverMix.map((entry) => (
                          <Cell key={`${entry.group}-${entry.driver}`} fill={entry.group === 'Positive drivers' ? '#244A73' : '#A4554C'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Card>

          <RiskHeatmap />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <CampaignTrackerTable />

          <Card className="p-6">
            <SectionHeader
              icon={Globe2}
              eyebrow="Message Performance"
              title="Messaging Effectiveness"
              description="Tracks campaign engagement, narrative reach, and whether official storytelling is shifting sentiment in the intended direction."
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
            description="Compact notes for presentation use, making the operating assumption, strategic lens, and data source logic explicit."
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
