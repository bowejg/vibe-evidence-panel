import { useState, useEffect } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { FilesUpload } from '@/components/FilesUpload'
import { StudySetup } from '@/components/StudySetup'
import { AnalysisGrid } from '@/components/AnalysisGrid'
import { AIChat } from '@/components/AIChat'
import { Toaster } from '@/components/ui/sonner'
import { useQueryParams } from '@/hooks/useQueryParams'

type Tab = 'study-setup' | 'analysis-grid' | 'ai-chat'

function App() {
  const { params, updateQueryParams } = useQueryParams()

  // Initialize state from URL params or defaults
  const [guideUploaded, setGuideUploaded] = useState(
    params.guideUploaded === 'true' || params.tab !== undefined,
  )
  const [filesUploaded, setFilesUploaded] = useState(
    params.filesUploaded === 'true',
  )
  const [activeTab, setActiveTab] = useState<Tab>(
    (params.tab as Tab) || 'study-setup',
  )

  // Sync state changes to URL
  useEffect(() => {
    if (guideUploaded && filesUploaded) {
      updateQueryParams({
        tab: activeTab,
        filesUploaded: 'true',
        guideUploaded: 'true',
      })
    } else if (guideUploaded && !filesUploaded) {
      updateQueryParams({
        filesUploaded: undefined,
        guideUploaded: 'true',
        tab: undefined,
      })
    }
  }, [activeTab, filesUploaded, guideUploaded])

  // Handle URL changes (browser back/forward)
  useEffect(() => {
    if (params.tab) {
      setActiveTab(params.tab as Tab)
      setGuideUploaded(true)
      setFilesUploaded(params.filesUploaded === 'true')
    }
  }, [params.tab, params.filesUploaded])

  // Stage 1: Upload discussion guide
  if (!guideUploaded) {
    return <FileUpload onGuideUploaded={() => setGuideUploaded(true)} />
  }

  // Render main app with navigation
  return (
    <div className="h-screen bg-[#fafafa] flex flex-col">
      {/* Top Navigation Toggle */}
      <div className="flex-shrink-0 border-b border-neutral-200/60 bg-white/80 backdrop-blur-sm py-4 z-10">
        <div className="max-w-[1800px] mx-auto px-12 flex justify-center">
          <div className="inline-flex rounded-lg p-0.5 bg-neutral-100/80 shadow-sm">
            <button
              onClick={() => {
                setActiveTab('study-setup')
                updateQueryParams({ tab: 'study-setup' })
              }}
              className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'study-setup'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              }`}
            >
              Study Setup
            </button>
            <button
              onClick={() => {
                setActiveTab('analysis-grid')
                updateQueryParams({ tab: 'analysis-grid' })
              }}
              className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'analysis-grid'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              }`}
            >
              Analysis Grid
            </button>
            <button
              onClick={() => {
                setActiveTab('ai-chat')
                updateQueryParams({ tab: 'ai-chat' })
              }}
              className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'ai-chat'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              }`}
            >
              AI Chat
            </button>
          </div>
        </div>
      </div>

      {/* Content Area with Fade Transition */}
      <div className="flex-1 min-h-0 animate-in fade-in duration-300">
        {/* Stage 2: Upload interview files (if not uploaded yet) */}
        {!filesUploaded ? (
          <FilesUpload onFilesUploaded={() => setFilesUploaded(true)} />
        ) : (
          <>
            {activeTab === 'study-setup' && <StudySetup />}
            {activeTab === 'analysis-grid' && (
              <AnalysisGrid
                initialViewMode={
                  params.outputs === 'loaded' ? 'table' : 'options'
                }
              />
            )}
            {activeTab === 'ai-chat' && (
              <AIChat initialPanelOpen={params.panel === 'open'} />
            )}
          </>
        )}
      </div>
      <Toaster />
    </div>
  )
}

export default App
