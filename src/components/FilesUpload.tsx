import { useState, useRef } from 'react'
import { Mic } from 'lucide-react'

interface FilesUploadProps {
  onFilesUploaded: () => void
}

export function FilesUpload({ onFilesUploaded }: FilesUploadProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllSegments, setShowAllSegments] = useState(false)
  const [showAllKeywords, setShowAllKeywords] = useState(false)
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      // Simulate file upload
      setTimeout(() => {
        onFilesUploaded()
      }, 500)
    }
  }

  const handleAddFilesClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="h-full overflow-y-auto">
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
                  {showFullDescription
                    ? description + ' see more'
                    : description}
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

            {/* Drop Zone */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-8">
                <label
                  htmlFor="files-upload"
                  className="group relative flex flex-col items-center justify-center px-8 py-20 border-2 border-dashed border-neutral-300 rounded-xl hover:border-neutral-400 transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-6">
                    <h3 className="text-lg font-medium text-neutral-900">
                      Add Files
                    </h3>

                    {/* File Type Icons */}
                    <div className="flex items-center gap-3">
                      {fileTypes.map((type) => (
                        <div
                          key={type.name}
                          className="w-10 h-10 rounded-full border-2 border-neutral-300 flex items-center justify-center text-lg group-hover:border-neutral-400 transition-colors"
                          title={type.name}
                        >
                          {type.icon}
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 w-full max-w-md">
                      <div className="flex-1 h-px bg-neutral-300" />
                      <span className="text-sm text-neutral-500">Or</span>
                      <div className="flex-1 h-px bg-neutral-300" />
                    </div>

                    {/* Record Interview Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        console.log('Record interview')
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      <Mic className="w-4 h-4" />
                      Record Interview
                    </button>
                  </div>
                  <input
                    id="files-upload"
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.txt,.doc,.mp3,.mp4,.wav"
                    multiple
                    onChange={handleFileSelect}
                  />
                </label>
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
                  <div className="w-full flex items-start space-x-3 p-3.5 rounded-lg bg-neutral-50/50">
                    <div className="mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                        <svg
                          className="w-3 h-3 text-white"
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
                    <div className="space-y-0.5 flex-1">
                      <div className="font-medium text-sm text-neutral-900">
                        Discussion Guide
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Upload your interviews here to get started on your
                        analysis
                      </p>
                    </div>
                  </div>

                  {/* Segments - Not completed */}
                  <button
                    onClick={() => console.log('Segments clicked')}
                    className="w-full flex items-start space-x-3 p-3.5 rounded-lg hover:bg-neutral-50/50 text-left transition-all duration-150 border border-transparent hover:border-neutral-200/60"
                  >
                    <div className="mt-0.5">
                      <div className="w-5 h-5 rounded-full border-2 border-neutral-300"></div>
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="font-medium text-sm text-neutral-900">
                        Segments
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Add in the relevant segments for your study
                      </p>
                    </div>
                  </button>

                  {/* Keywords - Not completed */}
                  <button
                    onClick={() => console.log('Keywords clicked')}
                    className="w-full flex items-start space-x-3 p-3.5 rounded-lg hover:bg-neutral-50/50 text-left transition-all duration-150 border border-transparent hover:border-neutral-200/60"
                  >
                    <div className="mt-0.5">
                      <div className="w-5 h-5 rounded-full border-2 border-neutral-300"></div>
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="font-medium text-sm text-neutral-900">
                        Keywords
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Upload your interviews here to get started on your
                        analysis
                      </p>
                    </div>
                  </button>

                  {/* Concepts - Not completed */}
                  <button
                    onClick={() => console.log('Concepts clicked')}
                    className="w-full flex items-start space-x-3 p-3.5 rounded-lg hover:bg-neutral-50/50 text-left transition-all duration-150 border border-transparent hover:border-neutral-200/60"
                  >
                    <div className="mt-0.5">
                      <div className="w-5 h-5 rounded-full border-2 border-neutral-300"></div>
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="font-medium text-sm text-neutral-900">
                        Concepts
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Upload your interviews here to get started on your
                        analysis
                      </p>
                    </div>
                  </button>
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
    </div>
  )
}
