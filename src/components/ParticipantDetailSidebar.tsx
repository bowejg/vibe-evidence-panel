import { X } from 'lucide-react'

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

interface ParticipantDetailSidebarProps {
  isOpen: boolean
  onClose: () => void
  participant: Participant | null
}

export function ParticipantDetailSidebar({
  isOpen,
  onClose,
  participant,
}: ParticipantDetailSidebarProps) {
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
        <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider truncate">
          Participant Details
        </span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-neutral-100 rounded-md transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-8 py-8">
        {participant ? (
          <div className="space-y-8">
            {/* Participant Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 18h10v-1H7v1zM17 14H7v-1h10v1zm0-4H7V9h10v1zm2-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V6h14v14z" />
                  </svg>
                </div>
                <div>
                  <div className="text-base font-semibold text-neutral-900">
                    {participant.fileName}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {participant.participant}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm mb-4">
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
                <span className="text-neutral-600">{participant.date}</span>
              </div>

              {/* View Transcript Button */}
              <button
                onClick={() => {
                  // TODO: Implement transcript view
                  console.log('View transcript for:', participant.participant)
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-200 bg-white shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all"
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Full Transcript
              </button>
            </div>

            {/* When I... */}
            <div>
              <div className="flex items-center gap-2 mb-3">
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
                <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  When I...
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {participant.whenContext}
                {participant.whenContextCitations.map((citation, idx) => (
                  <sup
                    key={idx}
                    className="ml-0.5 text-xs text-blue-600 font-medium"
                  >
                    [{citation}]
                  </sup>
                ))}
              </p>
            </div>

            {/* I want to... */}
            <div>
              <div className="flex items-center gap-2 mb-3">
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
                <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  I want to...
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {participant.wantTo}
                {participant.wantToCitations.map((citation, idx) => (
                  <sup
                    key={idx}
                    className="ml-0.5 text-xs text-blue-600 font-medium"
                  >
                    [{citation}]
                  </sup>
                ))}
              </p>
            </div>

            {/* So that... */}
            <div>
              <div className="flex items-center gap-2 mb-3">
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
                <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  So that...
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {participant.soThat}
                {participant.soThatCitations.map((citation, idx) => (
                  <sup
                    key={idx}
                    className="ml-0.5 text-xs text-blue-600 font-medium"
                  >
                    [{citation}]
                  </sup>
                ))}
              </p>
            </div>

            {/* Current Solution */}
            <div>
              <div className="flex items-center gap-2 mb-3">
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
                <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Current Solution
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {participant.currentSolution}
                {participant.currentSolutionCitations.map((citation, idx) => (
                  <sup
                    key={idx}
                    className="ml-0.5 text-xs text-blue-600 font-medium"
                  >
                    [{citation}]
                  </sup>
                ))}
              </p>
            </div>

            {/* Pain Points */}
            <div>
              <div className="flex items-center gap-2 mb-3">
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
                <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Pain Points
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {participant.painPoints}
                {participant.painPointsCitations.map((citation, idx) => (
                  <sup
                    key={idx}
                    className="ml-0.5 text-xs text-blue-600 font-medium"
                  >
                    [{citation}]
                  </sup>
                ))}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
            Select a participant to view details
          </div>
        )}
      </div>
    </div>
  )
}
