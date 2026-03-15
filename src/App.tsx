import { useState } from 'react'
import { StudySetup } from '@/components/StudySetup'
import { AnalysisGrid } from '@/components/AnalysisGrid'
import { AIChat } from '@/components/AIChat'

type Tab = 'study-setup' | 'analysis-grid' | 'ai-chat'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('study-setup')

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Top Navigation Toggle */}
      <div className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-sm py-4 sticky top-0 z-10">
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
      <div className="animate-in fade-in duration-300">
        {activeTab === 'study-setup' && <StudySetup />}
        {activeTab === 'analysis-grid' && <AnalysisGrid />}
        {activeTab === 'ai-chat' && <AIChat />}
      </div>
    </div>
  )
}

export default App
