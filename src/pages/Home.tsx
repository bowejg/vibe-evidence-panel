import { useState } from 'react'

export function Home() {
  const [searchValue, setSearchValue] = useState('')

  const projects = [
    {
      id: 1,
      name: 'BZZB080 PSP Assessment',
      description:
        'Progressive supranuclear palsy treatment research with U.S. neurologists',
      interviews: 15,
      lastUpdated: '2 days ago',
      status: 'active',
    },
    {
      id: 2,
      name: 'Oncology Treatment Patterns Study',
      description: 'Understanding treatment decision-making among oncologists',
      interviews: 22,
      lastUpdated: '1 week ago',
      status: 'active',
    },
    {
      id: 3,
      name: 'Patient Journey Mapping - Diabetes',
      description: 'Exploring patient experiences in diabetes management',
      interviews: 18,
      lastUpdated: '3 days ago',
      status: 'active',
    },
    {
      id: 4,
      name: 'Healthcare Provider Digital Tools',
      description: 'Research on digital tool adoption in clinical practice',
      interviews: 12,
      lastUpdated: '2 weeks ago',
      status: 'completed',
    },
    {
      id: 5,
      name: 'Rare Disease Diagnosis Barriers',
      description: 'Identifying challenges in rare disease diagnosis pathways',
      interviews: 8,
      lastUpdated: '5 days ago',
      status: 'active',
    },
  ]

  return (
    <div className="w-screen bg-[#fafafa] overflow-y-auto">
      {/* Centered Section with All Content */}
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-5xl mx-auto px-8 w-full">
          {/* Spacer to push content down */}
          <div className="h-[500px]"></div>

          {/* Main Heading */}
          <h1 className="text-4xl font-normal text-center text-neutral-800 mb-8 leading-tight">
            What can I help you discover
            <br />
            in your research?
          </h1>

          {/* Search Input Area - Centered and Taller */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="relative">
                <textarea
                  placeholder="Ask a question across your projects..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  rows={4}
                  className="w-full px-5 py-4 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
                <button className="absolute right-3 bottom-3 p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
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
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center mt-3">
              <button className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-700 transition-colors">
                <span>All projects</span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Three Tiles */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {/* Tile 1: Record a Meeting */}
            <button className="group bg-white rounded-xl border border-neutral-200 shadow-sm p-8 hover:shadow-md hover:border-neutral-300 transition-all text-left">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Record a Meeting
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Capture interviews and meetings with automatic transcription
              </p>
            </button>

            {/* Tile 2: Write a Discussion Guide */}
            <button
              onClick={() =>
                setSearchValue(
                  'Create a discussion guide to focus on understanding patient treatment preferences and decision-making factors',
                )
              }
              className="group bg-white rounded-xl border border-neutral-200 shadow-sm p-8 hover:shadow-md hover:border-neutral-300 transition-all text-left"
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-amber-600"
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
                </div>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Write a Discussion Guide
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Create structured guides for your research interviews
              </p>
            </button>

            {/* Tile 3: Analyse Data */}
            <button className="group bg-white rounded-xl border border-neutral-200 shadow-sm p-8 hover:shadow-md hover:border-neutral-300 transition-all text-left">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Analyse Data
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Extract insights and patterns from your research findings
              </p>
            </button>
          </div>

          {/* Projects List - Now Below Tiles */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">
                Recent Projects
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all
              </button>
            </div>

            <div className="space-y-3 pb-12">
              {projects.map((project) => (
                <button
                  key={project.id}
                  className="w-full bg-white rounded-lg border border-neutral-200 shadow-sm p-5 hover:shadow-md hover:border-neutral-300 transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={`ml-4 px-2.5 py-1 rounded-full text-xs font-medium ${
                        project.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {project.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mt-3">
                    <div className="flex items-center gap-1.5">
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
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                      <span>{project.interviews} interviews</span>
                    </div>
                    <div className="flex items-center gap-1.5">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Updated {project.lastUpdated}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
