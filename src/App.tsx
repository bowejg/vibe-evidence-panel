import { useState } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { FilesUpload } from '@/components/FilesUpload'
import { StudySetup } from '@/components/StudySetup'
import { AnalysisGrid } from '@/components/AnalysisGrid'
import { AIChat } from '@/components/AIChat'

type Tab = 'study-setup' | 'analysis-grid' | 'ai-chat'

function App() {
  const [guideUploaded, setGuideUploaded] = useState(false)
  const [filesUploaded, setFilesUploaded] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('study-setup')

  // Stage 1: Upload discussion guide
  if (!guideUploaded) {
    return <FileUpload onGuideUploaded={() => setGuideUploaded(true)} />
  }

  // Render main app with navigation
  return (
    <div className="h-screen bg-[#fafafa] flex flex-col">
      {/* Top Navigation Toggle */}
      <div className="flex-shrink-0 border-b border-neutral-200/60 bg-white/80 backdrop-blur-sm py-4 z-10">
        <div className="max-w-7xl mx-auto px-8 flex justify-center">
          <div className="inline-flex rounded-lg p-0.5 bg-neutral-100/80 shadow-sm">
            <button
              onClick={() => setActiveTab('study-setup')}
              className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'study-setup'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              }`}
            >
              Study Setup
            </button>
            <button
              onClick={() => setActiveTab('analysis-grid')}
              className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'analysis-grid'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              }`}
            >
              Analysis Grid
            </button>
            <button
              onClick={() => setActiveTab('ai-chat')}
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
            {activeTab === 'analysis-grid' && <AnalysisGrid />}
            {activeTab === 'ai-chat' && <AIChat />}
          </>
        )}
      </div>
    </div>
  )
}

export default App
