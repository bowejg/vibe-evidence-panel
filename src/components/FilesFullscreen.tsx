import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

interface Interview {
  id: number
  fileName: string
  participantCount: number
  language: string
  segments: {
    confirmed: string[]
    suggested: string[]
  }
}

interface FilesFullscreenProps {
  isOpen: boolean
  onClose: () => void
  interviews: Interview[]
  processingFiles?: number[]
  processedFiles?: number[]
  fileParticipants?: Record<number, string>
}

export function FilesFullscreen({
  isOpen,
  onClose,
  interviews,
  processingFiles = [],
  processedFiles = [],
  fileParticipants = {},
}: FilesFullscreenProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId !== null) {
        setOpenMenuId(null)
      }
    }

    if (openMenuId !== null) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openMenuId])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-neutral-200/60 bg-white">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              Uploaded Files
            </h2>
            <span className="text-sm text-neutral-500">
              {interviews.length} files
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-neutral-50/30">
        <div className="px-8 py-6">
          <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200/60 bg-neutral-50/50">
                  <th className="px-6 py-3 text-left">
                    <Checkbox />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Segments
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-12 px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {interviews.map((interview) => (
                  <tr
                    key={interview.id}
                    className="group hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                      {interview.fileName}
                    </td>
                    <td className="px-6 py-4">
                      {processedFiles.includes(interview.id) ? (
                        <span className="text-sm text-neutral-700">
                          {fileParticipants[interview.id]}
                        </span>
                      ) : (
                        <select className="text-sm text-neutral-700 bg-white border border-neutral-200 rounded-lg px-3 py-1.5 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3cpath%20fill%3D%22%239ca3af%22%20d%3D%22M4.427%205.927l3.396%203.396a.25.25%200%200%200%20.354%200l3.396-3.396A.25.25%200%200%200%2011.396%205.5H4.604a.25.25%200%200%200-.177.427z%22%2F%3E%3c%2Fsvg%3E')] bg-[length:16px_16px] bg-[center_right_0.5rem] bg-no-repeat pr-8">
                          <option value="1">1</option>
                          <option value="2" selected>
                            2
                          </option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5+</option>
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {processedFiles.includes(interview.id) ? (
                        <span className="text-sm text-neutral-700">en-US</span>
                      ) : (
                        <select className="text-sm text-neutral-700 bg-white border border-neutral-200 rounded-lg px-2 py-1.5 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3cpath%20fill%3D%22%239ca3af%22%20d%3D%22M4.427%205.927l3.396%203.396a.25.25%200%200%200%20.354%200l3.396-3.396A.25.25%200%200%200%2011.396%205.5H4.604a.25.25%200%200%200-.177.427z%22%2F%3E%3c%2Fsvg%3E')] bg-[length:16px_16px] bg-[center_right_0.5rem] bg-no-repeat pr-7">
                          <option value="en-US" selected>
                            en-US
                          </option>
                          <option value="en-GB">en-GB</option>
                          <option value="es-ES">es-ES</option>
                          <option value="fr-FR">fr-FR</option>
                          <option value="de-DE">de-DE</option>
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {/* Confirmed segments */}
                        {interview.segments.confirmed.map((segment, idx) => (
                          <span
                            key={`confirmed-${idx}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium"
                          >
                            {segment}
                          </span>
                        ))}
                        {/* Suggested segments (only show if not processed) */}
                        {!processedFiles.includes(interview.id) &&
                          interview.segments.suggested.map((segment, idx) => (
                            <button
                              key={`suggested-${idx}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-dashed border-neutral-300 text-neutral-500 text-xs font-medium hover:bg-neutral-50 hover:border-neutral-400 hover:text-neutral-700 transition-all"
                            >
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
                              {segment}
                            </button>
                          ))}
                        {/* Add more button */}
                        <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-dashed border-neutral-300 text-neutral-500 text-xs font-medium hover:bg-neutral-50 hover:border-neutral-400 hover:text-neutral-700 transition-all">
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
                          Add more
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {processedFiles.includes(interview.id) ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Completed
                        </div>
                      ) : processingFiles.includes(interview.id) ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                          <svg
                            className="w-3.5 h-3.5 animate-spin"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          Processing
                        </div>
                      ) : (
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-colors shadow-sm">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Confirm
                        </button>
                      )}
                    </td>
                    <td className="w-12 px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenMenuId(
                              openMenuId === interview.id ? null : interview.id,
                            )
                          }}
                          className="p-1 hover:bg-neutral-100 rounded transition-colors"
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
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                        {openMenuId === interview.id && (
                          <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-10">
                            <button className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
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
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                              Rename
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
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
          <div className="text-sm text-neutral-600">
            {interviews.length} files uploaded
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
