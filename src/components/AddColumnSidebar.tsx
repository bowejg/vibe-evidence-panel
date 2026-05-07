import { useState } from 'react'
import { X } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

interface AddColumnSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const RETURN_VALUE_OPTIONS = [
  { value: 'number', label: 'Number with limits' },
  { value: 'category', label: 'Category with allowed types' },
  { value: 'quote', label: 'Quote (specify how many)' },
  { value: 'free-text', label: 'Free Text' },
  { value: 'boolean', label: 'True/False' },
]

const CONCEPTS = [
  { value: 'search-discovery', label: 'Search & Discovery' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'knowledge-sharing', label: 'Knowledge Sharing' },
  { value: 'version-control', label: 'Version Control' },
  { value: 'onboarding', label: 'Onboarding' },
]

const DISCUSSION_GUIDE_QUESTIONS = [
  'Task 1: Finding previous design work',
  'Task 2: Accessing research findings',
  'Task 3: Locating technical documentation',
  'Task 4: Sharing work with team members',
  'Task 5: Understanding project history',
  'Task 6: Managing multiple tool workflows',
]

export function AddColumnSidebar({ isOpen, onClose }: AddColumnSidebarProps) {
  const [columnName] = useState('Time Spent on Research Requests')
  const [extractionPrompt, setExtractionPrompt] = useState(
    'How much time (in hours per week) did each participant estimate they spend servicing a typical research request from their team?',
  )
  const [selectedConcept, setSelectedConcept] = useState('')
  const [returnValueType, setReturnValueType] = useState('number')
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([
    'Task 2: Accessing research findings',
    'Task 5: Understanding project history',
  ])

  const handleQuestionToggle = (question: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question],
    )
  }

  const handleCreateColumn = () => {
    // TODO: Implement column creation logic
    console.log({
      columnName,
      extractionPrompt,
      selectedConcept,
      returnValueType,
      selectedQuestions,
    })
    onClose()
  }

  return (
    <div
      className={`bg-white border-r border-neutral-200/60 flex flex-col flex-shrink-0 h-full overflow-hidden transition-all duration-300 ease-out ${
        isOpen ? 'w-[576px] opacity-100' : 'w-0 opacity-0 border-r-0'
      }`}
    >
      {/* Header - Column Header Style */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-8 border-b border-neutral-200/60 bg-neutral-50/50"
        style={{ height: '44px' }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <svg
            className="w-4 h-4 text-teal-500 flex-shrink-0"
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
          <input
            type="text"
            defaultValue={columnName}
            className="flex-1 min-w-0 text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-transparent border-none outline-none focus:text-neutral-900 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-neutral-200 bg-white shadow-sm text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Prompt Templates
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <X className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-8 py-8 space-y-8">
        {/* What to Extract */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-900">
            What do you want to extract?
          </label>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Describe what you want to extract from each participant. For
            numerical data, include units (e.g., hours per week, percentage,
            rating 1-10).
          </p>
          <textarea
            value={extractionPrompt}
            onChange={(e) => setExtractionPrompt(e.target.value)}
            placeholder="E.g. How many hours per week does each participant spend searching for past research?"
            rows={6}
            className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-neutral-300 resize-none transition-all"
          />
        </div>

        {/* Concept Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-900">
            Which concept does this relate to?
          </label>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Select the topic or theme this column analyzes (optional)
          </p>
          <select
            value={selectedConcept}
            onChange={(e) => setSelectedConcept(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-neutral-300 bg-white transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMS41TDYgNi41TDExIDEuNSIgc3Ryb2tlPSIjOTk5OTk5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')]
              bg-[length:12px_8px] bg-[right_0.875rem_center] bg-no-repeat pr-10"
          >
            <option value="" className="text-neutral-400">
              Select a concept (optional)
            </option>
            {CONCEPTS.map((concept) => (
              <option
                key={concept.value}
                value={concept.value}
                className="text-neutral-900 py-2"
              >
                {concept.label}
              </option>
            ))}
          </select>
        </div>

        {/* Column Type */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-900">
            What type of value should be returned?
          </label>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Choose what type of data this column should contain
          </p>
          <select
            value={returnValueType}
            onChange={(e) => setReturnValueType(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-neutral-300 bg-white transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMS41TDYgNi41TDExIDEuNSIgc3Ryb2tlPSIjOTk5OTk5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')]
              bg-[length:12px_8px] bg-[right_0.875rem_center] bg-no-repeat pr-10"
          >
            <option value="" disabled className="text-neutral-400">
              Select column type...
            </option>
            {RETURN_VALUE_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-neutral-900 py-2"
              >
                {option.label}
              </option>
            ))}
          </select>
          {returnValueType === 'number' && (
            <div className="flex items-start gap-2 p-3 bg-teal-50 border border-teal-200 rounded-lg">
              <svg
                className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="space-y-1">
                <p className="text-xs font-medium text-teal-900">
                  Number column selected
                </p>
                <p className="text-xs text-teal-700 leading-relaxed">
                  The AI will extract numerical values (e.g., 5, 10.5, 3-4). You
                  can specify ranges, limits, or units in your extraction
                  prompt.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Questions to Include */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-900">
            Which questions or tasks should be included?
          </label>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Choose which questions from the guide or tasks to include
          </p>
          <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-100 max-h-80 overflow-y-auto">
            {DISCUSSION_GUIDE_QUESTIONS.map((question) => (
              <label
                key={question}
                className="flex items-start gap-3 cursor-pointer hover:bg-neutral-50/50 px-3.5 py-3.5 transition-colors group"
              >
                <div className="mt-0.5">
                  <Checkbox
                    checked={selectedQuestions.includes(question)}
                    onCheckedChange={() => handleQuestionToggle(question)}
                  />
                </div>
                <span className="text-sm text-neutral-700 leading-relaxed">
                  {question}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-neutral-100 px-8 py-6">
        <button
          onClick={handleCreateColumn}
          className="w-full px-4 py-2 rounded-lg border border-neutral-200 bg-white shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all"
        >
          Create Column
        </button>
      </div>
    </div>
  )
}
