import { useState, useRef, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SegmentsReview } from './SegmentsReview'
import { FilesFullscreen } from './FilesFullscreen'
import { toast } from 'sonner'

export function StudySetup() {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllSegments, setShowAllSegments] = useState(false)
  const [showAllKeywords, setShowAllKeywords] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSegmentsReviewOpen, setIsSegmentsReviewOpen] = useState(false)
  const [isFilesFullscreenOpen, setIsFilesFullscreenOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'files' | 'participants'>('files')
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [processingFiles, setProcessingFiles] = useState<number[]>([])
  const [processedFiles, setProcessedFiles] = useState<number[]>([])
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Map of file IDs to participant names
  const fileParticipants: Record<number, string> = {
    1: 'US_Onc4, Moderator',
    2: 'US_Neuro1, Moderator',
    3: 'US_Onc7, Moderator',
    4: 'US_Neuro3, Moderator',
    5: 'US_Onc2, Moderator',
    6: 'US_Neuro5, Moderator',
    7: 'US_Ger1, Moderator',
    8: 'US_MDS3, Moderator',
    9: 'US_Onc9, Moderator',
    10: 'US_Neuro8, Moderator',
    11: 'US_MDS7, Moderator',
    12: 'US_Ger4, Moderator',
    13: 'US_Onc12, Moderator',
    14: 'US_Neuro11, Moderator',
    15: 'US_Psy2, Moderator',
  }

  const description =
    'This qualitative research project engages leading U.S. neurologists and movement disorder specialists to explore the current diagnosis, management, and unmet needs in progressive supranuclear palsy (PSP)...'

  const allSegments = [
    'Neurologist',
    'Movement disorder Specialist',
    'Geriatrician',
    'Psychiatrist',
  ]
  const allKeywords = [
    'Tauopathy',
    'PSP',
    'TAU Pos',
    'PSP-P',
    'CBD-CBS',
    '4R-Tau',
    'Parkinsonism',
  ]

  const displayedSegments = showAllSegments
    ? allSegments
    : allSegments.slice(0, 2)
  const displayedKeywords = showAllKeywords
    ? allKeywords
    : allKeywords.slice(0, 5)

  const fileTypes = [
    { name: 'MP3', icon: '🎵' },
    { name: 'MP4', icon: '🎬' },
    { name: 'PDF', icon: '📄' },
    { name: 'DOC', icon: '📝' },
    { name: 'TXT', icon: '📃' },
    { name: 'OTHER', icon: '📎' },
  ]

  // Sample uploaded files data - preprocessing state
  const uploadedInterviews = [
    {
      id: 1,
      fileName: 'US_onc_4_23jan.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Oncologist'],
        suggested: ['Movement disorder Specialist'],
      },
    },
    {
      id: 2,
      fileName: 'US_neuro_1_24jan.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Neurologist'],
        suggested: ['Movement disorder Specialist'],
      },
    },
    {
      id: 3,
      fileName: 'US_onc_7_25jan.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Oncologist'],
        suggested: ['Geriatrician'],
      },
    },
    {
      id: 4,
      fileName: 'US_neuro_3_26jan.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Neurologist'],
        suggested: [],
      },
    },
    {
      id: 5,
      fileName: 'US_onc_2_27jan.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Oncologist'],
        suggested: ['Psychiatrist'],
      },
    },
    {
      id: 6,
      fileName: 'US_neuro_5_28jan.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Neurologist'],
        suggested: ['Movement disorder Specialist'],
      },
    },
    {
      id: 7,
      fileName: 'US_ger_1_29jan.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Geriatrician'],
        suggested: ['Psychiatrist'],
      },
    },
    {
      id: 8,
      fileName: 'US_mds_3_30jan.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Movement disorder Specialist'],
        suggested: ['Neurologist'],
      },
    },
    {
      id: 9,
      fileName: 'US_onc_9_31jan.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Oncologist'],
        suggested: [],
      },
    },
    {
      id: 10,
      fileName: 'US_neuro_8_01feb.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Neurologist'],
        suggested: ['Geriatrician'],
      },
    },
    {
      id: 11,
      fileName: 'US_mds_7_02feb.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Movement disorder Specialist'],
        suggested: [],
      },
    },
    {
      id: 12,
      fileName: 'US_ger_4_03feb.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Geriatrician'],
        suggested: ['Psychiatrist'],
      },
    },
    {
      id: 13,
      fileName: 'US_onc_12_04feb.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Oncologist'],
        suggested: ['Movement disorder Specialist'],
      },
    },
    {
      id: 14,
      fileName: 'US_neuro_11_05feb.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Neurologist'],
        suggested: [],
      },
    },
    {
      id: 15,
      fileName: 'US_psy_2_06feb.mp3',
      participantCount: 2,
      language: 'English (US)',
      segments: {
        confirmed: ['Psychiatrist'],
        suggested: ['Neurologist'],
      },
    },
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)])
    }
  }

  const handleAddFilesClick = () => {
    fileInputRef.current?.click()
  }

  // Process files with random delay (2-4 seconds) in parallel
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    processingFiles.forEach((fileId) => {
      // Skip if already processed
      if (processedFiles.includes(fileId)) return

      // Random delay between 2-4 seconds for each file (parallel processing)
      const delay = Math.random() * 2000 + 2000

      const timer = setTimeout(() => {
        setProcessedFiles((prev) => [...prev, fileId])
        setProcessingFiles((prev) => prev.filter((id) => id !== fileId))
      }, delay)

      timers.push(timer)
    })

    // Cleanup timers on unmount or when dependencies change
    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [processingFiles, processedFiles])

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

  const handleSelectAll = () => {
    if (selectedFiles.length === uploadedInterviews.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(uploadedInterviews.map((interview) => interview.id))
    }
  }

  const handleToggleFile = (id: number) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter((fileId) => fileId !== id))
    } else {
      setSelectedFiles([...selectedFiles, id])
    }
  }

  const isAllSelected = selectedFiles.length === uploadedInterviews.length
  const isSomeSelected = selectedFiles.length > 0

  const handleConfirmSelected = () => {
    const fileCount = selectedFiles.length

    // Move selected files to processing state
    setProcessingFiles([...processingFiles, ...selectedFiles])

    // Clear selection
    setSelectedFiles([])

    // Show toast with reminder option
    toast.success(`Processing ${fileCount} file${fileCount > 1 ? 's' : ''}`, {
      description: 'Your files are being transcribed and processed.',
      action: {
        label: 'Remind me',
        onClick: () => {
          toast.info('Reminder set', {
            description: "We'll notify you when processing is complete.",
          })
        },
      },
      duration: 5000,
    })
  }

  return (
    <div className="max-w-[1800px] mx-auto px-12 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left/Main Column (3/4 width) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Project Header */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-8 space-y-5 hover:shadow-md transition-shadow duration-200">
            <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
              BZZB080 PSP Assessment
            </h1>

            <div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {showFullDescription ? description + ' see more' : description}
                {!showFullDescription && (
                  <button
                    onClick={() => setShowFullDescription(true)}
                    className="text-neutral-900 hover:text-neutral-700 ml-1 font-medium transition-colors"
                  >
                    see more
                  </button>
                )}
              </p>
            </div>

            {/* Segments */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                  Segments
                </span>
                <div className="flex gap-2 flex-wrap">
                  {displayedSegments.map((segment) => (
                    <span
                      key={segment}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium hover:bg-neutral-200 transition-colors cursor-default"
                    >
                      {segment}
                    </span>
                  ))}
                  {!showAllSegments && allSegments.length > 2 && (
                    <button
                      onClick={() => setShowAllSegments(true)}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-600 text-xs font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-all"
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                  Keywords
                </span>
                <div className="flex gap-2 flex-wrap">
                  {displayedKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium hover:bg-neutral-200 transition-colors cursor-default"
                    >
                      {keyword}
                    </span>
                  ))}
                  {!showAllKeywords && allKeywords.length > 5 && (
                    <button
                      onClick={() => setShowAllKeywords(true)}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-600 text-xs font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-all"
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-4" />
          </div>

          {/* Uploaded Files Table */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="px-8 pt-8 pb-6 border-b border-neutral-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
                    Research Material
                  </h3>
                  <span className="text-base text-neutral-500">
                    ({uploadedInterviews.length})
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                Review and confirm the details for each file below. Verify the
                number of participants and language settings are correct before
                processing.
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="inline-flex items-center bg-neutral-50 rounded-md border border-neutral-200 p-0.5">
                    <button
                      onClick={() => setViewMode('files')}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                        viewMode === 'files'
                          ? 'bg-white text-neutral-900 shadow-sm'
                          : 'text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      By File
                    </button>
                    <button
                      onClick={() => setViewMode('participants')}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                        viewMode === 'participants'
                          ? 'bg-white text-neutral-900 shadow-sm'
                          : 'text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      By Participant
                    </button>
                  </div>
                </div>

                {/* Select All Info or Bulk Action Buttons */}
                {isSomeSelected ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-600">
                      {selectedFiles.length} selected
                    </span>
                    <div className="flex items-center gap-2">
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
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Bulk Edit
                      </button>
                      <button
                        onClick={handleConfirmSelected}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"
                      >
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
                        Confirm Selected
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    {/* Filter */}
                    <button
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Filter"
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
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                    </button>

                    {/* Sort */}
                    <button
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Sort"
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
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>

                    {/* Automations */}
                    <button
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Automations"
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </button>

                    {/* Search */}
                    <button
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Search"
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
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>

                    {/* Fullscreen */}
                    <button
                      onClick={() => setIsFilesFullscreenOpen(true)}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Fullscreen"
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
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </button>

                    {/* Settings */}
                    <button
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Settings"
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
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                    </button>

                    {/* Separator */}
                    <div className="w-px h-6 bg-neutral-200 mx-1" />

                    {/* Add File */}
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-colors">
                      <svg
                        className="w-3.5 h-3.5"
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
                      Add File
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Files View */}
            {viewMode === 'files' && (
              <>
                <div className="px-8 pt-3">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="border-b border-neutral-100">
                        <th className="w-12 pb-3 text-left">
                          <Checkbox
                            checked={isAllSelected}
                            onCheckedChange={handleSelectAll}
                          />
                        </th>
                        <th className="w-[18%] pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                          File Name
                        </th>
                        <th className="w-[10%] pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                          Participants
                        </th>
                        <th className="w-[10%] pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                          Language
                        </th>
                        <th className="w-[42%] pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                          Segments
                        </th>
                        <th className="pb-3 text-right pr-4 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="w-12 pb-3"></th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="px-8 pb-6 max-h-[480px] overflow-y-auto">
                  <table className="w-full table-fixed">
                    <tbody className="divide-y divide-neutral-50">
                      {uploadedInterviews.map((interview, index) => (
                        <tr
                          key={interview.id}
                          className="group hover:bg-neutral-50/50 transition-colors duration-150"
                        >
                          <td className="w-12 py-4">
                            <Checkbox
                              checked={selectedFiles.includes(interview.id)}
                              onCheckedChange={() =>
                                handleToggleFile(interview.id)
                              }
                              className="opacity-60 group-hover:opacity-100 transition-opacity"
                            />
                          </td>
                          <td className="w-[18%] py-4 pr-6 text-sm font-medium text-neutral-900">
                            {interview.fileName}
                          </td>
                          <td className="w-[10%] py-4 pr-4">
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
                          <td className="w-[10%] py-4 pr-6">
                            {processedFiles.includes(interview.id) ? (
                              <span className="text-sm text-neutral-700">
                                en-US
                              </span>
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
                          <td className="w-[42%] py-4 pr-6">
                            <div className="flex flex-wrap gap-2">
                              {/* Confirmed segments */}
                              {interview.segments.confirmed.map(
                                (segment, idx) => (
                                  <span
                                    key={`confirmed-${idx}`}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium"
                                  >
                                    {segment}
                                  </span>
                                ),
                              )}
                              {/* Suggested segments (only show if not processed) */}
                              {!processedFiles.includes(interview.id) &&
                                interview.segments.suggested.map(
                                  (segment, idx) => (
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
                                  ),
                                )}
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
                          <td className="py-4 text-right pr-4">
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
                          <td className="w-12 py-4 pr-4">
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setOpenMenuId(
                                    openMenuId === interview.id
                                      ? null
                                      : interview.id,
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
              </>
            )}

            {/* Participants View */}
            {viewMode === 'participants' && (
              <>
                <div className="px-8 pt-3">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="border-b border-neutral-100">
                        <th className="w-12 pb-3 text-left">
                          <Checkbox
                            checked={isAllSelected}
                            onCheckedChange={handleSelectAll}
                          />
                        </th>
                        <th className="w-[30%] pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                          Participant Name
                        </th>
                        <th className="w-[20%] pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                          Related Files
                        </th>
                        <th className="w-[18%] pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                          Role
                        </th>
                        <th className="pb-3 text-right pr-4 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                          Segment
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="px-8 pb-6 max-h-[480px] overflow-y-auto">
                  <table className="w-full table-fixed">
                    <tbody className="divide-y divide-neutral-50">
                      <tr className="group hover:bg-neutral-50/50 transition-colors duration-150">
                        <td className="w-12 py-4">
                          <Checkbox
                            checked={selectedFiles.includes(1)}
                            onCheckedChange={() => handleToggleFile(1)}
                            className="opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                        </td>
                        <td className="w-[30%] py-4 text-sm font-medium text-neutral-900">
                          US_Onc4
                        </td>
                        <td className="w-[20%] py-4 text-sm text-neutral-600">
                          US_onc_4_23jan.mp3
                        </td>
                        <td className="w-[18%] py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-medium">
                            Participant
                          </span>
                        </td>
                        <td className="py-4 text-right pr-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium">
                            Oncologist
                          </span>
                        </td>
                      </tr>
                      <tr className="group hover:bg-neutral-50/50 transition-colors duration-150">
                        <td className="w-12 py-4">
                          <Checkbox
                            checked={selectedFiles.includes(2)}
                            onCheckedChange={() => handleToggleFile(2)}
                            className="opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                        </td>
                        <td className="w-[30%] py-4 text-sm font-medium text-neutral-900">
                          US_Neuro1
                        </td>
                        <td className="w-[20%] py-4 text-sm text-neutral-600">
                          US_neuro_1_24jan.mp3
                        </td>
                        <td className="w-[18%] py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-medium">
                            Participant
                          </span>
                        </td>
                        <td className="py-4 text-right pr-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium">
                            Neurologist
                          </span>
                        </td>
                      </tr>
                      <tr className="group hover:bg-neutral-50/50 transition-colors duration-150">
                        <td className="w-12 py-4">
                          <Checkbox
                            checked={selectedFiles.includes(3)}
                            onCheckedChange={() => handleToggleFile(3)}
                            className="opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                        </td>
                        <td className="w-[30%] py-4 text-sm font-medium text-neutral-900">
                          US_Onc7
                        </td>
                        <td className="w-[20%] py-4 text-sm text-neutral-600">
                          US_onc_7_25jan.mp3
                        </td>
                        <td className="w-[18%] py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-medium">
                            Participant
                          </span>
                        </td>
                        <td className="py-4 text-right pr-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium">
                            Oncologist
                          </span>
                        </td>
                      </tr>
                      <tr className="group hover:bg-neutral-50/50 transition-colors duration-150">
                        <td className="w-12 py-4">
                          <Checkbox
                            checked={selectedFiles.includes(4)}
                            onCheckedChange={() => handleToggleFile(4)}
                            className="opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                        </td>
                        <td className="w-[30%] py-4 text-sm font-medium text-neutral-900">
                          US_Neuro3
                        </td>
                        <td className="w-[20%] py-4 text-sm text-neutral-600">
                          US_neuro_3_26jan.mp3
                        </td>
                        <td className="w-[18%] py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-medium">
                            Participant
                          </span>
                        </td>
                        <td className="py-4 text-right pr-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium">
                            Neurologist
                          </span>
                        </td>
                      </tr>
                      <tr className="group hover:bg-neutral-50/50 transition-colors duration-150">
                        <td className="w-12 py-4">
                          <Checkbox
                            checked={
                              selectedFiles.length === uploadedInterviews.length
                            }
                            onCheckedChange={handleSelectAll}
                            className="opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                        </td>
                        <td className="w-[30%] py-4 text-sm font-medium text-neutral-900">
                          Moderator
                        </td>
                        <td className="w-[20%] py-4 text-sm text-neutral-600">
                          15 files
                        </td>
                        <td className="w-[18%] py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                            Moderator
                          </span>
                        </td>
                        <td className="py-4 text-right pr-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium">
                            All
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar (1/3 width) */}
        <div className="space-y-5">
          {/* Context Options Card */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                  Get more accurate analysis?
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Add in as much of the context below to get deeper more
                  specific insights with higher accuracy results
                </p>
              </div>

              <div className="space-y-2">
                {/* Discussion Guide - Completed */}
                <div className="w-full p-3.5 rounded-lg bg-neutral-50/50 border border-transparent">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium text-sm text-neutral-900">
                        Discussion Guide
                      </div>
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm flex-shrink-0">
                        <svg
                          className="w-2.5 h-2.5 text-white"
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
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-red-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 18h10v-1H7v1zM17 14H7v-1h10v1zm0-4H7V9h10v1zm2-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V6h14v14z" />
                      </svg>
                      <span className="text-xs text-neutral-600">
                        PSP_Discussion_Guide.pdf
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        console.log('Add another discussion guide')
                      }
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      + Add another
                    </button>
                  </div>
                </div>

                {/* Segments - Needs Review */}
                <div className="w-full p-3.5 rounded-lg border border-transparent">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium text-sm text-neutral-900">
                        Segments
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-neutral-300 flex-shrink-0"></div>
                    </div>
                    <p className="text-xs text-neutral-600">
                      <span className="font-medium text-neutral-900">
                        4 segments
                      </span>{' '}
                      extracted from your discussion guide
                    </p>
                    <button
                      onClick={() => setIsSegmentsReviewOpen(true)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Review & Confirm →
                    </button>
                  </div>
                </div>

                {/* Keywords - Needs Review */}
                <div className="w-full p-3.5 rounded-lg border border-transparent">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium text-sm text-neutral-900">
                        Keywords
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-neutral-300 flex-shrink-0"></div>
                    </div>
                    <p className="text-xs text-neutral-600">
                      <span className="font-medium text-neutral-900">
                        7 keywords
                      </span>{' '}
                      extracted from your discussion guide. These will be used
                      to enhance transcription quality.
                    </p>
                    <button
                      onClick={() => console.log('Review keywords')}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Review & Confirm →
                    </button>
                  </div>
                </div>

                {/* Concepts - Needs Review */}
                <div className="w-full p-3.5 rounded-lg border border-transparent">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium text-sm text-neutral-900">
                        Concepts
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-neutral-300 flex-shrink-0"></div>
                    </div>
                    <p className="text-xs text-neutral-600">
                      <span className="font-medium text-neutral-900">
                        3 concepts
                      </span>{' '}
                      extracted from your discussion guide
                    </p>
                    <button
                      onClick={() => console.log('Review concepts')}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Review & Confirm →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Research Material Card */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                  Upload your research material
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Upload the research material you are analysing in this
                  project.
                </p>
              </div>
              <button
                onClick={handleAddFilesClick}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-150 shadow-sm"
              >
                + Add Files
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Segments Review Fullscreen */}
      <SegmentsReview
        isOpen={isSegmentsReviewOpen}
        onClose={() => setIsSegmentsReviewOpen(false)}
      />

      {/* Files Fullscreen */}
      <FilesFullscreen
        isOpen={isFilesFullscreenOpen}
        onClose={() => setIsFilesFullscreenOpen(false)}
        interviews={uploadedInterviews}
        processingFiles={processingFiles}
        processedFiles={processedFiles}
        fileParticipants={fileParticipants}
      />
    </div>
  )
}
