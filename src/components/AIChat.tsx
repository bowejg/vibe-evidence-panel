import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { ChevronDown } from 'lucide-react'

type EvidenceStrength = 'all' | 'strong' | 'moderate' | 'weak'

const AVAILABLE_SEGMENTS = [
  'Oncologist',
  'ENT',
  'US',
  'UK',
  'Academic',
  'Private Practice',
]

export function AIChat() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [expandedQuotes, setExpandedQuotes] = useState<Set<string>>(new Set())
  const [filterStrength, setFilterStrength] = useState<EvidenceStrength>('all')
  const [selectedSegments, setSelectedSegments] = useState<Set<string>>(
    new Set(),
  )
  const [groupByParticipant, setGroupByParticipant] = useState(false)

  const toggleQuote = (quoteId: string) => {
    setExpandedQuotes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(quoteId)) {
        newSet.delete(quoteId)
      } else {
        newSet.add(quoteId)
      }
      return newSet
    })
  }

  const shouldShowQuote = (strength: EvidenceStrength) => {
    if (filterStrength === 'all') return true
    return filterStrength === strength
  }

  const shouldShowCard = (quoteStrengths: EvidenceStrength[]) => {
    if (filterStrength === 'all') return true
    return quoteStrengths.some((strength) => strength === filterStrength)
  }

  const toggleSegment = (segment: string) => {
    setSelectedSegments((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(segment)) {
        newSet.delete(segment)
      } else {
        newSet.add(segment)
      }
      return newSet
    })
  }

  return (
    <TooltipProvider>
      <div className="h-full bg-white flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Main Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-3xl mx-auto px-16 py-16">
              <p className="text-[21px] leading-[1.6] text-neutral-700 font-normal">
                Oncologists rely on a diverse ecosystem of information sources
                rather than any single channel{' '}
                <button
                  onClick={() => setIsPanelOpen(true)}
                  className="inline-flex items-center px-2 py-0.5 text-[17px] font-normal text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
                >
                  (14 Participants)
                </button>
                . As one put it: "You learn on the fly. You can learn from other
                colleagues, you can learn at plenary sessions... pharmaceutical
                representatives... emails or announcements. It's all the above."{' '}
                <button
                  onClick={() => setIsPanelOpen(true)}
                  className="inline-flex items-center px-2 py-0.5 text-[17px] font-normal text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
                >
                  (1 Participant)
                </button>
              </p>
            </div>
          </div>

          {/* Right Side - Evidence Panel */}
          {isPanelOpen && (
            <div className="w-[650px] border-l border-neutral-200 bg-white flex flex-col h-full overflow-hidden">
              {/* Sticky Header with Claim */}
              <div className="flex-shrink-0 p-6 pb-4 bg-white space-y-4">
                {/* Claim Box */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    <span className="font-medium">Claim:</span> Oncologists rely
                    on a diverse ecosystem of information sources rather than
                    any single channel
                  </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setGroupByParticipant(!groupByParticipant)}
                      className={`px-3 py-1.5 text-xs rounded transition-colors font-normal ${
                        groupByParticipant
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      Group by participant
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="px-3 py-1.5 text-xs rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors font-normal inline-flex items-center gap-1">
                          Show Segments{' '}
                          {selectedSegments.size > 0 &&
                            `(${selectedSegments.size})`}
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="w-56"
                        onCloseAutoFocus={(e) => e.preventDefault()}
                      >
                        {AVAILABLE_SEGMENTS.map((segment) => (
                          <DropdownMenuCheckboxItem
                            key={segment}
                            checked={selectedSegments.has(segment)}
                            onCheckedChange={() => toggleSegment(segment)}
                            onSelect={(e) => e.preventDefault()}
                          >
                            {segment}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="px-3 py-1.5 text-xs rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors font-normal inline-flex items-center gap-1">
                          Filter:{' '}
                          {filterStrength === 'all'
                            ? 'All'
                            : filterStrength.charAt(0).toUpperCase() +
                              filterStrength.slice(1)}
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem
                          onClick={() => setFilterStrength('all')}
                        >
                          All Evidence
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setFilterStrength('strong')}
                        >
                          Strong
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setFilterStrength('moderate')}
                        >
                          Moderate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setFilterStrength('weak')}
                        >
                          Weak
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Participant Progress Circle */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6">
                      <svg className="w-6 h-6 transform -rotate-90">
                        {/* Background circle */}
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#e5e5e5"
                          strokeWidth="4"
                          fill="none"
                        />
                        {/* Green segment - Strong evidence (5 participants) */}
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#10b981"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(5 / 20) * 62.83} 62.83`}
                          strokeLinecap="round"
                        />
                        {/* Orange segment - Moderate evidence (3 participants) */}
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#f97316"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(3 / 20) * 62.83} 62.83`}
                          strokeDashoffset={-((5 / 20) * 62.83)}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-neutral-600">
                      8/20 participants
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable Evidence Cards */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                {/* US02 Group */}
                {shouldShowCard(['strong', 'strong']) && (
                  <div
                    className={
                      groupByParticipant
                        ? 'border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/30 rounded-lg p-3 space-y-3 transition-colors'
                        : 'space-y-3'
                    }
                  >
                    {/* Evidence Card 1 */}
                    <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                          US02
                        </span>{' '}
                        says they "continue paying attention to congress
                        presentations and to medical journal articles as well as
                        to manufacturer presentations by a sales
                        representative."
                      </p>

                      <div className="space-y-2">
                        {shouldShowQuote('strong') && (
                          <div
                            onClick={() => toggleQuote('1-1')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                          >
                            {expandedQuotes.has('1-1') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "Where do you typically get your
                                  information about new treatments and
                                  therapies?"
                                </p>
                                <p>
                                  Well, I continue paying attention to congress
                                  presentations and to medical journal articles
                                  as well as to manufacturer presentations by a
                                  sales representative. Yes.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript for US02...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              'Well, I continue paying attention to congress presentations and to medical journal articles as well as to manufacturer presentations by a sales representative. Yes.'
                            )}
                          </div>
                        )}
                        {shouldShowQuote('strong') && (
                          <div
                            onClick={() => toggleQuote('1-2')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                          >
                            {expandedQuotes.has('1-2') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "How do you approach staying
                                  current with the latest research and clinical
                                  developments?"
                                </p>
                                <p>
                                  I make it a point to stay informed through
                                  multiple channels - whether it's ASCO, reading
                                  journals, or meeting with pharma reps who
                                  bring new data.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript for US02...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              "I make it a point to stay informed through multiple channels - whether it's ASCO, reading journals, or meeting with pharma reps who bring new data."
                            )}
                          </div>
                        )}
                      </div>

                      {/* Segments */}
                      {selectedSegments.size > 0 && (
                        <div className="pt-2 border-t border-neutral-200">
                          <div className="flex flex-wrap gap-1.5">
                            {['US', 'Oncologist', 'Academic'].map(
                              (segment) =>
                                selectedSegments.has(segment) && (
                                  <Badge
                                    key={segment}
                                    variant="secondary"
                                    className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                  >
                                    {segment}
                                  </Badge>
                                ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* US07 Group */}
                {(shouldShowCard(['strong']) ||
                  shouldShowCard(['strong', 'moderate']) ||
                  shouldShowCard(['moderate'])) && (
                  <div
                    className={
                      groupByParticipant
                        ? 'border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/30 rounded-lg p-3 space-y-3 transition-colors'
                        : 'space-y-3'
                    }
                  >
                    {/* Evidence Card 2 - US07 Card 1 */}
                    {shouldShowCard(['strong']) && (
                      <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                            US07
                          </span>{' '}
                          mentions they "rely on multiple channels including
                          peer networks, scientific literature, and industry
                          updates."
                        </p>

                        <div className="space-y-2">
                          {shouldShowQuote('strong') && (
                            <div
                              onClick={() => toggleQuote('2-1')}
                              className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                            >
                              {expandedQuotes.has('2-1') ? (
                                <div className="space-y-2">
                                  <p className="text-neutral-500 italic text-xs">
                                    Moderator: "What information sources do you
                                    rely on for staying current with oncology
                                    developments?"
                                  </p>
                                  <p>
                                    I rely on multiple channels including peer
                                    networks, scientific literature, and
                                    industry updates. No one source has
                                    everything you need. I've learned that
                                    collaboration and information sharing with
                                    colleagues is just as important as staying
                                    current with published research.
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      alert(
                                        'Opening full transcript for US07...',
                                      )
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                  >
                                    View full transcript →
                                  </button>
                                </div>
                              ) : (
                                'I rely on multiple channels including peer networks, scientific literature, and industry updates. No one source has everything you need.'
                              )}
                            </div>
                          )}
                        </div>

                        {/* Segments */}
                        {selectedSegments.size > 0 && (
                          <div className="pt-2 border-t border-neutral-200">
                            <div className="flex flex-wrap gap-1.5">
                              {['US', 'Oncologist', 'Private Practice'].map(
                                (segment) =>
                                  selectedSegments.has(segment) && (
                                    <Badge
                                      key={segment}
                                      variant="secondary"
                                      className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                    >
                                      {segment}
                                    </Badge>
                                  ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Evidence Card 2B - US07 Card 2 */}
                    {shouldShowCard(['strong', 'moderate']) && (
                      <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                            US07
                          </span>{' '}
                          discusses their approach to "filtering and
                          synthesizing information from different channels."
                        </p>

                        <div className="space-y-2">
                          {shouldShowQuote('strong') && (
                            <div
                              onClick={() => toggleQuote('2b-1')}
                              className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                            >
                              {expandedQuotes.has('2b-1') ? (
                                <div className="space-y-2">
                                  <p className="text-neutral-500 italic text-xs">
                                    Moderator: "How do you filter through all
                                    the information that's available?"
                                  </p>
                                  <p>
                                    You have to be discerning. I look at
                                    peer-reviewed journals first, then
                                    cross-reference with what I'm hearing at
                                    conferences and from colleagues. The
                                    pharmaceutical representatives bring
                                    valuable updates too, but I always verify
                                    against published data.
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      alert(
                                        'Opening full transcript for US07...',
                                      )
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                  >
                                    View full transcript →
                                  </button>
                                </div>
                              ) : (
                                "You have to be discerning. I look at peer-reviewed journals first, then cross-reference with what I'm hearing at conferences and from colleagues."
                              )}
                            </div>
                          )}
                          {shouldShowQuote('moderate') && (
                            <div
                              onClick={() => toggleQuote('2b-2')}
                              className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-amber-500 pl-4"
                            >
                              {expandedQuotes.has('2b-2') ? (
                                <div className="space-y-2">
                                  <p className="text-neutral-500 italic text-xs">
                                    Moderator: "Do you have a preferred starting
                                    point when learning about a new treatment?"
                                  </p>
                                  <p>
                                    Not really a single starting point. It
                                    depends on where I first hear about it.
                                    Sometimes it's a conference, sometimes a
                                    journal article, sometimes a discussion with
                                    a colleague over lunch.
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      alert(
                                        'Opening full transcript for US07...',
                                      )
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                  >
                                    View full transcript →
                                  </button>
                                </div>
                              ) : (
                                'Not really a single starting point. It depends on where I first hear about it.'
                              )}
                            </div>
                          )}
                        </div>

                        {/* Segments */}
                        {selectedSegments.size > 0 && (
                          <div className="pt-2 border-t border-neutral-200">
                            <div className="flex flex-wrap gap-1.5">
                              {['US', 'Oncologist', 'Private Practice'].map(
                                (segment) =>
                                  selectedSegments.has(segment) && (
                                    <Badge
                                      key={segment}
                                      variant="secondary"
                                      className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                    >
                                      {segment}
                                    </Badge>
                                  ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Evidence Card 2C - US07 Card 3 */}
                    {shouldShowCard(['moderate']) && (
                      <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                            US07
                          </span>{' '}
                          describes how "networking events and conferences
                          provide unexpected insights."
                        </p>

                        <div className="space-y-2">
                          {shouldShowQuote('moderate') && (
                            <div
                              onClick={() => toggleQuote('2c-1')}
                              className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-amber-500 pl-4"
                            >
                              {expandedQuotes.has('2c-1') ? (
                                <div className="space-y-2">
                                  <p className="text-neutral-500 italic text-xs">
                                    Moderator: "What role do conferences play in
                                    your professional development?"
                                  </p>
                                  <p>
                                    Conferences are invaluable. You get the
                                    formal presentations with the latest data,
                                    but equally important are the hallway
                                    conversations. That's where you learn what's
                                    really working in practice, what challenges
                                    other oncologists are facing.
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      alert(
                                        'Opening full transcript for US07...',
                                      )
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                  >
                                    View full transcript →
                                  </button>
                                </div>
                              ) : (
                                'Conferences are invaluable. You get the formal presentations with the latest data, but equally important are the hallway conversations.'
                              )}
                            </div>
                          )}
                        </div>

                        {/* Segments */}
                        {selectedSegments.size > 0 && (
                          <div className="pt-2 border-t border-neutral-200">
                            <div className="flex flex-wrap gap-1.5">
                              {['US', 'Oncologist', 'Private Practice'].map(
                                (segment) =>
                                  selectedSegments.has(segment) && (
                                    <Badge
                                      key={segment}
                                      variant="secondary"
                                      className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                    >
                                      {segment}
                                    </Badge>
                                  ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Evidence Card 2D - US07 Card 4 */}
                    {shouldShowCard(['strong']) && (
                      <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                            US07
                          </span>{' '}
                          emphasizes "the importance of triangulating
                          information across multiple sources."
                        </p>

                        <div className="space-y-2">
                          {shouldShowQuote('strong') && (
                            <div
                              onClick={() => toggleQuote('2d-1')}
                              className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                            >
                              {expandedQuotes.has('2d-1') ? (
                                <div className="space-y-2">
                                  <p className="text-neutral-500 italic text-xs">
                                    Moderator: "How do you validate new
                                    information before applying it in your
                                    practice?"
                                  </p>
                                  <p>
                                    I triangulate. If I hear about something
                                    from a rep, I'll look for the journal
                                    article. Then I'll ask colleagues what
                                    they're seeing. I might check online forums
                                    where other oncologists are discussing it.
                                    By the time I'm ready to use it, I've
                                    confirmed it through multiple independent
                                    sources.
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      alert(
                                        'Opening full transcript for US07...',
                                      )
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                  >
                                    View full transcript →
                                  </button>
                                </div>
                              ) : (
                                "I triangulate. If I hear about something from a rep, I'll look for the journal article. Then I'll ask colleagues what they're seeing."
                              )}
                            </div>
                          )}
                        </div>

                        {/* Segments */}
                        {selectedSegments.size > 0 && (
                          <div className="pt-2 border-t border-neutral-200">
                            <div className="flex flex-wrap gap-1.5">
                              {['US', 'Oncologist', 'Private Practice'].map(
                                (segment) =>
                                  selectedSegments.has(segment) && (
                                    <Badge
                                      key={segment}
                                      variant="secondary"
                                      className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                    >
                                      {segment}
                                    </Badge>
                                  ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Evidence Card 2E - US07 Card 5 */}
                    {shouldShowCard(['moderate']) && (
                      <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                            US07
                          </span>{' '}
                          notes that "different sources serve different purposes
                          in their information ecosystem."
                        </p>

                        <div className="space-y-2">
                          {shouldShowQuote('moderate') && (
                            <div
                              onClick={() => toggleQuote('2e-1')}
                              className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-amber-500 pl-4"
                            >
                              {expandedQuotes.has('2e-1') ? (
                                <div className="space-y-2">
                                  <p className="text-neutral-500 italic text-xs">
                                    Moderator: "Are all your information sources
                                    equally valuable?"
                                  </p>
                                  <p>
                                    They serve different purposes. Journals give
                                    me the evidence base and methodology.
                                    Conferences give me context on how it's
                                    being applied. Colleagues give me the
                                    practical reality check. Industry
                                    communications alert me to what's coming. I
                                    need all of them, just for different
                                    reasons.
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      alert(
                                        'Opening full transcript for US07...',
                                      )
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                  >
                                    View full transcript →
                                  </button>
                                </div>
                              ) : (
                                'They serve different purposes. Journals give me the evidence base. Conferences give me context. Colleagues give me the practical reality check.'
                              )}
                            </div>
                          )}
                        </div>

                        {/* Segments */}
                        {selectedSegments.size > 0 && (
                          <div className="pt-2 border-t border-neutral-200">
                            <div className="flex flex-wrap gap-1.5">
                              {['US', 'Oncologist', 'Private Practice'].map(
                                (segment) =>
                                  selectedSegments.has(segment) && (
                                    <Badge
                                      key={segment}
                                      variant="secondary"
                                      className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                    >
                                      {segment}
                                    </Badge>
                                  ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* US12 Group */}
                {shouldShowCard(['strong', 'moderate']) && (
                  <div
                    className={
                      groupByParticipant
                        ? 'border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/30 rounded-lg p-3 space-y-3 transition-colors'
                        : 'space-y-3'
                    }
                  >
                    {/* Evidence Card 3 */}
                    <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                          US12
                        </span>{' '}
                        describes using "a combination of academic sources,
                        professional meetings, and direct communication with
                        pharmaceutical representatives."
                      </p>

                      <div className="space-y-2">
                        {shouldShowQuote('strong') && (
                          <div
                            onClick={() => toggleQuote('3-1')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                          >
                            {expandedQuotes.has('3-1') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "How do you balance different
                                  information sources when learning about new
                                  treatments?"
                                </p>
                                <p>
                                  I use a combination of academic sources,
                                  professional meetings, and direct
                                  communication with pharmaceutical
                                  representatives. Each source brings something
                                  different to the table. The academic papers
                                  provide the rigorous evidence base,
                                  conferences offer real-world clinical
                                  insights, and industry communications keep me
                                  updated on new treatment options.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript for US12...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              'I use a combination of academic sources, professional meetings, and direct communication with pharmaceutical representatives. Each source brings something different to the table.'
                            )}
                          </div>
                        )}
                        {shouldShowQuote('moderate') && (
                          <div
                            onClick={() => toggleQuote('3-2')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-amber-500 pl-4"
                          >
                            {expandedQuotes.has('3-2') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "Do you find one source to be more
                                  valuable than others?"
                                </p>
                                <p>
                                  No single source gives you the complete
                                  picture. You need to triangulate information
                                  from multiple places to make good clinical
                                  decisions. It's about building a comprehensive
                                  understanding rather than relying on any one
                                  perspective.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              'No single source gives you the complete picture. You need to triangulate information from multiple places to make good clinical decisions.'
                            )}
                          </div>
                        )}
                      </div>

                      {/* Segments */}
                      {selectedSegments.size > 0 && (
                        <div className="pt-2 border-t border-neutral-200">
                          <div className="flex flex-wrap gap-1.5">
                            {['UK', 'Oncologist', 'Academic'].map(
                              (segment) =>
                                selectedSegments.has(segment) && (
                                  <Badge
                                    key={segment}
                                    variant="secondary"
                                    className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                  >
                                    {segment}
                                  </Badge>
                                ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* US05 Group */}
                {shouldShowCard(['moderate']) && (
                  <div
                    className={
                      groupByParticipant
                        ? 'border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/30 rounded-lg p-3 space-y-3 transition-colors'
                        : 'space-y-3'
                    }
                  >
                    {/* Evidence Card 4 */}
                    <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                          US05
                        </span>{' '}
                        states they "integrate information from conferences,
                        medical journals, and pharmaceutical companies."
                      </p>

                      <div className="space-y-2">
                        {shouldShowQuote('moderate') && (
                          <div
                            onClick={() => toggleQuote('4-1')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-amber-500 pl-4"
                          >
                            {expandedQuotes.has('4-1') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "How do you integrate information
                                  from different sources in your practice?"
                                </p>
                                <p>
                                  I integrate information from conferences,
                                  medical journals, and pharmaceutical
                                  companies. You have to be critical and
                                  cross-reference, but I use all of these
                                  sources. The reality is that practice-changing
                                  information can come from anywhere, so you
                                  need to cast a wide net.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              'I integrate information from conferences, medical journals, and pharmaceutical companies. You have to be critical and cross-reference, but I use all of these sources.'
                            )}
                          </div>
                        )}
                      </div>

                      {/* Segments */}
                      {selectedSegments.size > 0 && (
                        <div className="pt-2 border-t border-neutral-200">
                          <div className="flex flex-wrap gap-1.5">
                            {['US', 'ENT', 'Private Practice'].map(
                              (segment) =>
                                selectedSegments.has(segment) && (
                                  <Badge
                                    key={segment}
                                    variant="secondary"
                                    className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                  >
                                    {segment}
                                  </Badge>
                                ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* US09 Group */}
                {shouldShowCard(['strong']) && (
                  <div
                    className={
                      groupByParticipant
                        ? 'border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/30 rounded-lg p-3 space-y-3 transition-colors'
                        : 'space-y-3'
                    }
                  >
                    {/* Evidence Card 5 */}
                    <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                          US09
                        </span>{' '}
                        explains they "gather insights from various touchpoints
                        including conferences, peer discussions, and industry
                        communications."
                      </p>

                      <div className="space-y-2">
                        {shouldShowQuote('strong') && (
                          <div
                            onClick={() => toggleQuote('5-1')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                          >
                            {expandedQuotes.has('5-1') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "Can you describe your approach to
                                  gathering information about new therapies?"
                                </p>
                                <p>
                                  I gather insights from various touchpoints
                                  including conferences, peer discussions, and
                                  industry communications. It's about building a
                                  complete picture. No single conversation or
                                  publication tells you everything you need to
                                  know about emerging therapies.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              "I gather insights from various touchpoints including conferences, peer discussions, and industry communications. It's about building a complete picture."
                            )}
                          </div>
                        )}
                      </div>

                      {/* Segments */}
                      {selectedSegments.size > 0 && (
                        <div className="pt-2 border-t border-neutral-200">
                          <div className="flex flex-wrap gap-1.5">
                            {['US', 'Oncologist', 'Academic'].map(
                              (segment) =>
                                selectedSegments.has(segment) && (
                                  <Badge
                                    key={segment}
                                    variant="secondary"
                                    className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                  >
                                    {segment}
                                  </Badge>
                                ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* US14 Group */}
                {shouldShowCard(['strong', 'moderate']) && (
                  <div
                    className={
                      groupByParticipant
                        ? 'border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/30 rounded-lg p-3 space-y-3 transition-colors'
                        : 'space-y-3'
                    }
                  >
                    {/* Evidence Card 6 */}
                    <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                          US14
                        </span>{' '}
                        notes they "consult multiple information channels rather
                        than depending on a single resource."
                      </p>

                      <div className="space-y-2">
                        {shouldShowQuote('strong') && (
                          <div
                            onClick={() => toggleQuote('6-1')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                          >
                            {expandedQuotes.has('6-1') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "What's your strategy for staying
                                  informed about treatment developments?"
                                </p>
                                <p>
                                  I consult multiple information channels rather
                                  than depending on a single resource. Each has
                                  its strengths and limitations. Academic
                                  journals give you the evidence, conferences
                                  give you the clinical context, and colleagues
                                  give you real-world experience.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              'I consult multiple information channels rather than depending on a single resource. Each has its strengths and limitations.'
                            )}
                          </div>
                        )}
                        {shouldShowQuote('moderate') && (
                          <div
                            onClick={() => toggleQuote('6-2')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-amber-500 pl-4"
                          >
                            {expandedQuotes.has('6-2') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "Is there a single resource you
                                  rely on most heavily?"
                                </p>
                                <p>
                                  You can't just read one journal or attend one
                                  conference. The landscape is too complex for
                                  that approach. Treatment protocols are
                                  evolving rapidly and you need multiple
                                  perspectives to stay ahead.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              "You can't just read one journal or attend one conference. The landscape is too complex for that approach."
                            )}
                          </div>
                        )}
                      </div>

                      {/* Segments */}
                      {selectedSegments.size > 0 && (
                        <div className="pt-2 border-t border-neutral-200">
                          <div className="flex flex-wrap gap-1.5">
                            {['UK', 'ENT', 'Private Practice'].map(
                              (segment) =>
                                selectedSegments.has(segment) && (
                                  <Badge
                                    key={segment}
                                    variant="secondary"
                                    className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                  >
                                    {segment}
                                  </Badge>
                                ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* US03 Group */}
                {shouldShowCard(['strong']) && (
                  <div
                    className={
                      groupByParticipant
                        ? 'border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/30 rounded-lg p-3 space-y-3 transition-colors'
                        : 'space-y-3'
                    }
                  >
                    {/* Evidence Card 7 */}
                    <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                          US03
                        </span>{' '}
                        describes how they "utilize a broad spectrum of
                        information sources including academic journals,
                        professional networks, and pharmaceutical
                        representatives."
                      </p>

                      <div className="space-y-2">
                        {shouldShowQuote('strong') && (
                          <div
                            onClick={() => toggleQuote('7-1')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                          >
                            {expandedQuotes.has('7-1') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "Tell me about your
                                  information-gathering habits for new
                                  treatments."
                                </p>
                                <p>
                                  I utilize a broad spectrum of information
                                  sources including academic journals,
                                  professional networks, and pharmaceutical
                                  representatives. That's the only way to stay
                                  current. Information silos don't serve
                                  patients well.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              "I utilize a broad spectrum of information sources including academic journals, professional networks, and pharmaceutical representatives. That's the only way to stay current."
                            )}
                          </div>
                        )}
                      </div>

                      {/* Segments */}
                      {selectedSegments.size > 0 && (
                        <div className="pt-2 border-t border-neutral-200">
                          <div className="flex flex-wrap gap-1.5">
                            {['US', 'Oncologist', 'Private Practice'].map(
                              (segment) =>
                                selectedSegments.has(segment) && (
                                  <Badge
                                    key={segment}
                                    variant="secondary"
                                    className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                  >
                                    {segment}
                                  </Badge>
                                ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* US11 Group */}
                {shouldShowCard(['strong', 'moderate']) && (
                  <div
                    className={
                      groupByParticipant
                        ? 'border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/30 rounded-lg p-3 space-y-3 transition-colors'
                        : 'space-y-3'
                    }
                  >
                    {/* Evidence Card 8 */}
                    <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                          US11
                        </span>{' '}
                        mentions they "don't rely on any single channel but
                        instead draw from conferences, journals, colleagues, and
                        industry updates."
                      </p>

                      <div className="space-y-2">
                        {shouldShowQuote('strong') && (
                          <div
                            onClick={() => toggleQuote('8-1')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-emerald-500 pl-4"
                          >
                            {expandedQuotes.has('8-1') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "How would you characterize your
                                  approach to gathering clinical information?"
                                </p>
                                <p>
                                  I don't rely on any single channel but instead
                                  draw from conferences, journals, colleagues,
                                  and industry updates. Information comes from
                                  everywhere. My approach is to synthesize
                                  insights from multiple streams rather than
                                  putting all my eggs in one basket.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              "I don't rely on any single channel but instead draw from conferences, journals, colleagues, and industry updates. Information comes from everywhere."
                            )}
                          </div>
                        )}
                        {shouldShowQuote('moderate') && (
                          <div
                            onClick={() => toggleQuote('8-2')}
                            className="bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded text-sm text-neutral-600 leading-relaxed cursor-pointer transition-colors border-l-4 border-amber-500 pl-4"
                          >
                            {expandedQuotes.has('8-2') ? (
                              <div className="space-y-2">
                                <p className="text-neutral-500 italic text-xs">
                                  Moderator: "What have you learned about
                                  effective information gathering over your
                                  career?"
                                </p>
                                <p>
                                  The more diverse your information sources, the
                                  better equipped you are to make informed
                                  decisions. I've found that my best clinical
                                  judgments come when I've consulted widely and
                                  considered multiple viewpoints before acting.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert('Opening full transcript...')
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                                >
                                  View full transcript →
                                </button>
                              </div>
                            ) : (
                              'The more diverse your information sources, the better equipped you are to make informed decisions.'
                            )}
                          </div>
                        )}
                      </div>

                      {/* Segments */}
                      {selectedSegments.size > 0 && (
                        <div className="pt-2 border-t border-neutral-200">
                          <div className="flex flex-wrap gap-1.5">
                            {['UK', 'Oncologist', 'Academic'].map(
                              (segment) =>
                                selectedSegments.has(segment) && (
                                  <Badge
                                    key={segment}
                                    variant="secondary"
                                    className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                  >
                                    {segment}
                                  </Badge>
                                ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
