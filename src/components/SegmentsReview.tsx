import { useState } from 'react'
import { X } from 'lucide-react'

interface Participant {
  id: number
  name: string
  role: 'Participant' | 'Researcher' | 'Moderator'
  segment?: string
  relatedFile: string
}

interface SegmentsReviewProps {
  isOpen: boolean
  onClose: () => void
}

export function SegmentsReview({ isOpen, onClose }: SegmentsReviewProps) {
  const [activeTab, setActiveTab] = useState<'files' | 'segments'>('segments')
  const [searchQuery, setSearchQuery] = useState('')

  const participants: Participant[] = [
    {
      id: 1,
      name: 'US_Onc4',
      role: 'Participant',
      segment: 'Oncologist',
      relatedFile: 'US_onc_4_23jan-1773394171.docx',
    },
    {
      id: 2,
      name: 'US_Neuro1',
      role: 'Participant',
      segment: 'Neurologist',
      relatedFile: 'US_neuro_1_24jan-1773394181.docx',
    },
    {
      id: 3,
      name: 'US_Onc7',
      role: 'Participant',
      segment: 'Oncologist',
      relatedFile: 'US_onc_7_25jan-1773394168.docx',
    },
    {
      id: 4,
      name: 'US_Neuro3',
      role: 'Participant',
      segment: 'Neurologist',
      relatedFile: 'US_neuro_3_26jan-1773394177.docx',
    },
    {
      id: 5,
      name: 'US_Onc2',
      role: 'Participant',
      segment: 'Oncologist',
      relatedFile: 'US_onc_2_27jan-1773394172.docx',
    },
    {
      id: 6,
      name: 'US_Neuro5',
      role: 'Participant',
      segment: 'Neurologist',
      relatedFile: 'US_neuro_5_28jan-1773394180.docx',
    },
    {
      id: 7,
      name: 'Moderator_Smith',
      role: 'Moderator',
      relatedFile: 'moderator-notes-1773394174.docx',
    },
    {
      id: 8,
      name: 'Researcher_Jones',
      role: 'Researcher',
      relatedFile: 'research-notes-1773394183.docx',
    },
  ]

  const filteredParticipants = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.segment?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-neutral-200/60 bg-white">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              Review Segments & Participants
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-8 flex items-center gap-6 border-b border-neutral-200/60">
          <button
            onClick={() => setActiveTab('files')}
            className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'files'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Files (17)
          </button>
          <button
            onClick={() => setActiveTab('segments')}
            className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'segments'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Segments & Participants (20)
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-8 py-4 border-b border-neutral-200/60 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search speakers..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              + Import files
            </button>
          </div>
        </div>
      </div>

      {/* Content - Table */}
      <div className="flex-1 overflow-auto bg-neutral-50/30">
        <div className="px-8 py-6">
          <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200/60 bg-neutral-50/50">
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-neutral-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Related files
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-2">
                      <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-neutral-200 bg-white text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                          />
                        </svg>
                        Filter
                      </button>
                      <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-neutral-200 bg-white text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                        Segments
                        <svg
                          className="w-3 h-3"
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
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredParticipants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="group hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-neutral-300"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                      {participant.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                          participant.role === 'Participant'
                            ? 'bg-teal-50 text-teal-600'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        {participant.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {participant.relatedFile}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {participant.segment ? (
                        <button className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium hover:bg-neutral-200 transition-colors">
                          {participant.segment}
                        </button>
                      ) : (
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-dashed border-neutral-300 text-neutral-500 text-xs font-medium hover:bg-neutral-50 hover:border-neutral-400 hover:text-neutral-700 transition-all">
                          <svg
                            className="w-3 h-3"
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
                          Add segment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200/60 bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Confirm Segments
          </button>
        </div>
      </div>
    </div>
  )
}
