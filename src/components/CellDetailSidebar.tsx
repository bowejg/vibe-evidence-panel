import { X, ExternalLink } from 'lucide-react'

interface Quote {
  text: string
  highlightStart: number
  highlightEnd: number
  confidence: 'high' | 'medium' | 'low'
}

interface CellDetailSidebarProps {
  isOpen: boolean
  onClose: () => void
  participantName?: string
  columnTitle?: string
  cellContent?: string
  quotes?: Quote[]
}

const MOCK_QUOTES: Quote[] = [
  {
    text: "Moderator: Can you walk me through what you saw when this patient first came to your clinic? What were the initial presenting symptoms?\n\nParticipant: Yeah, so this was actually a pretty typical case in retrospect, but at the time it wasn't immediately obvious. The patient came in complaining about falls - which, you know, in elderly patients can be from a million different things. But what was interesting was the pattern. They weren't just tripping over things, they were having these unexplained backward falls. And the family mentioned something about difficulty reading, like the patient couldn't look down at a book properly. That's when I started thinking, okay, this might be something neurological. When I did the exam and saw the vertical gaze palsy, the classic PSP signs, it kind of clicked. But honestly, by that point they'd already been dealing with symptoms for probably 18 months or so. The family said there were behavioral changes too, some executive dysfunction stuff that they'd just attributed to aging initially.",
    highlightStart: 445,
    highlightEnd: 670,
    confidence: 'high',
  },
  {
    text: "Moderator: You mentioned the diagnosis took a while. Can you talk about that delay and what contributed to it?\n\nParticipant: Oh absolutely, and this is something we see way too often. The problem is that early PSP symptoms are really non-specific, right? Falls, some cognitive changes, maybe some mood stuff - primary care docs see this all the time and it's usually something else. So this patient bounced around for over a year before they got to me. The family had taken them to their GP multiple times, they'd been told it was probably just normal aging, maybe early dementia. One doctor even thought it might be depression because of the flat affect. It's frustrating because if you know what to look for - the postural instability, the problems with downward gaze, that kind of axial rigidity - it's pretty distinctive. But most docs just don't see enough of these cases to recognize it early.",
    highlightStart: 320,
    highlightEnd: 530,
    confidence: 'high',
  },
  {
    text: "Moderator: What about the family's perspective? How were they coping with everything before the diagnosis?\n\nParticipant: The family was really struggling, honestly. They knew something was wrong but nobody could tell them what it was, and that uncertainty is really hard. The spouse mentioned that the patient was becoming more withdrawn, having trouble with decision-making, like even simple stuff like what to have for dinner or whether to answer the phone. And of course there was the constant anxiety about the falls. By the time we got the diagnosis, I think they were almost relieved just to have an answer, even though obviously PSP is not good news. But at least they could start planning, you know, getting the right support systems in place.",
    highlightStart: 200,
    highlightEnd: 475,
    confidence: 'medium',
  },
]

export function CellDetailSidebar({
  isOpen,
  onClose,
  participantName = 'US_Onc4',
  columnTitle = 'Diagnosis and journey',
  cellContent = 'Patient presented with early stage diagnosis showing classic PSP-Richardson syndrome features including postural instability and vertical gaze palsy. Initial symptoms emerged approximately 18 months prior with unexplained falls and difficulty with downward gaze during reading. Family noticed behavioral changes and executive dysfunction that preceded motor symptoms by several months.',
  quotes = MOCK_QUOTES,
}: CellDetailSidebarProps) {
  const confidenceColors = {
    high: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-orange-100 text-orange-700',
  }

  return (
    <div
      className={`bg-white border-l border-neutral-200/60 flex flex-col flex-shrink-0 h-full overflow-hidden transition-all duration-300 ease-out ${
        isOpen ? 'w-[576px] opacity-100' : 'w-0 opacity-0 border-l-0'
      }`}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-8 border-b border-neutral-200/60 bg-neutral-50/50"
        style={{ height: '44px' }}
      >
        <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider truncate">
          {participantName} · {columnTitle}
        </span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-neutral-100 rounded-md transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-8 py-8 space-y-8">
        {/* Cell Content */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-neutral-900">Summary</h3>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {cellContent}
          </p>
        </div>

        {/* Quotations */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-neutral-900">
            Related Quotations ({quotes.length})
          </h3>
          <div className="space-y-3">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      confidenceColors[quote.confidence]
                    }`}
                  >
                    {quote.confidence} confidence
                  </span>
                  <button className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-700 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open
                  </button>
                </div>
                <div className="text-sm leading-relaxed space-y-4">
                  {(() => {
                    const before = quote.text.substring(0, quote.highlightStart)
                    const highlighted = quote.text.substring(
                      quote.highlightStart,
                      quote.highlightEnd,
                    )
                    const after = quote.text.substring(quote.highlightEnd)

                    return (
                      <>
                        {before.split('\n\n').map((para, i) => {
                          const isMod = para.startsWith('Moderator:')
                          const isPart = para.startsWith('Participant:')
                          return (
                            <div key={`before-${i}`} className="space-y-1.5">
                              {isMod && (
                                <p className="font-semibold text-neutral-500 text-xs uppercase tracking-wide">
                                  Moderator
                                </p>
                              )}
                              {isPart && (
                                <p className="font-semibold text-neutral-900 text-xs uppercase tracking-wide">
                                  Participant
                                </p>
                              )}
                              <p
                                className={
                                  isMod
                                    ? 'text-neutral-600'
                                    : 'text-neutral-700'
                                }
                              >
                                {para.replace(
                                  /^(Moderator|Participant):\s*/,
                                  '',
                                )}
                              </p>
                            </div>
                          )
                        })}
                        <div className="space-y-1.5">
                          <p className="text-neutral-700">
                            <mark className="bg-yellow-200 text-neutral-900">
                              {highlighted}
                            </mark>
                          </p>
                        </div>
                        {after.split('\n\n').map((para, i) => {
                          const isMod = para.startsWith('Moderator:')
                          const isPart = para.startsWith('Participant:')
                          if (!para.trim()) return null
                          return (
                            <div key={`after-${i}`} className="space-y-1.5">
                              {isMod && (
                                <p className="font-semibold text-neutral-500 text-xs uppercase tracking-wide">
                                  Moderator
                                </p>
                              )}
                              {isPart && (
                                <p className="font-semibold text-neutral-900 text-xs uppercase tracking-wide">
                                  Participant
                                </p>
                              )}
                              <p
                                className={
                                  isMod
                                    ? 'text-neutral-600'
                                    : 'text-neutral-700'
                                }
                              >
                                {para.replace(
                                  /^(Moderator|Participant):\s*/,
                                  '',
                                )}
                              </p>
                            </div>
                          )
                        })}
                      </>
                    )
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-neutral-100 px-8 py-6">
        {/* Empty for now */}
      </div>
    </div>
  )
}
