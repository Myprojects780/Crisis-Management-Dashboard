import {
  AlertTriangle,
  BadgeAlert,
  Building2,
  CircleDashed,
  Flag,
  Globe2,
  HandCoins,
  MessagesSquare,
  RadioTower,
  ShieldAlert,
  Users,
} from 'lucide-react'

// Replace this file with case-specific content later.
// Keeping labels and mock series centralized makes competition customization fast.
export const dashboardMeta = {
  brandName: 'Northstar Foods',
  crisisTitle: 'Contaminated Batch Recall and Misinformation Escalation',
  severity: 'Critical',
  statusLine: 'Response Underway - Cross-Functional War Room Active',
  lastUpdated: '02 Apr 2026 - 18:40 IST',
  crisisPhase: 'Containment',
  decisionNote:
    'Leadership should prioritize reassurance for affected customers while limiting narrative drift across media and social channels.',
  assumptionNote:
    'Mock data simulates 72 hours from initial detection through early stabilization after corrective action and official statements.',
  dataSourceNote: 'Mock monitoring feeds: social listening, support queues, media scans, regional ops reports.',
}

export const filterOptions = {
  timeRanges: ['24H', '48H', '72H', '7D'],
  regions: ['All Markets', 'North America', 'Europe', 'South Asia', 'Middle East'],
  channels: ['All Channels', 'Social', 'News', 'Support', 'Internal'],
  stakeholders: ['All Stakeholders', 'Customers', 'Employees', 'Investors', 'Regulators'],
}

export const kpis = [
  { label: 'Crisis Severity Score', value: 82, suffix: '/100', delta: '+11', trend: 'up', tone: 'red', icon: BadgeAlert },
  { label: 'Negative Sentiment', value: 64, suffix: '%', delta: '-6', trend: 'down', tone: 'amber', icon: MessagesSquare },
  { label: 'Avg Ack Time', value: 41, suffix: ' min', delta: '-12', trend: 'down', tone: 'blue', icon: RadioTower },
  { label: 'Media & Social Spike', value: 3.4, suffix: 'x', delta: '+0.8', trend: 'up', tone: 'red', icon: Globe2 },
  { label: 'Stakeholders Impacted', value: 6, suffix: '/7', delta: '+1', trend: 'up', tone: 'amber', icon: Users },
  { label: 'Resolution Progress', value: 58, suffix: '%', delta: '+14', trend: 'up', tone: 'green', icon: CircleDashed },
  { label: 'Trust Score', value: 46, suffix: '/100', delta: '+4', trend: 'up', tone: 'blue', icon: ShieldAlert },
  { label: 'Escalation Level', value: 'L4', suffix: '', delta: 'Executive', trend: 'flat', tone: 'red', icon: Flag },
]

export const timeline = [
  { time: '06:10', title: 'Issue detected', detail: 'QA flags contamination anomaly in two production lots.', tone: 'blue' },
  { time: '09:20', title: 'First viral post', detail: 'Customer video drives rapid amplification across X and Reddit.', tone: 'amber' },
  { time: '11:05', title: 'Press pickup', detail: 'Regional outlets link recall to broader safety concerns.', tone: 'red' },
  { time: '13:30', title: 'Holding statement', detail: 'Brand acknowledges issue, announces investigation and hotline.', tone: 'blue' },
  { time: '18:10', title: 'Corrective action', detail: 'Recall notice, refund process, and retail pull-through activated.', tone: 'green' },
  { time: '29:40', title: 'Recovery signals', detail: 'Negative velocity slows after FAQ rollout and spokesperson briefing.', tone: 'green' },
]

const baseSentiment = [
  { point: '0h', positive: 22, neutral: 48, negative: 30, mentions: 380 },
  { point: '6h', positive: 18, neutral: 34, negative: 48, mentions: 810 },
  { point: '12h', positive: 14, neutral: 29, negative: 57, mentions: 1420 },
  { point: '18h', positive: 13, neutral: 24, negative: 63, mentions: 1880 },
  { point: '24h', positive: 16, neutral: 27, negative: 57, mentions: 1670 },
  { point: '30h', positive: 18, neutral: 31, negative: 51, mentions: 1390 },
  { point: '36h', positive: 21, neutral: 35, negative: 44, mentions: 1180 },
  { point: '42h', positive: 23, neutral: 37, negative: 40, mentions: 990 },
  { point: '48h', positive: 24, neutral: 39, negative: 37, mentions: 870 },
  { point: '54h', positive: 26, neutral: 42, negative: 32, mentions: 740 },
  { point: '60h', positive: 28, neutral: 43, negative: 29, mentions: 630 },
  { point: '72h', positive: 31, neutral: 44, negative: 25, mentions: 520 },
]

const regionMultipliers = {
  'All Markets': 1,
  'North America': 1.15,
  Europe: 0.84,
  'South Asia': 1.08,
  'Middle East': 0.72,
}

const channelMentions = {
  'All Channels': [1, 1, 1, 1, 1, 1, 1],
  Social: [1.18, 1.12, 0.86, 0.58, 0.63, 1.23, 0.7],
  News: [0.44, 0.38, 0.52, 1.25, 0.22, 0.35, 0.18],
  Support: [0.22, 0.18, 0.12, 0.16, 1.35, 0.08, 0.32],
  Internal: [0.16, 0.1, 0.24, 0.08, 0.14, 0.05, 1.48],
}

export const getSentimentTrend = ({ timeRange = '72H', region = 'All Markets' } = {}) => {
  const limit = timeRange === '24H' ? 5 : timeRange === '48H' ? 9 : 12
  const multiplier = regionMultipliers[region] ?? 1

  return baseSentiment.slice(0, limit).map((item) => ({
    ...item,
    mentions: Math.round(item.mentions * multiplier),
  }))
}

export const getChannelBreakdown = ({ channel = 'All Channels', region = 'All Markets' } = {}) => {
  const marketFactor = regionMultipliers[region] ?? 1
  const weights = channelMentions[channel] ?? channelMentions['All Channels']
  const base = [
    { name: 'X / Twitter', value: 34, tone: 'red' },
    { name: 'Instagram', value: 11, tone: 'amber' },
    { name: 'LinkedIn', value: 7, tone: 'blue' },
    { name: 'News / Media', value: 19, tone: 'blue' },
    { name: 'Customer Support', value: 14, tone: 'amber' },
    { name: 'Reddit', value: 9, tone: 'red' },
    { name: 'Internal Chatter', value: 6, tone: 'green' },
  ]

  return base.map((item, index) => ({
    ...item,
    value: Number((item.value * weights[index] * marketFactor).toFixed(1)),
  }))
}

export const marketSpread = [
  { region: 'North America', intensity: 92, issueShare: '41%', cue: 'Retail recall and mainstream media traction', trend: '+18%' },
  { region: 'South Asia', intensity: 83, issueShare: '22%', cue: 'Viral reposting and distributor concern', trend: '+12%' },
  { region: 'Europe', intensity: 68, issueShare: '17%', cue: 'Consumer safety coverage still rising', trend: '+7%' },
  { region: 'Middle East', intensity: 49, issueShare: '11%', cue: 'Localized commentary, limited earned media', trend: '+3%' },
  { region: 'Latin America', intensity: 36, issueShare: '9%', cue: 'Watching sentiment spillover via influencers', trend: '+2%' },
]

export const stakeholderImpact = [
  { name: 'Customers', impact: 91, severity: 'Critical', summary: 'Refund demand, safety concern, trust erosion', tone: 'red', icon: Users },
  { name: 'Employees', impact: 58, severity: 'Moderate', summary: 'Store teams need scripts and escalation guidance', tone: 'amber', icon: Building2 },
  { name: 'Regulators', impact: 76, severity: 'High', summary: 'Recall and disclosure documentation under scrutiny', tone: 'red', icon: ShieldAlert },
  { name: 'Investors', impact: 63, severity: 'High', summary: 'Questions on governance, forecast exposure, and response quality', tone: 'amber', icon: HandCoins },
  { name: 'Media', impact: 72, severity: 'High', summary: 'Narrative still anchored on safety and transparency concerns', tone: 'red', icon: Globe2 },
  { name: 'Partners / Vendors', impact: 47, severity: 'Moderate', summary: 'Retail coordination improving after recall protocol', tone: 'blue', icon: RadioTower },
  { name: 'Local Communities', impact: 39, severity: 'Moderate', summary: 'Monitoring rumor spread around affected facilities', tone: 'green', icon: AlertTriangle },
]

export const issueDrivers = [
  { driver: 'Product failure', value: 92 },
  { driver: 'Misinformation', value: 74 },
  { driver: 'Data / privacy issue', value: 14 },
  { driver: 'Leadership backlash', value: 48 },
  { driver: 'Service outage', value: 21 },
  { driver: 'Supply chain issue', value: 57 },
  { driver: 'Employee misconduct', value: 11 },
  { driver: 'Ethical concern', value: 26 },
]

export const riskMatrix = [
  { name: 'Regulatory action', probability: 3, impact: 3, tone: 'red' },
  { name: 'Customer churn', probability: 3, impact: 2, tone: 'amber' },
  { name: 'Media escalation', probability: 2, impact: 3, tone: 'red' },
  { name: 'Reputational decline', probability: 3, impact: 3, tone: 'red' },
  { name: 'Boycott risk', probability: 2, impact: 2, tone: 'amber' },
  { name: 'Revenue dip', probability: 2, impact: 2, tone: 'amber' },
  { name: 'Talent dissatisfaction', probability: 1, impact: 2, tone: 'blue' },
  { name: 'Competitor exploitation', probability: 2, impact: 1, tone: 'green' },
]

export const responseTracker = [
  { action: 'Holding statement issued', owner: 'Corporate Comms', deadline: 'Complete', status: 'Done', impact: 'Narrative control initiated' },
  { action: 'Retail pull-through of affected lots', owner: 'Operations', deadline: 'Tonight 21:00', status: 'In Progress', impact: 'Consumer risk reduction' },
  { action: 'Influencer myth-busting outreach', owner: 'Social Team', deadline: '19:30', status: 'In Progress', impact: 'Limit misinformation velocity' },
  { action: 'CEO apology review and sign-off', owner: 'Executive Office', deadline: '20:15', status: 'Pending', impact: 'Restore accountability signal' },
  { action: 'Refund policy launch', owner: 'CX Lead', deadline: 'Live', status: 'Done', impact: 'Visible customer remediation' },
  { action: 'Root cause investigation update', owner: 'Quality & Legal', deadline: '22:00', status: 'At Risk', impact: 'Reduce regulatory exposure' },
  { action: 'FAQ page and store script rollout', owner: 'Customer Care', deadline: 'Complete', status: 'Done', impact: 'Consistency across support channels' },
]

export const messagingEffectiveness = [
  { metric: 'Official response reach', score: 78, benchmark: 'Broad', tone: 'blue' },
  { metric: 'Clarification acceptance', score: 54, benchmark: 'Mixed', tone: 'amber' },
  { metric: 'Misinformation reduction', score: 46, benchmark: 'Improving', tone: 'amber' },
  { metric: 'Engagement on official post', score: 81, benchmark: 'Strong', tone: 'green' },
  { metric: 'Customer reassurance level', score: 49, benchmark: 'Fragile', tone: 'red' },
]

export const scenarios = [
  {
    label: 'Best case',
    probability: 0.22,
    summary: 'Recall confidence rises, misinformation decays, sentiment stabilizes below peak within 24 hours.',
  },
  {
    label: 'Base case',
    probability: 0.56,
    summary: 'Coverage remains elevated but controllable while customer remediation and media briefings slow the decline.',
  },
  {
    label: 'Worst case',
    probability: 0.22,
    summary: 'Fresh claims or delayed executive response reignite outrage and trigger tougher regulatory attention.',
  },
]

export const watchpoints = [
  'Track whether negative share of voice stays below 30% by next briefing window.',
  'Watch for regulator commentary or leaked retailer memos that extend the story cycle.',
  'Assess whether customer support wait times rise above 55 minutes during refund surge.',
  'Confirm myth-busting content is outpacing reposts from large creator accounts.',
]

export const recommendations = [
  'Centralize all outward-facing narrative under one verified briefing cadence every 3 hours.',
  'Put customer remediation ahead of brand defense and show visible compensation mechanisms.',
  'Deploy a trained spokesperson with plain-language accountability messaging within the next hour.',
  'Pause promotional content globally until sentiment and misinformation velocity both normalize.',
  'Issue regulator-ready proof points on lot traceability, corrective action, and monitoring discipline.',
]

export const narrativeThemes = {
  headlines: [
    'Food safety response now defines brand trust trajectory',
    'Commentators split between recall praise and transparency criticism',
    'Retailers push for clearer guidance on affected inventory',
  ],
  risingKeywords: ['recall', 'contamination', 'refund', 'accountability', 'consumer safety', 'traceability', 'false rumor'],
  concernClusters: [
    'Product safety and family risk',
    'Speed of apology',
    'Retail shelf withdrawal consistency',
    'Rumor amplification on creator accounts',
  ],
  misinformationFlags: [
    'False claim that all product lines are affected',
    'Recycled video falsely linked to current lot numbers',
    'Rumor that regulators ordered a full manufacturing shutdown',
  ],
}

export const footerBadges = [
  { label: 'Active Monitoring', tone: 'blue' },
  { label: 'Mock Data', tone: 'amber' },
  { label: 'Crisis Phase: Containment', tone: 'red' },
]
