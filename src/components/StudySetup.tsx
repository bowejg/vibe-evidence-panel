import { useState, useRef } from 'react'
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

export function StudySetup() {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllSegments, setShowAllSegments] = useState(false)
  const [showAllKeywords, setShowAllKeywords] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  // Sample uploaded files data
  const uploadedInterviews = [
    {
      id: 1,
      fileName: 'US_onc_4_23jan ...',
      participants: 'Moderator, US_Onc4',
      segment: 'Oncologist',
      createdAt: '12.03.2026',
    },
    {
      id: 2,
      fileName: 'US_onc_4_23jan ...',
      participants: 'Moderator, US_Onc4',
      segment: 'Oncologist',
      createdAt: '12.03.2026',
    },
    {
      id: 3,
      fileName: 'US_onc_4_23jan ...',
      participants: 'Moderator, US_Onc4',
      segment: 'Oncologist',
      createdAt: '12.03.2026',
    },
    {
      id: 4,
      fileName: 'US_onc_4_23jan ...',
      participants: 'Moderator, US_Onc4',
      segment: 'Oncologist',
      createdAt: '12.03.2026',
    },
    {
      id: 5,
      fileName: 'US_onc_4_23jan ...',
      participants: 'Moderator, US_Onc4',
      segment: 'Oncologist',
      createdAt: '12.03.2026',
    },
    {
      id: 6,
      fileName: 'US_onc_4_23jan ...',
      participants: 'Moderator, US_Onc4',
      segment: 'Oncologist',
      createdAt: '12.03.2026',
    },
    {
      id: 7,
      fileName: 'US_onc_4_23jan ...',
      participants: 'Moderator, US_Onc4',
      segment: 'Oncologist',
      createdAt: '12.03.2026',
    },
    {
      id: 8,
      fileName: 'US_onc_4_23jan ...',
      participants: 'Moderator, US_Onc4',
      segment: 'Oncologist',
      createdAt: '12.03.2026',
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

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Main Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-5">
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
            <div className="px-8 py-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-100">
                      <th className="w-12 pb-3 text-left"></th>
                      <th className="pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        File Name
                      </th>
                      <th className="pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Participants
                      </th>
                      <th className="pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Segment
                      </th>
                      <th className="pb-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {uploadedInterviews.map((interview, index) => (
                      <tr
                        key={interview.id}
                        className="group hover:bg-neutral-50/50 transition-colors duration-150"
                      >
                        <td className="py-3">
                          <Checkbox className="opacity-60 group-hover:opacity-100 transition-opacity" />
                        </td>
                        <td className="py-3 text-sm font-medium text-neutral-900">
                          {interview.fileName}
                        </td>
                        <td className="py-3 text-sm text-neutral-600">
                          {interview.participants}
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium">
                            {interview.segment}
                          </span>
                        </td>
                        <td className="py-3 text-right text-sm text-neutral-500">
                          {interview.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
                      onClick={() => console.log('Review segments')}
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
    </div>
  )
}
