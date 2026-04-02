import {
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  Globe2,
  Handshake,
  Landmark,
  MessageSquareMore,
  Newspaper,
  TrendingUp,
  Users,
} from 'lucide-react'

// Centralized mock data so teams can quickly adapt this dashboard to a specific case.
// Swap labels, scores, and narrative details here without restructuring the UI.
export const dashboardMeta = {
  brandName: 'State of Texas',
  crisisTitle: 'Texas Migration & Economic Command Center',
  severity: 'Growing',
  statusLine: 'Statewide recruitment and sentiment stewardship active',
  currentSentiment: 'Cautiously Positive',
  netInflow: '+18.4K monthly inflow',
  lastUpdated: '02 Apr 2026 - 18:40 IST',
  operatingMode: 'Economic Positioning and Social Harmony',
  decisionNote:
    'Leadership should sustain the Texas Advantage narrative while pairing it with visible local reassurance on affordability, infrastructure, and community identity.',
  assumptionNote:
    'Mock data models a 6-month period of elevated inbound migration from California, including business relocations, HNI interest, and localized resident pushback.',
  dataSourceNote:
    'Mock inputs: relocation inquiries, media monitoring, community sentiment panels, city-level housing pressure estimates, campaign analytics.',
}

export const filterOptions = {
  timeRanges: ['1M', '3M', '6M', '12M'],
  regions: ['Statewide', 'Austin', 'Dallas', 'Houston', 'San Antonio'],
  stakeholders: ['All Stakeholders', 'Local residents', 'Migrating businesses', 'HNIs', 'State government', 'Media', 'Real estate sector'],
}

export const kpis = [
  {
    label: 'Net Migration',
    value: 18.4,
    suffix: 'K',
    delta: '+12% vs last month',
    deltaLabel: 'Accelerating',
    trend: 'up',
    deltaTone: 'green',
    tone: 'blue',
    icon: TrendingUp,
  },
  {
    label: 'Business Relocations',
    value: 46,
    suffix: '',
    delta: '+8 this month',
    deltaLabel: 'On Target',
    trend: 'up',
    deltaTone: 'green',
    tone: 'green',
    icon: BriefcaseBusiness,
  },
  {
    label: 'HNI Inflow Index',
    value: 73,
    suffix: '/100',
    delta: '+5 points',
    deltaLabel: 'Strengthening',
    trend: 'up',
    deltaTone: 'green',
    tone: 'blue',
    icon: BadgeDollarSign,
  },
  {
    label: 'Cost Advantage vs California',
    value: 29,
    suffix: '%',
    delta: 'Stable gap',
    deltaLabel: 'Competitive',
    trend: 'flat',
    deltaTone: 'blue',
    tone: 'green',
    icon: CircleDollarSign,
  },
  {
    label: 'Sentiment Score',
    value: 58,
    suffix: '/100',
    delta: '-3 local softness',
    deltaLabel: 'Needs Watch',
    trend: 'down',
    deltaTone: 'amber',
    tone: 'amber',
    icon: MessageSquareMore,
  },
  {
    label: 'Brand Perception Score',
    value: 76,
    suffix: '/100',
    delta: '+4 points',
    deltaLabel: 'Improving',
    trend: 'up',
    deltaTone: 'green',
    tone: 'blue',
    icon: Globe2,
  },
  {
    label: 'Housing Pressure Index',
    value: 67,
    suffix: '/100',
    delta: '+6 in Austin',
    deltaLabel: 'Monitor',
    trend: 'up',
    deltaTone: 'amber',
    tone: 'amber',
    icon: Building2,
  },
  {
    label: 'Policy Confidence Index',
    value: 71,
    suffix: '/100',
    delta: '+2 points',
    deltaLabel: 'Steady',
    trend: 'up',
    deltaTone: 'blue',
    tone: 'blue',
    icon: Landmark,
  },
]

export const timeline = [
  { time: 'Jan', title: 'Corporate relocation wave', detail: 'Two mid-market firms and one logistics HQ announce moves to Dallas and Austin.', tone: 'blue' },
  { time: 'Feb', title: 'Texas Advantage push', detail: 'State launches coordinated economic storytelling on tax, talent, and expansion speed.', tone: 'green' },
  { time: 'Mar', title: 'Housing affordability narrative', detail: 'Local commentary rises around rent pressure and neighborhood displacement concerns.', tone: 'amber' },
  { time: 'Apr', title: 'Policy reassurance package', detail: 'Officials pair migration messaging with infrastructure, zoning, and workforce commitments.', tone: 'blue' },
  { time: 'May', title: 'Media coverage spike', detail: 'National outlets frame Texas as both a magnet for capital and a stress test for local capacity.', tone: 'amber' },
  { time: 'Jun', title: 'Sentiment stabilization', detail: 'Resident acceptance improves where outreach and housing mitigation messages are localized.', tone: 'green' },
]

const statewideTrend = [
  { point: 'Jan', localAcceptance: 49, localResistance: 32, housingConcern: 44, cultureConcern: 27, migrantOptimism: 71, migrantConcern: 24, businessInterest: 58 },
  { point: 'Feb', localAcceptance: 50, localResistance: 35, housingConcern: 47, cultureConcern: 28, migrantOptimism: 75, migrantConcern: 23, businessInterest: 64 },
  { point: 'Mar', localAcceptance: 47, localResistance: 39, housingConcern: 54, cultureConcern: 31, migrantOptimism: 76, migrantConcern: 27, businessInterest: 68 },
  { point: 'Apr', localAcceptance: 52, localResistance: 36, housingConcern: 49, cultureConcern: 29, migrantOptimism: 79, migrantConcern: 24, businessInterest: 72 },
  { point: 'May', localAcceptance: 55, localResistance: 34, housingConcern: 46, cultureConcern: 28, migrantOptimism: 82, migrantConcern: 21, businessInterest: 78 },
  { point: 'Jun', localAcceptance: 58, localResistance: 30, housingConcern: 43, cultureConcern: 25, migrantOptimism: 84, migrantConcern: 19, businessInterest: 81 },
]

const cityAdjustments = {
  Statewide: { localAcceptance: 0, localResistance: 0, housingConcern: 0, cultureConcern: 0, migrantOptimism: 0, migrantConcern: 0, businessInterest: 0 },
  Austin: { localAcceptance: -3, localResistance: 5, housingConcern: 9, cultureConcern: 4, migrantOptimism: 2, migrantConcern: 4, businessInterest: 6 },
  Dallas: { localAcceptance: 2, localResistance: -2, housingConcern: 1, cultureConcern: 0, migrantOptimism: 3, migrantConcern: -1, businessInterest: 5 },
  Houston: { localAcceptance: 1, localResistance: -1, housingConcern: 0, cultureConcern: -1, migrantOptimism: 2, migrantConcern: 0, businessInterest: 4 },
  'San Antonio': { localAcceptance: -1, localResistance: 2, housingConcern: 3, cultureConcern: 2, migrantOptimism: 1, migrantConcern: 1, businessInterest: 2 },
}

export const getSentimentTrend = ({ timeRange = '6M', region = 'Statewide' } = {}) => {
  const limit = timeRange === '1M' ? 2 : timeRange === '3M' ? 4 : statewideTrend.length
  const adjustment = cityAdjustments[region] ?? cityAdjustments.Statewide

  return statewideTrend.slice(-limit).map((item) => ({
    ...item,
    localAcceptance: item.localAcceptance + adjustment.localAcceptance,
    localResistance: item.localResistance + adjustment.localResistance,
    housingConcern: item.housingConcern + adjustment.housingConcern,
    cultureConcern: item.cultureConcern + adjustment.cultureConcern,
    migrantOptimism: item.migrantOptimism + adjustment.migrantOptimism,
    migrantConcern: item.migrantConcern + adjustment.migrantConcern,
    businessInterest: item.businessInterest + adjustment.businessInterest,
  }))
}

export const hotspotAnalysis = [
  { city: 'Austin', inflow: 92, resistance: 68, housingStress: 84, narrative: 'High-value inflow, strongest affordability friction', tone: 'amber' },
  { city: 'Dallas', inflow: 88, resistance: 42, housingStress: 56, narrative: 'Corporate relocation leader with manageable local pushback', tone: 'green' },
  { city: 'Houston', inflow: 74, resistance: 36, housingStress: 49, narrative: 'Balanced reception with strong business absorption capacity', tone: 'green' },
  { city: 'San Antonio', inflow: 58, resistance: 47, housingStress: 53, narrative: 'Growing interest with local identity concerns rising', tone: 'amber' },
]

export const stakeholderImpact = [
  { name: 'Local residents', impact: 62, sentiment: 'Mixed', severity: 'Moderate', summary: 'Supportive of growth, but focused on affordability and cultural continuity.', tone: 'amber', icon: Users },
  { name: 'Migrating businesses', impact: 81, sentiment: 'Positive', severity: 'Low', summary: 'Responding to tax certainty, operating cost advantage, and expansion speed.', tone: 'green', icon: BriefcaseBusiness },
  { name: 'HNIs', impact: 74, sentiment: 'Positive', severity: 'Low', summary: 'High interest in tax climate and lifestyle, but still watching community reception.', tone: 'green', icon: BadgeDollarSign },
  { name: 'State government', impact: 77, sentiment: 'Confident', severity: 'Moderate', summary: 'Needs brand consistency while proving local quality-of-life protections.', tone: 'blue', icon: Landmark },
  { name: 'Media', impact: 66, sentiment: 'Mixed', severity: 'Moderate', summary: 'Narrative split between economic magnetism and social pressure concerns.', tone: 'amber', icon: Newspaper },
  { name: 'Real estate sector', impact: 71, sentiment: 'Positive', severity: 'Moderate', summary: 'Benefits from inflow but exposed to affordability and supply scrutiny.', tone: 'blue', icon: Building2 },
]

export const positiveDrivers = [
  { driver: 'Tax advantage', value: 91 },
  { driver: 'Cost of living', value: 76 },
  { driver: 'Remote work flexibility', value: 64 },
  { driver: 'Business-friendly regulation', value: 82 },
]

export const negativeDrivers = [
  { driver: 'Housing inflation fears', value: 79 },
  { driver: 'Political concerns', value: 58 },
  { driver: 'Cultural friction', value: 54 },
  { driver: 'Infrastructure strain', value: 49 },
]

export const riskMatrix = [
  { name: 'Housing affordability crisis', probability: 3, impact: 3, tone: 'amber' },
  { name: 'Anti-migrant sentiment', probability: 2, impact: 3, tone: 'amber' },
  { name: 'Political backlash', probability: 2, impact: 2, tone: 'amber' },
  { name: 'Social tension escalation', probability: 2, impact: 3, tone: 'red' },
  { name: 'Infrastructure strain', probability: 2, impact: 2, tone: 'amber' },
  { name: 'Narrative fragmentation', probability: 2, impact: 2, tone: 'blue' },
  { name: 'Talent attraction slowdown', probability: 1, impact: 2, tone: 'blue' },
  { name: 'Policy resistance at city level', probability: 2, impact: 1, tone: 'green' },
]

export const responseTracker = [
  { action: 'Texas Advantage creator campaign', owner: 'Economic Development', deadline: 'Live', status: 'Done', impact: 'Boost relocation intent among founders and investors' },
  { action: 'Local resident reassurance campaign', owner: 'Governor Communications', deadline: 'Next 72h', status: 'In Progress', impact: 'Reduce perceived zero-sum framing around migrants' },
  { action: 'City-level housing mitigation briefings', owner: 'Housing Taskforce', deadline: 'Next 5 days', status: 'In Progress', impact: 'Contain affordability backlash in hotspot markets' },
  { action: 'Influencer partnership rollout', owner: 'Digital Partnerships', deadline: 'Next 48h', status: 'Pending', impact: 'Normalize migration narrative through trusted local voices' },
  { action: 'Business relocation case-study PR', owner: 'State PR Office', deadline: 'Complete', status: 'Done', impact: 'Strengthen economic credibility with proof-driven storytelling' },
  { action: 'Community listening town halls', owner: 'Regional Affairs', deadline: 'Next 2 weeks', status: 'At Risk', impact: 'Build local trust and surface resistance early' },
]

export const messagingEffectiveness = [
  { metric: 'Campaign engagement rate', score: 74, benchmark: 'Strong', tone: 'green' },
  { metric: 'Sentiment shift after messaging', score: 61, benchmark: 'Improving', tone: 'blue' },
  { metric: 'Misinformation reduction', score: 52, benchmark: 'Moderate', tone: 'amber' },
  { metric: 'Reach of Texas Advantage narrative', score: 83, benchmark: 'High', tone: 'green' },
  { metric: 'Local reassurance effectiveness', score: 57, benchmark: 'Needs reinforcement', tone: 'amber' },
]

export const scenarios = [
  {
    label: 'Best case',
    probability: 0.24,
    summary: 'Texas sustains strong inflow, local concerns soften through housing and infrastructure reassurance, and the economic brand strengthens nationally.',
  },
  {
    label: 'Base case',
    probability: 0.58,
    summary: 'Growth remains solid, but city-specific resistance requires continuous messaging and visible mitigation to keep sentiment balanced.',
  },
  {
    label: 'Worst case',
    probability: 0.18,
    summary: 'Housing and political backlash reshape the story from opportunity to social strain, slowing high-value migration and increasing policy friction.',
  },
]

export const watchpoints = [
  'Track whether Austin resistance stays below 40% after housing reassurance content lands.',
  'Watch for local media framing that migration benefits outsiders at residents’ expense.',
  'Monitor if relocation inquiries remain strong after new affordability headlines.',
  'Check whether community outreach improves resident sentiment in high-pressure districts.',
]

export const recommendations = [
  'Deploy targeted local messaging that frames migration as investment in Texas communities, not displacement of them.',
  'Lead with economic storytelling for migrants and businesses, but pair it with visible commitments on housing and infrastructure.',
  'Localize policy reassurance by city so hotspot communities see specific mitigation plans, not statewide abstractions.',
  'Expand community outreach in Austin and San Antonio where social friction is outpacing statewide averages.',
  'Use proof-led relocation stories that showcase jobs, philanthropy, and local economic spillover for existing residents.',
]

export const narrativeThemes = {
  headlines: [
    'Texas remains the preferred relocation story for capital and headquarters',
    'Housing pressure is the main vulnerability in the migration narrative',
    'Judges and media will notice whether growth is framed as shared benefit or cultural displacement',
  ],
  risingKeywords: ['Texas Advantage', 'housing affordability', 'business relocation', 'community stability', 'tax climate', 'quality of life', 'local backlash'],
  concernClusters: [
    'Rent and affordability pressure',
    'Political identity and culture fit',
    'Infrastructure and congestion',
    'Whether newcomers contribute visibly to communities',
  ],
  misinformationFlags: [
    'Claim that state incentives are only benefiting coastal elites',
    'Narrative that local wages are broadly being displaced by inbound executives',
    'False rumor that cities are removing local housing protections to accelerate migration',
  ],
}

export const footerBadges = [
  { label: 'Economic Positioning Active', tone: 'blue' },
  { label: 'Mock Data', tone: 'amber' },
  { label: 'Public Sentiment Managed', tone: 'green' },
]
