import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

interface FormData {
  contactName: string
  contactEmail: string
  jobTitle: string
  industry: string
  seniorityLevel: string
  minYearsInRole: string
  additionalScreening: string
  exclusionFactors: string
  companySize: string[]
  geography: string[]
  startDate: string
  otherDetails: string
  selectedRecruiters: string[]
}

const RECRUITERS = [
  'Respondent',
  'dscout',
  'Great Question',
  'Askable',
  'UserInterviews',
  'Cint',
  'Prolific',
  'NewtonX',
  'GLG',
  'ThirdBridge',
]

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1001-5000 employees',
  '5000+ employees',
]

const GEOGRAPHIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Australia',
  'Japan',
  'India',
  'Other',
]

const SENIORITY_LEVELS = [
  'Entry Level',
  'Mid Level',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'VP',
  'C-Suite',
]

export function Recruit() {
  const [needsRecruitment, setNeedsRecruitment] = useState<'yes' | 'no' | null>(
    null,
  )
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    contactName: '',
    contactEmail: '',
    jobTitle: '',
    industry: '',
    seniorityLevel: '',
    minYearsInRole: '',
    additionalScreening: '',
    exclusionFactors: '',
    companySize: [],
    geography: [],
    startDate: '',
    otherDetails: '',
    selectedRecruiters: [],
  })

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (
    field: 'companySize' | 'geography' | 'selectedRecruiters',
    item: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }))
  }

  const calculateEstimatedCost = () => {
    const baseRate = 150 // Base cost per participant
    const numberOfParticipants = 15 // Assumed number
    const recruiters = formData.selectedRecruiters.length || 1
    const total = baseRate * numberOfParticipants * recruiters
    return total.toLocaleString()
  }

  const handleSendToRecruiters = () => {
    if (formData.selectedRecruiters.length === 0) {
      toast.error('Please select at least one recruiter')
      return
    }
    if (!formData.contactName || !formData.contactEmail) {
      toast.error('Please fill in contact information')
      return
    }
    if (!formData.jobTitle) {
      toast.error('Please specify who you are recruiting')
      return
    }

    setIsSubmitted(true)
  }

  return (
    <div className="h-screen flex bg-[#fafafa]">
      {/* Left Sidebar (Icons) */}
      <div className="w-14 bg-white border-r border-neutral-200 flex flex-col items-center justify-between py-4">
        {/* Top Icons */}
        <div className="flex flex-col items-center gap-6">
          {/* Logo/Brand Icon */}
          <button className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
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

          {/* Memory Icon */}
          <button className="flex flex-col items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="text-[10px] leading-none">Memory</span>
          </button>
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col items-center gap-4">
          {/* Shield Icon */}
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </button>

          {/* Power Icon */}
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <svg
              className="w-5 h-5"
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

          {/* Question Mark Icon */}
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          {/* Sun/Theme Toggle Icon */}
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          {/* User Profile Icon */}
          <button className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-300 transition-colors">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Left Panel (Steps) */}
      <div className="w-80 bg-white border-r border-neutral-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200">
          <h2 className="text-base font-semibold text-neutral-900">
            Study setup
          </h2>
        </div>

        {/* Steps */}
        <div className="flex-1 px-6 py-6 space-y-4">
          {/* Step 1: Discussion guide - Completed */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-white"
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
            <div className="flex-1">
              <div className="font-medium text-sm text-neutral-900 mb-0.5">
                Discussion guide
              </div>
              <div className="text-xs text-neutral-500">1 file added</div>
            </div>
          </div>

          {/* Step 2: Concepts - Completed */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-white"
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
            <div className="flex-1">
              <div className="font-medium text-sm text-neutral-900 mb-0.5">
                Concepts
              </div>
              <div className="text-xs text-neutral-500">3 concepts added</div>
            </div>
          </div>

          {/* Step 3: Recruit Participants - Current */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xs font-semibold text-white">3</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-neutral-900 mb-0.5">
                Recruit Participants
              </div>
              <div className="text-xs text-neutral-500">
                Setup recruitment criteria
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-8 py-4 bg-white border-b border-neutral-200 flex-shrink-0">
          <h1 className="text-base font-medium text-neutral-900">
            Recruit Participants
          </h1>
        </div>

        {/* Initial Question - Do you need recruitment help? */}
        {needsRecruitment === null && (
          <div className="flex-1 flex items-start justify-center pt-32">
            <div className="max-w-2xl w-full px-8">
              <h2 className="text-xl font-medium text-neutral-900 mb-6 text-center">
                Do you need help recruiting participants for this study?
              </h2>

              <div className="flex gap-3 justify-center mb-6">
                <button
                  onClick={() => setNeedsRecruitment('no')}
                  className="px-12 py-2.5 rounded-lg border text-sm font-medium transition-all bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50"
                >
                  No, Skip This Step
                </button>
                <button
                  onClick={() => setNeedsRecruitment('yes')}
                  className="px-12 py-2.5 rounded-lg border text-sm font-medium transition-all bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                >
                  Yes, Help Me Recruit
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-neutral-500">
                  We can connect you with professional recruitment platforms to
                  find the right participants
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Show "Skipped" message */}
        {needsRecruitment === 'no' && (
          <div className="flex-1 flex items-start justify-center pt-32">
            <div className="max-w-2xl w-full px-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
                <svg
                  className="w-8 h-8 text-neutral-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-neutral-900 mb-3">
                Recruitment Step Skipped
              </h2>
              <p className="text-sm text-neutral-600 mb-6">
                You can continue with your study setup. If you change your mind,
                you can always come back to this step later.
              </p>
              <button
                onClick={() => setNeedsRecruitment(null)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
              >
                Go back and set up recruitment
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {needsRecruitment === 'yes' && isSubmitted && (
          <div className="flex-1 flex items-start justify-center pt-20 overflow-y-auto">
            <div className="max-w-3xl w-full px-8">
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-8">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-emerald-600"
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

                {/* Title */}
                <h2 className="text-2xl font-bold text-neutral-900 text-center mb-3">
                  Recruitment Request Sent!
                </h2>

                {/* Description */}
                <p className="text-neutral-600 text-center mb-8">
                  Your recruitment brief has been successfully sent to the
                  following platforms:
                </p>

                {/* Contacted Firms */}
                <div className="bg-neutral-50 rounded-lg p-6 mb-8">
                  <h3 className="text-sm font-semibold text-neutral-900 mb-4">
                    Contacted Recruitment Platforms
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {formData.selectedRecruiters.map((recruiter) => (
                      <div
                        key={recruiter}
                        className="flex items-center gap-2 text-sm text-neutral-700"
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        {recruiter}
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's Next */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">
                        Updates will appear here
                      </h4>
                      <p className="text-sm text-neutral-600">
                        As recruiters respond with candidate profiles, you'll
                        see them in this dashboard.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">
                        Email notifications
                      </h4>
                      <p className="text-sm text-neutral-600">
                        We'll email you at{' '}
                        <span className="font-medium">
                          {formData.contactEmail}
                        </span>{' '}
                        when new candidate requests come in.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">
                        Interview recording with CoLoop
                      </h4>
                      <p className="text-sm text-neutral-600">
                        All interviews will be automatically recorded and
                        transcribed using CoLoop for easy analysis and sharing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Estimated Cost Reminder */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
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
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Estimated Cost: ${calculateEstimatedCost()}
                      </p>
                      <p className="text-xs text-blue-700">
                        Final costs may vary based on recruiter rates and
                        participant availability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-3 px-6 rounded-lg font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                >
                  Make Changes to Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Form Content */}
        {needsRecruitment === 'yes' && !isSubmitted && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-8 py-8">
              <div className="space-y-8">
                {/* Section 1: Project Contact */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Project Contact
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) =>
                          updateField('contactName', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          updateField('contactEmail', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Who We're Recruiting */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Who We're Recruiting
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) =>
                          updateField('jobTitle', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Product Manager, UX Researcher"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Industry
                        </label>
                        <input
                          type="text"
                          value={formData.industry}
                          onChange={(e) =>
                            updateField('industry', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Technology, Healthcare"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Minimum Years in Role
                        </label>
                        <input
                          type="number"
                          value={formData.minYearsInRole}
                          onChange={(e) =>
                            updateField('minYearsInRole', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 3"
                          min="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Seniority Level
                      </label>
                      <select
                        value={formData.seniorityLevel}
                        onChange={(e) =>
                          updateField('seniorityLevel', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select seniority level</option>
                        {SENIORITY_LEVELS.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Additional Criteria */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Additional Screening Criteria
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Screening Questions / Requirements
                      </label>
                      <textarea
                        value={formData.additionalScreening}
                        onChange={(e) =>
                          updateField('additionalScreening', e.target.value)
                        }
                        rows={4}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Must have experience with user research, must use specific tools..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Exclusion Factors
                      </label>
                      <textarea
                        value={formData.exclusionFactors}
                        onChange={(e) =>
                          updateField('exclusionFactors', e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Exclude competitors, exclude people who participated in similar studies..."
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Company Size */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Company Size (by employees)
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {COMPANY_SIZES.map((size) => (
                      <div key={size} className="flex items-center gap-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={formData.companySize.includes(size)}
                          onCheckedChange={() =>
                            toggleArrayItem('companySize', size)
                          }
                        />
                        <label
                          htmlFor={`size-${size}`}
                          className="text-sm text-neutral-700 cursor-pointer"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Geography */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Geography
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {GEOGRAPHIES.map((geo) => (
                      <div key={geo} className="flex items-center gap-2">
                        <Checkbox
                          id={`geo-${geo}`}
                          checked={formData.geography.includes(geo)}
                          onCheckedChange={() =>
                            toggleArrayItem('geography', geo)
                          }
                        />
                        <label
                          htmlFor={`geo-${geo}`}
                          className="text-sm text-neutral-700 cursor-pointer"
                        >
                          {geo}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 6: Timing */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Timing
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      When do you want to start interviewing?
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => updateField('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Section 7: Other Details */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Other Details
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      value={formData.otherDetails}
                      onChange={(e) =>
                        updateField('otherDetails', e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any other requirements, preferences, or special instructions..."
                    />
                  </div>
                </div>

                {/* Section 8: Estimated Costs */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/60 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Estimated Costs
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Based on 15 participants at $150/participant
                  </p>
                  <div className="text-3xl font-bold text-blue-600">
                    ${calculateEstimatedCost()}
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    This is an estimate. Final costs may vary by recruiter and
                    participant availability.
                  </p>
                </div>

                {/* Section 9: Select Recruiters */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Select Recruiters
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Choose which recruitment platforms to send this brief to
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {RECRUITERS.map((recruiter) => (
                      <div key={recruiter} className="flex items-center gap-2">
                        <Checkbox
                          id={`recruiter-${recruiter}`}
                          checked={formData.selectedRecruiters.includes(
                            recruiter,
                          )}
                          onCheckedChange={() =>
                            toggleArrayItem('selectedRecruiters', recruiter)
                          }
                        />
                        <label
                          htmlFor={`recruiter-${recruiter}`}
                          className="text-sm font-medium text-neutral-700 cursor-pointer"
                        >
                          {recruiter}
                        </label>
                      </div>
                    ))}
                  </div>

                  {formData.selectedRecruiters.length > 0 && (
                    <p className="text-xs text-neutral-500 mt-4">
                      Selected: {formData.selectedRecruiters.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Send Button */}
        {needsRecruitment === 'yes' && !isSubmitted && (
          <button
            onClick={handleSendToRecruiters}
            disabled={formData.selectedRecruiters.length === 0}
            className={`fixed bottom-8 right-8 py-3 px-6 rounded-lg font-semibold text-white transition-all shadow-xl z-50 ${
              formData.selectedRecruiters.length === 0
                ? 'bg-neutral-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-2xl hover:scale-105'
            }`}
          >
            {formData.selectedRecruiters.length === 0
              ? 'Select Recruiters'
              : `Send to ${formData.selectedRecruiters.length} Recruiter${formData.selectedRecruiters.length !== 1 ? 's' : ''}`}
          </button>
        )}

        {/* Footer */}
        {needsRecruitment !== 'yes' && (
          <div className="px-8 py-4 bg-white border-t border-neutral-200 flex justify-end flex-shrink-0">
            <span className="text-xs text-neutral-400">vibe-template</span>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  )
}
