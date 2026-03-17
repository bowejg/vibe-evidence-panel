import { useState, useRef } from 'react'
import { Mic } from 'lucide-react'

interface FilesUploadProps {
  onFilesUploaded: () => void
}

export function FilesUpload({ onFilesUploaded }: FilesUploadProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllSegments, setShowAllSegments] = useState(false)
  const [showAllKeywords, setShowAllKeywords] = useState(false)
  const [currentStep, setCurrentStep] = useState(2) // Track current stepper step (1-5)
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

  const handleSkipStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Calculate progress based on current step (each step is 20%)
  const completedSteps = currentStep - 1
  const progressPercentage = (completedSteps / 5) * 100

  return (
    <div className="h-full overflow-y-auto">
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
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                    Get more accurate analysis?
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Add in as much of the context below to get deeper more
                    specific insights with higher accuracy results
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-600">
                        Setup Progress
                      </span>
                      <span className="font-semibold text-neutral-900">
                        {completedSteps}/5 Complete
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-0 relative">
                  {/* Vertical connector line */}
                  <div className="absolute left-[18px] top-10 bottom-10 w-px bg-neutral-200"></div>

                  {/* Step 1: Discussion Guide - Completed */}
                  <div className="relative flex gap-3 pb-6">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm z-10">
                      <svg
                        className="w-4 h-4 text-white"
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
                    <div className="flex-1 pt-1">
                      <div className="font-medium text-sm text-neutral-900 mb-1">
                        Discussion Guide
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-3.5 h-3.5 text-red-500 flex-shrink-0"
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

                  {/* Step 2: Transcription Keywords - Current/Active */}
                  <div className="relative flex gap-3 pb-6">
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm z-10 ${
                        currentStep > 2
                          ? 'bg-emerald-500'
                          : currentStep === 2
                            ? 'bg-blue-600'
                            : 'bg-neutral-200'
                      }`}
                    >
                      {currentStep > 2 ? (
                        <svg
                          className="w-4 h-4 text-white"
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
                      ) : (
                        <span
                          className={`text-sm font-semibold ${currentStep === 2 ? 'text-white' : 'text-neutral-500'}`}
                        >
                          2
                        </span>
                      )}
                    </div>
                    <div
                      className={`flex-1 pt-1 ${currentStep === 2 ? 'p-3 rounded-lg bg-blue-50 border border-blue-200' : currentStep < 2 ? 'opacity-50' : ''}`}
                    >
                      <div
                        className={`font-medium text-sm ${currentStep >= 2 ? 'text-neutral-900' : 'text-neutral-500'} mb-1`}
                      >
                        Transcription Keywords
                      </div>
                      <p
                        className={`text-xs ${currentStep >= 2 ? 'text-neutral-600' : 'text-neutral-400'} ${currentStep === 2 ? 'mb-2' : ''}`}
                      >
                        <span className="font-medium">7 keywords</span>{' '}
                        extracted from your discussion guide
                      </p>
                      {currentStep === 2 && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => console.log('Review keywords')}
                            className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                          >
                            Review Keywords
                          </button>
                          <span className="text-xs text-neutral-400">or</span>
                          <button
                            onClick={handleSkipStep}
                            className="text-xs text-neutral-500 hover:text-neutral-700 font-medium transition-colors"
                          >
                            Skip for now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Concepts */}
                  <div
                    className={`relative flex gap-3 pb-6 ${currentStep < 3 ? 'opacity-50' : ''}`}
                  >
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm z-10 ${
                        currentStep > 3
                          ? 'bg-emerald-500'
                          : currentStep === 3
                            ? 'bg-blue-600'
                            : 'bg-neutral-200'
                      }`}
                    >
                      {currentStep > 3 ? (
                        <svg
                          className="w-4 h-4 text-white"
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
                      ) : (
                        <span
                          className={`text-sm font-semibold ${currentStep === 3 ? 'text-white' : 'text-neutral-500'}`}
                        >
                          3
                        </span>
                      )}
                    </div>
                    <div
                      className={`flex-1 pt-1 ${currentStep === 3 ? 'p-3 rounded-lg bg-blue-50 border border-blue-200' : ''}`}
                    >
                      <div
                        className={`font-medium text-sm ${currentStep >= 3 ? 'text-neutral-900' : 'text-neutral-500'} mb-1`}
                      >
                        Concepts
                      </div>
                      <p
                        className={`text-xs ${currentStep >= 3 ? 'text-neutral-600' : 'text-neutral-400'} ${currentStep === 3 ? 'mb-2' : ''}`}
                      >
                        <span className="font-medium">3 concepts</span>{' '}
                        extracted from your discussion guide
                      </p>
                      {currentStep === 3 && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => console.log('Review concepts')}
                            className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                          >
                            Review Concepts
                          </button>
                          <span className="text-xs text-neutral-400">or</span>
                          <button
                            onClick={handleSkipStep}
                            className="text-xs text-neutral-500 hover:text-neutral-700 font-medium transition-colors"
                          >
                            Skip for now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 4: Recruitment Grid */}
                  <div
                    className={`relative flex gap-3 pb-6 ${currentStep < 4 ? 'opacity-50' : ''}`}
                  >
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm z-10 ${
                        currentStep > 4
                          ? 'bg-emerald-500'
                          : currentStep === 4
                            ? 'bg-blue-600'
                            : 'bg-neutral-200'
                      }`}
                    >
                      {currentStep > 4 ? (
                        <svg
                          className="w-4 h-4 text-white"
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
                      ) : (
                        <span
                          className={`text-sm font-semibold ${currentStep === 4 ? 'text-white' : 'text-neutral-500'}`}
                        >
                          4
                        </span>
                      )}
                    </div>
                    <div
                      className={`flex-1 pt-1 ${currentStep === 4 ? 'p-3 rounded-lg bg-blue-50 border border-blue-200' : ''}`}
                    >
                      <div
                        className={`font-medium text-sm ${currentStep >= 4 ? 'text-neutral-900' : 'text-neutral-500'} mb-1`}
                      >
                        Recruitment Grid
                      </div>
                      <p
                        className={`text-xs ${currentStep >= 4 ? 'text-neutral-600' : 'text-neutral-400'} ${currentStep === 4 ? 'mb-2' : ''}`}
                      >
                        Upload your recruitment grid to improve participant
                        segmentation and analysis accuracy
                      </p>
                      {currentStep === 4 && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              console.log('Upload recruitment grid')
                            }
                            className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                          >
                            + Upload Grid
                          </button>
                          <span className="text-xs text-neutral-400">or</span>
                          <button
                            onClick={handleSkipStep}
                            className="text-xs text-neutral-500 hover:text-neutral-700 font-medium transition-colors"
                          >
                            Skip for now
                          </button>
                        </div>
                      )}
                      {currentStep > 4 && (
                        <button
                          onClick={() =>
                            console.log('Add another recruitment grid')
                          }
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          + Add another
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Step 5: Segments */}
                  <div
                    className={`relative flex gap-3 ${currentStep < 5 ? 'opacity-50' : ''}`}
                  >
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm z-10 ${
                        currentStep > 5
                          ? 'bg-emerald-500'
                          : currentStep === 5
                            ? 'bg-blue-600'
                            : 'bg-neutral-200'
                      }`}
                    >
                      {currentStep > 5 ? (
                        <svg
                          className="w-4 h-4 text-white"
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
                      ) : (
                        <span
                          className={`text-sm font-semibold ${currentStep === 5 ? 'text-white' : 'text-neutral-500'}`}
                        >
                          5
                        </span>
                      )}
                    </div>
                    <div
                      className={`flex-1 pt-1 ${currentStep === 5 ? 'p-3 rounded-lg bg-blue-50 border border-blue-200' : ''}`}
                    >
                      <div
                        className={`font-medium text-sm ${currentStep >= 5 ? 'text-neutral-900' : 'text-neutral-500'} mb-1`}
                      >
                        Segments
                      </div>
                      <p
                        className={`text-xs ${currentStep >= 5 ? 'text-neutral-600' : 'text-neutral-400'} ${currentStep === 5 ? 'mb-2' : ''}`}
                      >
                        <span className="font-medium">4 segments</span>{' '}
                        extracted from your discussion guide
                      </p>
                      {currentStep === 5 && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => console.log('Review segments')}
                            className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                          >
                            Review Segments
                          </button>
                          <span className="text-xs text-neutral-400">or</span>
                          <button
                            onClick={handleSkipStep}
                            className="text-xs text-neutral-500 hover:text-neutral-700 font-medium transition-colors"
                          >
                            Skip for now
                          </button>
                        </div>
                      )}
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
    </div>
  )
}
