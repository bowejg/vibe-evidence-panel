import { X } from 'lucide-react'

type Participant = {
  id: number
  fileName: string
  participant: string
  segment: string
  date: string
  diagnosis: string
  diagnosisCitations: number[]
  unmetNeeds: string
  unmetNeedsCitations: number[]
  rating: number
  ratingReason: string
  ratingReasonCitations: number[]
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
                    participant.segment === 'Oncologist'
                      ? 'bg-purple-50/50 text-purple-500'
                      : 'bg-blue-50/50 text-blue-500'
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

            {/* Diagnosis */}
            <div>
              <div className="flex items-center gap-2 mb-3">
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
                <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Diagnosis
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {participant.diagnosis}
                {participant.diagnosisCitations.map((citation, idx) => (
                  <sup
                    key={idx}
                    className="ml-0.5 text-xs text-blue-600 font-medium"
                  >
                    [{citation}]
                  </sup>
                ))}
              </p>
            </div>

            {/* Unmet Needs */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-4 h-4 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Unmet Needs
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {participant.unmetNeeds}
                {participant.unmetNeedsCitations.map((citation, idx) => (
                  <sup
                    key={idx}
                    className="ml-0.5 text-xs text-blue-600 font-medium"
                  >
                    [{citation}]
                  </sup>
                ))}
              </p>
            </div>

            {/* Rating */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-4 h-4 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Rating
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-neutral-900">
                  {participant.rating}
                </span>
                <span className="text-sm text-neutral-500">/ 10</span>
              </div>
            </div>

            {/* Rating Reason */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-4 h-4 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Reason for Rating
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {participant.ratingReason}
                {participant.ratingReasonCitations.map((citation, idx) => (
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
