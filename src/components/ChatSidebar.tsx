import { useState } from 'react'
import { X, Send, Sparkles, ChevronDown, ChevronRight } from 'lucide-react'

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  onCitationClick?: (citationNumber: string) => void
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  isTrace?: boolean
}

const SUGGESTED_PROMPTS = [
  'Show me all participants with a Product X rating above 7',
  'What are the common unmet needs across oncologists?',
  'Summarize the diagnosis patterns for neurologists',
  'Filter to only show participants who mentioned falls',
  'Compare oncologist vs neurologist responses',
]

export function ChatSidebar({
  isOpen,
  onClose,
  onCitationClick,
}: ChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [expandedTraces, setExpandedTraces] = useState<Set<number>>(new Set())

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage = input
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setInput('')

    // Simulate AI response with agentic trace for specific prompt
    if (userMessage === 'What are the common unmet needs across oncologists?') {
      // Show agentic trace
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            isTrace: true,
            content: `🔍 Filtering column to "Unmet Needs"||🏷️ Filtering segment to "Oncologist"||💡 Identifying themes across 4 participants||✨ Synthesizing results...`,
          },
        ])
      }, 500)

      // Show final results
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Here are the common unmet needs across oncologists:

**Earlier Screening & Diagnosis (4)**
Primary care physicians often miss early PSP symptoms, leading to delayed specialist referrals by 12-15 months. Better screening methods and educational materials are needed to distinguish PSP from normal aging and other neurodegenerative conditions.
[1][3][5][7][9]

**Treatment Options for Symptom Management (3)**
Current treatments show limited efficacy in managing gait instability, falls prevention, and dysphagia. More robust intervention programs including specialized physical therapy and swallowing assessment protocols are critically needed.
[4][5][6][7]

**Enhanced Palliative & Caregiver Support (3)**
Palliative care should be integrated earlier in disease trajectory rather than waiting until end-stage. More accessible respite care options and culturally appropriate patient education resources are essential as disease burden increases significantly within first 2 years.
[3][5][7][8][11]

**Improved Access to Specialist Care (2)**
Patients in underserved geographic areas face 6+ month wait times for movement disorder appointments. Telemedicine options for routine follow-up visits could reduce travel burden for patients with significant mobility limitations.
[1][4][6][9][11]`,
          },
        ])
      }, 2500)
    } else {
      // Default response for other prompts
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "I understand you'd like to analyze the data. This is a prototype, so AI responses aren't implemented yet. But I'll help you filter, summarize, and explore your interview data once connected!",
          },
        ])
      }, 500)
    }
  }

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div
      className={`bg-white border-r border-neutral-200/60 flex flex-col flex-shrink-0 h-full overflow-hidden transition-all duration-300 ease-out ${
        isOpen ? 'w-[576px] opacity-100' : 'w-0 opacity-0 border-r-0'
      }`}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-8 border-b border-neutral-200/60 bg-neutral-50/50"
        style={{ height: '44px' }}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            AI Assistant
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <X className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center">
            <div className="space-y-10">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-base font-medium text-neutral-900">
                  Ask me anything about your data
                </h3>
                <p className="text-sm text-neutral-500 max-w-sm mx-auto">
                  I can help you filter, analyze, and explore insights from your
                  interview participants
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-2">
                  Suggested prompts
                </p>
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="w-full text-left px-4 py-3 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all text-sm text-neutral-700 leading-relaxed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.isTrace ? (
                  // Trace message with collapsible steps
                  <div className="max-w-[85%]">
                    <button
                      onClick={() => {
                        setExpandedTraces((prev) => {
                          const newSet = new Set(prev)
                          if (newSet.has(index)) {
                            newSet.delete(index)
                          } else {
                            newSet.add(index)
                          }
                          return newSet
                        })
                      }}
                      className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                      {expandedTraces.has(index) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <span>show working</span>
                    </button>
                    {expandedTraces.has(index) && (
                      <div className="mt-3 ml-6 space-y-3 relative">
                        {/* Vertical line */}
                        <div className="absolute left-0 top-2 bottom-2 w-px bg-neutral-200" />
                        {message.content.split('||').map((step, i) => (
                          <div key={i} className="relative pl-6">
                            {/* Dot */}
                            <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-purple-400" />
                            <p className="text-sm text-neutral-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular message
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content.split('\n').map((line, i) => {
                        // Bold text with citations
                        if (line.includes('**')) {
                          const parts = line.split('**')
                          return (
                            <p key={i} className={i > 0 ? 'mt-3' : ''}>
                              {parts.map((part, j) =>
                                j % 2 === 1 ? (
                                  <strong key={j} className="font-semibold">
                                    {part}
                                  </strong>
                                ) : (
                                  part
                                ),
                              )}
                            </p>
                          )
                        }
                        // Citations
                        if (line.match(/\[\d+\]/)) {
                          const citationRegex = /\[(\d+)\]/g
                          const parts = line.split(citationRegex)
                          return (
                            <p key={i} className={i > 0 ? 'mt-1' : ''}>
                              {parts.map((part, j) => {
                                if (j % 2 === 1) {
                                  // This is a citation number
                                  return (
                                    <button
                                      key={j}
                                      onClick={() => onCitationClick?.(part)}
                                      className="text-blue-600 hover:text-blue-700 hover:underline"
                                    >
                                      [{part}]
                                    </button>
                                  )
                                }
                                return part
                              })}
                            </p>
                          )
                        }
                        // Empty lines
                        if (line.trim() === '') {
                          return <br key={i} />
                        }
                        // Regular text
                        return (
                          <p key={i} className={i > 0 ? 'mt-1' : ''}>
                            {line}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-neutral-100 px-6 py-4">
        <div className="flex items-start gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Ask a question about your data..."
            rows={1}
            className="flex-1 px-3.5 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-300 resize-none transition-all min-h-[40px]"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:bg-neutral-200 disabled:text-neutral-400 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  )
}
