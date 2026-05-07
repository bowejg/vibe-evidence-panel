import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { AddColumnSidebar } from './AddColumnSidebar'
import { ChatSidebar } from './ChatSidebar'
import { CellDetailSidebar } from './CellDetailSidebar'
import { ParticipantDetailSidebar } from './ParticipantDetailSidebar'

type Participant = {
  id: number
  fileName: string
  participant: string
  segment: string
  date: string
  whenContext: string
  whenContextCitations: number[]
  wantTo: string
  wantToCitations: number[]
  soThat: string
  soThatCitations: number[]
  currentSolution: string
  currentSolutionCitations: number[]
  painPoints: string
  painPointsCitations: number[]
}

interface AnalysisGridProps {
  initialViewMode?: 'options' | 'table'
}

export function AnalysisGrid({
  initialViewMode = 'options',
}: AnalysisGridProps) {
  const [viewMode, setViewMode] = useState<'options' | 'table'>(initialViewMode)
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isCellDetailOpen, setIsCellDetailOpen] = useState(false)
  const [isParticipantDetailOpen, setIsParticipantDetailOpen] = useState(false)
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null)
  const [highlightedCell, setHighlightedCell] = useState<string | null>(null)
  const [loadingCells, setLoadingCells] = useState<Set<string>>(new Set())

  // Citation to cell mapping (citation number -> cell ID)
  const citationMap: Record<string, string> = {
    '1': 'cell-0-whenContext',
    '3': 'cell-0-wantTo',
    '4': 'cell-0-painPoints',
    '5': 'cell-1-whenContext',
    '6': 'cell-1-wantTo',
    '7': 'cell-2-painPoints',
    '8': 'cell-2-soThat',
    '9': 'cell-2-currentSolution',
    '11': 'cell-3-painPoints',
  }

  const handleCitationClick = (citationNumber: string) => {
    const cellId = citationMap[citationNumber]
    if (!cellId) return

    const element = document.getElementById(cellId)
    if (!element) return

    // Scroll to element smoothly
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })

    // Trigger highlight animation
    setHighlightedCell(cellId)
    setTimeout(() => setHighlightedCell(null), 2000)
  }

  const handleCellDoubleClick = () => {
    // Close other panels
    setIsChatOpen(false)
    setIsAddColumnOpen(false)
    setIsParticipantDetailOpen(false)
    // Open cell detail panel
    setIsCellDetailOpen(true)
  }

  const handleParticipantClick = (participant: Participant) => {
    // Close other panels
    setIsChatOpen(false)
    setIsAddColumnOpen(false)
    setIsCellDetailOpen(false)
    // Set selected participant and open panel
    setSelectedParticipant(participant)
    setIsParticipantDetailOpen(true)
  }

  const handleGenerateFromGuide = () => {
    // Switch to table view
    setViewMode('table')

    // Mark all cells as loading
    const allCells = new Set<string>()
    participants.forEach((_, index) => {
      allCells.add(`cell-${index}-whenContext`)
      allCells.add(`cell-${index}-wantTo`)
      allCells.add(`cell-${index}-soThat`)
      allCells.add(`cell-${index}-currentSolution`)
      allCells.add(`cell-${index}-painPoints`)
    })
    setLoadingCells(allCells)

    // Gradually remove loading state
    const cellKeys = Array.from(allCells)
    cellKeys.forEach((cellKey, index) => {
      setTimeout(
        () => {
          setLoadingCells((prev) => {
            const newSet = new Set(prev)
            newSet.delete(cellKey)
            return newSet
          })
        },
        1000 + index * 200,
      ) // Stagger the loading
    })
  }

  // Sample participant data
  const participants = [
    {
      id: 1,
      fileName: 'UXR_Product_Des...',
      participant: 'P1_Sarah',
      segment: 'Product Designer',
      date: '15.02.2026',
      whenContext:
        "When I'm working on a new feature and need to understand how similar patterns were implemented in the past, I find myself asking different team members who might know where things are. This happens multiple times a week, especially during the discovery phase of new projects.",
      whenContextCitations: [1, 2],
      wantTo:
        'I want to quickly find and access previous design files, component documentation, and research findings all in one place without having to remember which tool or folder structure each team uses.',
      wantToCitations: [3, 4],
      soThat:
        "So that I can build on existing patterns and insights rather than starting from scratch or accidentally recreating work that's already been done. This would help me deliver higher quality work faster and maintain consistency across products.",
      soThatCitations: [5, 6],
      currentSolution:
        'Currently using a combination of Figma, Google Drive, Confluence, and Slack search. I bookmark important files but the bookmarks get outdated quickly. Sometimes I just DM designers directly to ask where things are.',
      currentSolutionCitations: [7, 8],
      painPoints:
        "The biggest pain is the time wasted searching across multiple tools. I've spent 30+ minutes looking for a design file I knew existed but couldn't remember where it was saved. Also frustrating when I find something useful but it's outdated with no indication of the current version.",
      painPointsCitations: [9, 10, 11],
    },
    {
      id: 2,
      fileName: 'UXR_Eng_Lead_02...',
      participant: 'P2_Marcus',
      segment: 'Engineering Lead',
      date: '16.02.2026',
      whenContext:
        "When I'm onboarding new engineers to the team, they struggle to find documentation about our architecture decisions, API specs, and code standards. Currently takes 2-3 weeks before they feel comfortable knowing where everything is stored.",
      whenContextCitations: [1, 2, 3],
      wantTo:
        'I want a single source of truth for all technical documentation, ADRs (Architecture Decision Records), and code examples that is automatically kept up-to-date and searchable by topic, technology, or project.',
      wantToCitations: [4, 5],
      soThat:
        'So that new team members can ramp up faster and existing engineers can easily reference past decisions without interrupting others. This would reduce duplicate work and ensure architectural consistency across services.',
      soThatCitations: [6, 7],
      currentSolution:
        "Mix of GitHub wikis, Notion pages, and README files scattered across 50+ repos. Some teams use Confluence, others use Google Docs. There's no standard and search doesn't work across tools.",
      currentSolutionCitations: [8, 9],
      painPoints:
        "Documentation drift is massive - what's written is often outdated or contradicts current implementation. Onboarding takes way too long because new hires don't know what to trust. I spend hours each week answering the same questions that should be documented somewhere.",
      painPointsCitations: [10, 11, 12],
    },
    {
      id: 3,
      fileName: 'UXR_ProdMgr_03...',
      participant: 'P3_Jennifer',
      segment: 'Product Manager',
      date: '17.02.2026',
      whenContext:
        "When I'm planning a new feature or product update, I need to review past user research, competitive analyses, and feature performance metrics to make informed decisions. This research is currently scattered across Dovetail, Amplitude, Google Slides, and various team Drives.",
      whenContextCitations: [1, 2],
      wantTo:
        'I want to access all historical product research and data in one centralized location where I can filter by product area, user segment, and date range to see the evolution of insights over time.',
      wantToCitations: [3, 4, 5],
      soThat:
        'So that I can make data-driven product decisions without spending days hunting for research artifacts. This would help me avoid repeating past mistakes and build on proven hypotheses across product cycles.',
      soThatCitations: [6, 7],
      currentSolution:
        "Currently maintain my own spreadsheet of links to research studies, but it's incomplete and only covers what I've personally worked on. Rely heavily on asking researchers and PMs to share relevant studies from their personal collections.",
      currentSolutionCitations: [8, 9],
      painPoints:
        "Research discoverability is terrible - I know we've done studies on similar topics but can't find them. Different researchers use different tools and naming conventions. Often duplicate research efforts because we don't know what's already been done. Critical insights get lost when team members leave.",
      painPointsCitations: [10, 11, 12],
    },
    {
      id: 4,
      fileName: 'UXR_UXRes_04...',
      participant: 'P4_David',
      segment: 'UX Researcher',
      date: '18.02.2026',
      whenContext:
        "When I'm starting a new research project, I need to review what we already know about a topic to avoid asking users the same questions twice and to build on existing knowledge. Finding relevant past studies takes significant manual effort.",
      whenContextCitations: [1, 2, 3],
      wantTo:
        'I want a searchable repository of all research studies with standardized tagging (user segment, research method, key themes) and the ability to quickly scan findings without downloading full reports.',
      wantToCitations: [4, 5],
      soThat:
        'So that I can discover relevant insights before designing my research plan and reference past findings in my reports to show how new insights connect to our existing knowledge base.',
      soThatCitations: [6, 7],
      currentSolution:
        "Maintain a Dovetail workspace but not everyone uses it consistently. Also have a Google Drive folder but the structure isn't intuitive. End up creating my own research repository in Notion just for my projects.",
      currentSolutionCitations: [8, 9],
      painPoints:
        "We definitely duplicate research - I've discovered studies on the same topic 6 months after I conducted mine. No way to know what research is in progress to coordinate efforts. Huge amount of valuable insights are locked in slide decks that only get viewed once in a stakeholder presentation.",
      painPointsCitations: [10, 11, 12],
    },
    {
      id: 5,
      fileName: 'UXR_ContentDes...',
      participant: 'P5_Rachel',
      segment: 'Content Designer',
      date: '19.02.2026',
      whenContext:
        "When I'm writing microcopy or content for a new feature, I need to ensure it aligns with our content guidelines, voice and tone principles, and existing patterns. Currently have to check multiple sources to verify I'm following standards.",
      whenContextCitations: [1, 2],
      wantTo:
        'I want a centralized content library with approved copy examples, content patterns, and localization guidelines that I can search by component type, user flow, or content type.',
      wantToCitations: [3, 4, 5],
      soThat:
        'So that I can write consistent, on-brand content faster and reduce the back-and-forth in reviews when stakeholders flag inconsistencies I could have caught earlier.',
      soThatCitations: [6, 7],
      currentSolution:
        "We have a content style guide in Notion, reference copy in Figma files, and some examples in Confluence. I keep my own swipe file of good examples but it's just what I happen to save.",
      currentSolutionCitations: [8, 9],
      painPoints:
        "Content inconsistency across products is embarrassing - same actions have different labels. Style guide exists but it's not comprehensive enough for edge cases. When someone updates the source of truth, there's no notification so I might reference outdated guidelines for weeks.",
      painPointsCitations: [10, 11, 12],
    },
    {
      id: 6,
      fileName: 'UXR_DataAnalyst...',
      participant: 'P6_Alex',
      segment: 'Data Analyst',
      date: '20.02.2026',
      whenContext:
        'When stakeholders ask for metrics or user behavior data, I often need to understand the product context, user flows, and past research to provide meaningful analysis rather than just raw numbers. This context is hard to find.',
      whenContextCitations: [1, 2],
      wantTo:
        'I want access to product documentation, user research findings, and design artifacts linked to specific features or user flows so I can understand the why behind the data.',
      wantToCitations: [3, 4],
      soThat:
        'So that I can provide richer, more actionable insights instead of just dashboards and numbers. This would help me connect quantitative data with qualitative context for better storytelling.',
      soThatCitations: [5, 6, 7],
      currentSolution:
        "Mostly rely on PMs and designers to explain context in Slack conversations. Sometimes dig through JIRA tickets to understand what was built and why. Keep my own notes but they're incomplete.",
      currentSolutionCitations: [8, 9],
      painPoints:
        "I waste time becoming a detective to understand what I'm analyzing. Metrics drop or spike and I have no context for whether it's expected. Often my analyses aren't actionable because I'm missing the product strategy and user research that would make the data meaningful.",
      painPointsCitations: [10, 11, 12],
    },
    {
      id: 7,
      fileName: 'UXR_DesignLead...',
      participant: 'P7_Michelle',
      segment: 'Design Lead',
      date: '21.02.2026',
      whenContext:
        "When I'm reviewing work from my team or planning design strategy, I need to ensure we're building on our design system and learnings from past projects rather than reinventing patterns each cycle.",
      whenContextCitations: [1, 2, 3],
      wantTo:
        'I want a comprehensive view of all design work across products including shipped features, research insights, and evolving patterns so I can identify opportunities for standardization and reuse.',
      wantToCitations: [4, 5],
      soThat:
        'So that I can guide my team toward consistency, help them find relevant examples quickly, and make strategic decisions about where to invest in new patterns versus using existing ones.',
      soThatCitations: [6, 7],
      currentSolution:
        "Figma is our main tool but files are organized by project which makes finding patterns hard. Try to maintain a component library but it doesn't capture the context of when/how to use components. Ad-hoc Slack discussions are where a lot of decisions get made.",
      currentSolutionCitations: [8, 9, 10],
      painPoints:
        "Team members duplicate work that already exists because they can't find it. No good way to share learnings across product teams so we repeat mistakes. When designers leave, their knowledge leaves with them. Design reviews surface inconsistencies that should have been caught earlier.",
      painPointsCitations: [11, 12],
    },
    {
      id: 8,
      fileName: 'UXR_FrontEnd_08...',
      participant: 'P8_James',
      segment: 'Frontend Engineer',
      date: '22.02.2026',
      whenContext:
        "When I'm implementing a feature, I need to understand the design intent, user research behind decisions, and any accessibility requirements. This information is rarely connected to the design files or tickets I work from.",
      whenContextCitations: [1, 2],
      wantTo:
        "I want easy access to the complete context behind any design I'm implementing - including the research, design rationale, accessibility requirements, and any relevant past implementations.",
      wantToCitations: [3, 4, 5],
      soThat:
        'So that I can make better implementation decisions, ask informed questions earlier, and build features that match the intended user experience rather than just the visual design.',
      soThatCitations: [6, 7],
      currentSolution:
        'Get Figma links in tickets, sometimes with brief descriptions. Have to interrupt designers or PMs to ask about context. Component library in Storybook but it only shows code, not the UX rationale.',
      currentSolutionCitations: [8, 9],
      painPoints:
        "I implement things that technically match the design but miss the user intent because I didn't have context. Edge cases come up during implementation that weren't in designs, and I make my best guess. Later learn user research existed that would have influenced my decisions if I'd known about it.",
      painPointsCitations: [10, 11, 12],
    },
  ]

  if (viewMode === 'options') {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
          <div className="text-center space-y-3 mb-4">
            <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight">
              Create Analysis Grid
            </h2>
            <p className="text-base text-neutral-500">
              Choose how you'd like to set up your analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            {/* Start from Scratch */}
            <button
              onClick={() => setViewMode('table')}
              className="group p-8 bg-white rounded-xl border border-neutral-200/60 hover:border-neutral-300 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Start from Scratch
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Create a custom analysis grid by manually adding rows and
                    columns
                  </p>
                </div>
              </div>
            </button>

            {/* Generate from Guide */}
            <button
              onClick={handleGenerateFromGuide}
              className="group p-8 bg-white rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-left relative overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
                  Recommended
                </span>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Generate from Guide
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Automatically create an analysis grid using your discussion
                    guide and participants
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header and Toolbar */}
      <div className="border-b border-neutral-200/60">
        <div className="px-8 py-4 flex items-center justify-between">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-neutral-900">
              Centralized Repository Research
            </span>
            <svg
              className="w-4 h-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Right: Toolbar Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsChatOpen(true)
                setIsAddColumnOpen(false)
                setIsCellDetailOpen(false)
                setIsParticipantDetailOpen(false)
              }}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-200 bg-white shadow-sm hover:bg-neutral-50 hover:border-neutral-300 transition-all"
            >
              <svg
                className="w-4 h-4 text-neutral-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </button>
            <div className="w-px h-5 bg-neutral-200 mx-1"></div>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add row
            </button>
            <button
              onClick={() => {
                setIsAddColumnOpen(true)
                setIsChatOpen(false)
                setIsCellDetailOpen(false)
                setIsParticipantDetailOpen(false)
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add column
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              Templates
            </button>
          </div>
        </div>
      </div>

      {/* Table and Sidebar Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Sidebar on Left */}
        <ChatSidebar
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onCitationClick={handleCitationClick}
        />
        {/* Add Column Sidebar on Left */}
        <AddColumnSidebar
          isOpen={isAddColumnOpen}
          onClose={() => setIsAddColumnOpen(false)}
        />
        {/* Participant Detail Sidebar on Left */}
        <ParticipantDetailSidebar
          isOpen={isParticipantDetailOpen}
          onClose={() => setIsParticipantDetailOpen(false)}
          participant={selectedParticipant}
        />
        {/* Table Container - Scrollable */}
        <div className="flex-1 overflow-auto min-w-0">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-20">
              <tr className="border-b border-neutral-200/60">
                <th
                  className="sticky left-0 z-30 px-8 py-3.5 text-left bg-neutral-50 border-r border-neutral-200"
                  style={{ minWidth: '280px' }}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox />
                    <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Participant
                    </span>
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '180px' }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Segment
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '180px' }}
                >
                  Interview Date
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '400px' }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    When I...
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '380px' }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    I want to...
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '380px' }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    So that...
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '380px' }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Current Solution
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '380px' }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Pain Points
                  </div>
                </th>
                {!isAddColumnOpen &&
                  !isChatOpen &&
                  !isCellDetailOpen &&
                  !isParticipantDetailOpen && (
                    <th
                      className="px-8 py-3.5 text-left bg-neutral-50/50"
                      style={{ minWidth: '200px' }}
                    >
                      <button
                        onClick={() => {
                          setIsAddColumnOpen(true)
                          setIsChatOpen(false)
                          setIsCellDetailOpen(false)
                          setIsParticipantDetailOpen(false)
                        }}
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors text-sm font-medium"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        New column
                      </button>
                    </th>
                  )}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {participants.map((participant, index) => (
                <tr key={participant.id} className="group transition-colors">
                  <td className="sticky left-0 z-10 px-8 py-4 bg-white group-hover:bg-neutral-50 border-r border-neutral-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="relative w-4 h-4">
                        <span className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500 font-medium group-hover:opacity-0 transition-opacity">
                          {index + 1}
                        </span>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Checkbox />
                        </div>
                      </div>
                      <button
                        onClick={() => handleParticipantClick(participant)}
                        className="flex items-center gap-3 hover:opacity-75 transition-opacity"
                      >
                        <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-red-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 18h10v-1H7v1zM17 14H7v-1h10v1zm0-4H7V9h10v1zm2-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V6h14v14z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-900">
                            {participant.fileName}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {participant.participant}
                          </div>
                        </div>
                      </button>
                    </div>
                  </td>
                  <td className="px-8 py-4 bg-white group-hover:bg-neutral-50 transition-colors">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        participant.segment === 'Product Designer'
                          ? 'bg-purple-50/50 text-purple-600'
                          : participant.segment === 'Engineering Lead'
                            ? 'bg-blue-50/50 text-blue-600'
                            : participant.segment === 'Product Manager'
                              ? 'bg-green-50/50 text-green-600'
                              : participant.segment === 'UX Researcher'
                                ? 'bg-pink-50/50 text-pink-600'
                                : participant.segment === 'Content Designer'
                                  ? 'bg-orange-50/50 text-orange-600'
                                  : participant.segment === 'Data Analyst'
                                    ? 'bg-cyan-50/50 text-cyan-600'
                                    : participant.segment === 'Design Lead'
                                      ? 'bg-indigo-50/50 text-indigo-600'
                                      : 'bg-teal-50/50 text-teal-600'
                      }`}
                    >
                      {participant.segment}
                    </span>
                  </td>
                  <td className="px-8 py-4 bg-white group-hover:bg-neutral-50 transition-colors">
                    <span className="text-sm text-neutral-600">
                      {participant.date}
                    </span>
                  </td>
                  <td
                    id={`cell-${index}-whenContext`}
                    onDoubleClick={handleCellDoubleClick}
                    className={`px-8 py-4 transition-all duration-500 cursor-pointer bg-white group-hover:bg-neutral-50 ${
                      highlightedCell === `cell-${index}-whenContext`
                        ? 'bg-yellow-100 ring-2 ring-yellow-400 ring-inset'
                        : ''
                    }`}
                  >
                    {loadingCells.has(`cell-${index}-whenContext`) ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-neutral-200 rounded animate-pulse" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-5/6" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-4/6" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-700 leading-relaxed line-clamp-4">
                        {participant.whenContext}
                        {participant.whenContextCitations.map(
                          (citation, idx) => (
                            <button
                              key={idx}
                              className="ml-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                              [{citation}]
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </td>
                  <td
                    id={`cell-${index}-wantTo`}
                    onDoubleClick={handleCellDoubleClick}
                    className={`px-8 py-4 transition-all duration-500 cursor-pointer bg-white group-hover:bg-neutral-50 ${
                      highlightedCell === `cell-${index}-wantTo`
                        ? 'bg-yellow-100 ring-2 ring-yellow-400 ring-inset'
                        : ''
                    }`}
                  >
                    {loadingCells.has(`cell-${index}-wantTo`) ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-neutral-200 rounded animate-pulse" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-5/6" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-4/6" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-700 leading-relaxed line-clamp-4">
                        {participant.wantTo}
                        {participant.wantToCitations.map((citation, idx) => (
                          <button
                            key={idx}
                            className="ml-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            [{citation}]
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                  <td
                    id={`cell-${index}-soThat`}
                    onDoubleClick={handleCellDoubleClick}
                    className={`px-8 py-4 transition-all duration-500 cursor-pointer bg-white group-hover:bg-neutral-50 ${
                      highlightedCell === `cell-${index}-soThat`
                        ? 'bg-yellow-100 ring-2 ring-yellow-400 ring-inset'
                        : ''
                    }`}
                  >
                    {loadingCells.has(`cell-${index}-soThat`) ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-neutral-200 rounded animate-pulse" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-5/6" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-4/6" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-700 leading-relaxed line-clamp-4">
                        {participant.soThat}
                        {participant.soThatCitations.map((citation, idx) => (
                          <button
                            key={idx}
                            className="ml-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            [{citation}]
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                  <td
                    id={`cell-${index}-currentSolution`}
                    onDoubleClick={handleCellDoubleClick}
                    className={`px-8 py-4 transition-all duration-500 cursor-pointer bg-white group-hover:bg-neutral-50 ${
                      highlightedCell === `cell-${index}-currentSolution`
                        ? 'bg-yellow-100 ring-2 ring-yellow-400 ring-inset'
                        : ''
                    }`}
                  >
                    {loadingCells.has(`cell-${index}-currentSolution`) ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-neutral-200 rounded animate-pulse" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-5/6" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-4/6" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-700 leading-relaxed line-clamp-4">
                        {participant.currentSolution}
                        {participant.currentSolutionCitations.map(
                          (citation, idx) => (
                            <button
                              key={idx}
                              className="ml-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                              [{citation}]
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </td>
                  <td
                    id={`cell-${index}-painPoints`}
                    onDoubleClick={handleCellDoubleClick}
                    className={`px-8 py-4 transition-all duration-500 cursor-pointer bg-white group-hover:bg-neutral-50 ${
                      highlightedCell === `cell-${index}-painPoints`
                        ? 'bg-yellow-100 ring-2 ring-yellow-400 ring-inset'
                        : ''
                    }`}
                  >
                    {loadingCells.has(`cell-${index}-painPoints`) ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-neutral-200 rounded animate-pulse" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-5/6" />
                          <div className="h-3 bg-neutral-200 rounded animate-pulse w-4/6" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-700 leading-relaxed line-clamp-4">
                        {participant.painPoints}
                        {participant.painPointsCitations.map(
                          (citation, idx) => (
                            <button
                              key={idx}
                              className="ml-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                              [{citation}]
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </td>
                  {!isAddColumnOpen && !isChatOpen && !isCellDetailOpen && (
                    <td className="px-8 py-4 bg-white group-hover:bg-neutral-50 transition-colors">
                      {/* Empty cell for new column */}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cell Detail Sidebar on Right */}
        <CellDetailSidebar
          isOpen={isCellDetailOpen}
          onClose={() => setIsCellDetailOpen(false)}
        />
      </div>
    </div>
  )
}
