import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { AddColumnSidebar } from './AddColumnSidebar'
import { ChatSidebar } from './ChatSidebar'

export function AnalysisGrid() {
  const [viewMode, setViewMode] = useState<'options' | 'table'>('options')
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [highlightedCell, setHighlightedCell] = useState<string | null>(null)

  // Citation to cell mapping (citation number -> cell ID)
  const citationMap: Record<string, string> = {
    '1': 'cell-0-unmetNeeds',
    '3': 'cell-0-diagnosis',
    '4': 'cell-0-unmetNeeds',
    '5': 'cell-1-unmetNeeds',
    '6': 'cell-1-diagnosis',
    '7': 'cell-2-unmetNeeds',
    '8': 'cell-2-diagnosis',
    '9': 'cell-2-unmetNeeds',
    '11': 'cell-3-unmetNeeds',
  }

  const handleCitationClick = (citationNumber: string) => {
    const cellId = citationMap[citationNumber]
    if (!cellId) return

    const element = document.getElementById(cellId)
    if (!element) return

    // Scroll to element smoothly
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })

    // Trigger highlight animation
    setHighlightedCell(cellId)
    setTimeout(() => setHighlightedCell(null), 2000)
  }

  // Sample participant data
  const participants = [
    {
      id: 1,
      fileName: 'US_onc_4_23jan...',
      participant: 'US_Onc4',
      segment: 'Oncologist',
      date: '12.03.2026',
      diagnosis:
        'Patient presented with early stage diagnosis showing classic PSP-Richardson syndrome features including postural instability and vertical gaze palsy. Initial symptoms emerged approximately 18 months prior with unexplained falls and difficulty with downward gaze during reading. Family noticed behavioral changes and executive dysfunction that preceded motor symptoms by several months.',
      diagnosisCitations: [1, 2, 3],
      unmetNeeds:
        'Better treatment options needed for symptom management, particularly for gait instability and falls prevention. More accessible specialist care in rural areas where patients often wait 6+ months for movement disorder appointments. Improved caregiver support programs and respite care options as disease burden increases significantly within first 2 years of diagnosis.',
      unmetNeedsCitations: [4, 5, 6, 7],
      rating: 7,
      ratingReason:
        'Product shows moderate efficacy in slowing disease progression based on tau PET imaging results, but patients still experience significant side effects including nausea, dizziness, and gastrointestinal issues. The dosing schedule is complex requiring twice-daily administration which impacts compliance. Some improvement noted in postural stability scores after 12 weeks of treatment.',
      ratingReasonCitations: [8, 9, 10, 11],
    },
    {
      id: 2,
      fileName: 'US_neuro_1_24jan...',
      participant: 'US_Neuro1',
      segment: 'Neurologist',
      date: '12.03.2026',
      diagnosis:
        'Progressive symptoms over 6 months with predominantly parkinsonian features (PSP-P variant) making differential diagnosis from Parkinson\'s disease challenging initially. Patient showed asymmetric rigidity and bradykinesia with minimal tremor. MRI revealed midbrain atrophy with "hummingbird sign" which helped confirm PSP diagnosis. Cognitive assessment showed frontal lobe dysfunction with preserved memory.',
      diagnosisCitations: [1, 3, 5],
      unmetNeeds:
        "More specific diagnostic biomarkers to enable earlier and more confident diagnosis, particularly to distinguish PSP-P from idiopathic Parkinson's disease. Better imaging protocols and standardization across facilities. Need for more accessible genetic testing given possible hereditary components in some cases. Improved multidisciplinary care coordination between neurology, ophthalmology, and rehabilitation services.",
      unmetNeedsCitations: [2, 6, 8, 9],
      rating: 8,
      ratingReason:
        'Shows promising results in clinical trials with statistically significant reduction in tau burden on PET imaging at 24 weeks. Patients demonstrate measurable improvements in PSP rating scale scores, particularly in gait and posture domains. Relatively good tolerability profile compared to previous investigational therapies. Long-term data still needed to assess durability of treatment response.',
      ratingReasonCitations: [4, 7, 10],
    },
    {
      id: 3,
      fileName: 'US_onc_7_25jan...',
      participant: 'US_Onc7',
      segment: 'Oncologist',
      date: '12.03.2026',
      diagnosis:
        'Late diagnosis complicated treatment planning as patient had already experienced multiple falls resulting in hip fracture requiring surgical intervention. Symptoms initially attributed to normal aging and depression which delayed specialist referral by approximately 12-15 months. By time of definitive PSP diagnosis, patient had severe dysphagia requiring modified diet and speech therapy, plus marked executive dysfunction affecting daily decision-making.',
      diagnosisCitations: [2, 4, 6, 8],
      unmetNeeds:
        'Earlier screening methods for at-risk populations, particularly targeting primary care physicians who often see these patients first. Better educational materials to help distinguish PSP from other neurodegenerative conditions and normal aging. More robust swallowing assessment protocols given high aspiration pneumonia risk. Enhanced fall prevention programs and home safety evaluations early in disease course.',
      unmetNeedsCitations: [1, 3, 5, 7, 9],
      rating: 6,
      ratingReason:
        'Mixed results in patient population with some showing modest benefit while others experienced no meaningful clinical improvement despite biomarker changes. Treatment burden is high with frequent clinic visits for monitoring and dose adjustments. Cost considerations are significant given limited insurance coverage for investigational therapies. Some patients discontinued due to adverse events including elevated liver enzymes and weight loss.',
      ratingReasonCitations: [10, 11, 12],
    },
    {
      id: 4,
      fileName: 'US_neuro_3_26jan...',
      participant: 'US_Neuro3',
      segment: 'Neurologist',
      date: '12.03.2026',
      diagnosis:
        'Challenging differential diagnosis between PSP and corticobasal syndrome (CBS) given prominent limb rigidity and apraxia alongside vertical gaze limitation. Patient exhibited alien limb phenomenon in right arm with cortical sensory loss. Advanced neuroimaging including tau PET helped distinguish 4R tauopathy pattern consistent with PSP. Neuropsychological testing revealed asymmetric cognitive impairment with visuospatial deficits more prominent than language.',
      diagnosisCitations: [3, 5, 7, 9],
      unmetNeeds:
        'Improved biomarker panels to better distinguish between different 4R tauopathies including PSP, CBS, and progressive apraxia of speech variants. More widespread access to specialized tau PET imaging which remains limited to major academic centers. Need for consensus diagnostic criteria that incorporate newer imaging and biofluid markers. Enhanced training for community neurologists in recognizing atypical PSP presentations.',
      unmetNeedsCitations: [2, 4, 6, 10],
      rating: 9,
      ratingReason:
        'Strong efficacy data from Phase 2b trial showing dose-dependent reduction in tau pathology with best results at highest tolerated dose. Patients show clinically meaningful improvements in both motor and cognitive domains using validated outcome measures. Safety profile is favorable with mostly mild adverse events. Mechanism of action targeting tau aggregation is well-supported by preclinical and translational studies.',
      ratingReasonCitations: [1, 8, 11, 12],
    },
    {
      id: 5,
      fileName: 'UK_onc_2_27jan...',
      participant: 'UK_Onc2',
      segment: 'Oncologist',
      date: '12.03.2026',
      diagnosis:
        'Typical presentation and progression of PSP-Richardson syndrome with supranuclear vertical gaze palsy developing early in disease course followed by postural instability with backward falls. Patient showed characteristic "surprised" facial expression with reduced blink rate and eyelid retraction. Speech became increasingly hypophonic with scanning dysarthria. MRI demonstrated midbrain atrophy with superior cerebellar peduncle atrophy.',
      diagnosisCitations: [1, 4, 6],
      unmetNeeds:
        'Patient and caregiver education resources that are culturally appropriate and available in multiple languages given diverse patient populations. Better integration of palliative care earlier in disease trajectory rather than waiting until end-stage. More options for non-pharmacological interventions including specialized physical therapy focused on fall prevention and weighted walkers. Improved access to assistive technologies for communication as dysarthria progresses.',
      unmetNeedsCitations: [3, 5, 7, 8, 11],
      rating: 7,
      ratingReason:
        'Good tolerability profile with low discontinuation rates in clinical trials, making it practical for long-term use in a progressive condition. Demonstrates stabilization of symptoms in some patients rather than improvement which may still represent clinical benefit. Biomarker data supports target engagement though correlation with clinical outcomes needs further validation. Patient quality of life measures show modest but consistent improvements particularly in daily functioning scales.',
      ratingReasonCitations: [2, 9, 10, 12],
    },
    {
      id: 6,
      fileName: 'US_onc_9_28jan...',
      participant: 'US_Onc9',
      segment: 'Oncologist',
      date: '12.03.2026',
      diagnosis:
        'Atypical symptoms delayed diagnosis including initial presentation with progressive non-fluent aphasia and apraxia of speech mimicking primary progressive aphasia. Only after 2 years did classic PSP motor features emerge including axial rigidity and vertical gaze palsy. Genetic testing ruled out MAPT mutations. FDG-PET showed hypometabolism in frontal regions and midbrain. This atypical presentation highlights diagnostic challenges in PSP variants.',
      diagnosisCitations: [2, 5, 8, 10],
      unmetNeeds:
        'Better access to movement disorder specialists particularly in underserved geographic areas where wait times exceed 6 months. Telemedicine options for routine follow-up visits to reduce travel burden on patients with significant mobility limitations. More comprehensive multidisciplinary clinics that coordinate neurology, speech therapy, physical therapy, and social work services. Enhanced insurance coverage for specialized evaluations including tau PET imaging.',
      unmetNeedsCitations: [1, 4, 6, 9, 11],
      rating: 5,
      ratingReason:
        'Limited long-term data beyond 12 months raises questions about durability of any observed benefits and potential for developing tolerance to treatment effects. Preliminary results suggest possible slowing of decline but confidence intervals are wide and clinical significance remains uncertain. Safety concerns emerged regarding potential for QTc prolongation requiring cardiac monitoring. High placebo response rate in trials makes interpreting treatment effects challenging.',
      ratingReasonCitations: [3, 7, 12],
    },
    {
      id: 7,
      fileName: 'US_neuro_5_29jan...',
      participant: 'US_Neuro5',
      segment: 'Neurologist',
      date: '12.03.2026',
      diagnosis:
        'Family history of similar neurodegenerative condition in father influenced early detection and prompted genetic counseling. Patient underwent predictive biomarker screening which identified elevated plasma p-tau217 levels before onset of clinical symptoms. Developed classic PSP features over subsequent 18 months including vertical gaze palsy, axial rigidity, and frequent falls. Early diagnosis enabled proactive management planning and clinical trial enrollment.',
      diagnosisCitations: [3, 6, 7, 9],
      unmetNeeds:
        'Genetic testing availability and counseling for families with apparent hereditary patterns even though most PSP is sporadic. Protocols for monitoring at-risk individuals identified through biomarker screening or family history. Ethical guidelines for managing presymptomatic individuals who may carry risk markers. Resources for advance care planning and discussing prognosis with patients and families early in disease course while decision-making capacity is intact.',
      unmetNeedsCitations: [2, 4, 8, 10, 11],
      rating: 8,
      ratingReason:
        'Positive patient outcomes reported in registries with improvements in activities of daily living and reduced caregiver burden based on validated questionnaires. Treatment appears most effective when initiated early in disease course supporting importance of early diagnosis. Well-designed study methodology with appropriate primary and secondary endpoints. Reasonable cost-benefit profile if disease-modifying effects are confirmed in ongoing extension studies.',
      ratingReasonCitations: [1, 5, 12],
    },
    {
      id: 8,
      fileName: 'UK_neuro_1_30jan...',
      participant: 'UK_Neuro1',
      segment: 'Neurologist',
      date: '12.03.2026',
      diagnosis:
        'Rapid progression required urgent intervention with patient declining from independent ambulation to wheelchair-bound over 8 month period. Developed severe dysphagia necessitating PEG tube placement to prevent aspiration pneumonia. Cognitive decline was particularly prominent with marked executive dysfunction affecting financial decision-making and safety awareness. Required 24-hour care within 1 year of diagnosis which is faster than typical PSP progression.',
      diagnosisCitations: [1, 4, 5, 8],
      unmetNeeds:
        'More treatment alternatives for rapidly progressing patients who may not respond to standard approaches or have exhausted other options. Better prognostic markers to identify fast progressors early who might benefit from more aggressive interventions. Enhanced palliative care services and hospice transition planning given poor prognosis. Support groups specifically for families dealing with rapidly progressive neurodegenerative conditions.',
      unmetNeedsCitations: [3, 6, 7, 9, 10],
      rating: 6,
      ratingReason:
        'Product works for symptom management but dosing complexity is challenging particularly for patients with cognitive impairment who struggle with medication adherence. Requires careful titration and monitoring making it resource-intensive in clinical practice. Some benefit seen in motor symptoms but minimal impact on cognitive decline which is often most distressing to patients and families. Questions remain about optimal duration of treatment.',
      ratingReasonCitations: [2, 11, 12],
    },
  ]

  if (viewMode === 'options') {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
          <div className="text-center space-y-3 mb-4">
            <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight">
              Create Analysis Grid
            </h2>
            <p className="text-base text-neutral-500">
              Choose how you'd like to set up your analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            {/* Start from Scratch */}
            <button
              onClick={() => setViewMode('table')}
              className="group p-8 bg-white rounded-xl border border-neutral-200/60 hover:border-neutral-300 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-neutral-600"
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
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Start from Scratch
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Create a custom analysis grid by manually adding rows and
                    columns
                  </p>
                </div>
              </div>
            </button>

            {/* Generate from Guide */}
            <button
              onClick={() => setViewMode('table')}
              className="group p-8 bg-white rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-left relative overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
                  Recommended
                </span>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Generate from Guide
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Automatically create an analysis grid using your discussion
                    guide and participants
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header and Toolbar */}
      <div className="border-b border-neutral-200/60">
        <div className="px-8 py-4 flex items-center justify-between">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-neutral-900">
              PSP Assessment Analysis
            </span>
            <svg
              className="w-4 h-4 text-neutral-400"
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
          </div>

          {/* Right: Toolbar Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsChatOpen(true)
                setIsAddColumnOpen(false)
              }}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-200 bg-white shadow-sm hover:bg-neutral-50 hover:border-neutral-300 transition-all"
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </button>
            <div className="w-px h-5 bg-neutral-200 mx-1"></div>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Add document
            </button>
            <button
              onClick={() => {
                setIsAddColumnOpen(true)
                setIsChatOpen(false)
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all"
            >
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add column
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all">
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
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              Templates
            </button>
          </div>
        </div>
      </div>

      {/* Table and Sidebar Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Sidebar on Left */}
        <ChatSidebar
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onCitationClick={handleCitationClick}
        />
        {/* Add Column Sidebar on Left */}
        <AddColumnSidebar
          isOpen={isAddColumnOpen}
          onClose={() => setIsAddColumnOpen(false)}
        />
        {/* Table Container - Scrollable */}
        <div className="flex-1 overflow-auto min-w-0">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-20">
              <tr className="border-b border-neutral-200/60">
                <th
                  className="sticky left-0 z-30 px-8 py-3.5 text-left bg-neutral-50 border-r border-neutral-200"
                  style={{ minWidth: '280px' }}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox />
                    <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Participant
                    </span>
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '180px' }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Segment
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '180px' }}
                >
                  Interview Date
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '400px' }}
                >
                  <div className="flex items-center gap-2">
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
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                    Diagnosis and journey
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '380px' }}
                >
                  <div className="flex items-center gap-2">
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
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                    Unmet Needs
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '220px' }}
                >
                  <div className="flex items-center gap-2">
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
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                    Product X rating
                  </div>
                </th>
                <th
                  className="px-8 py-3.5 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-50/50"
                  style={{ minWidth: '380px' }}
                >
                  <div className="flex items-center gap-2">
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
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                    Reason for rating
                  </div>
                </th>
                {!isAddColumnOpen && !isChatOpen && (
                  <th
                    className="px-8 py-3.5 text-left bg-neutral-50/50"
                    style={{ minWidth: '200px' }}
                  >
                    <button
                      onClick={() => {
                        setIsAddColumnOpen(true)
                        setIsChatOpen(false)
                      }}
                      className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors text-sm font-medium"
                    >
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      New column
                    </button>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {participants.map((participant, index) => (
                <tr
                  key={participant.id}
                  className="group hover:bg-neutral-50/50 transition-colors"
                >
                  <td className="sticky left-0 z-10 px-8 py-4 bg-white group-hover:bg-neutral-50/50 border-r border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="relative w-4 h-4">
                        <span className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500 font-medium group-hover:opacity-0 transition-opacity">
                          {index + 1}
                        </span>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Checkbox />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-red-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 18h10v-1H7v1zM17 14H7v-1h10v1zm0-4H7V9h10v1zm2-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V6h14v14z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-900">
                            {participant.fileName}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {participant.participant}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        participant.segment === 'Oncologist'
                          ? 'bg-purple-50/50 text-purple-500'
                          : 'bg-blue-50/50 text-blue-500'
                      }`}
                    >
                      {participant.segment}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-sm text-neutral-600">
                      {participant.date}
                    </span>
                  </td>
                  <td
                    id={`cell-${index}-diagnosis`}
                    className={`px-8 py-4 transition-all duration-500 ${
                      highlightedCell === `cell-${index}-diagnosis`
                        ? 'bg-yellow-100 ring-2 ring-yellow-400 ring-inset'
                        : ''
                    }`}
                  >
                    <div className="text-sm text-neutral-700 leading-relaxed line-clamp-4">
                      {participant.diagnosis}
                      {participant.diagnosisCitations.map((citation, idx) => (
                        <button
                          key={idx}
                          className="ml-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          [{citation}]
                        </button>
                      ))}
                    </div>
                  </td>
                  <td
                    id={`cell-${index}-unmetNeeds`}
                    className={`px-8 py-4 transition-all duration-500 ${
                      highlightedCell === `cell-${index}-unmetNeeds`
                        ? 'bg-yellow-100 ring-2 ring-yellow-400 ring-inset'
                        : ''
                    }`}
                  >
                    <div className="text-sm text-neutral-700 leading-relaxed line-clamp-4">
                      {participant.unmetNeeds}
                      {participant.unmetNeedsCitations.map((citation, idx) => (
                        <button
                          key={idx}
                          className="ml-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          [{citation}]
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-900 text-sm font-semibold">
                      {participant.rating}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="text-sm text-neutral-700 leading-relaxed line-clamp-4">
                      {participant.ratingReason}
                      {participant.ratingReasonCitations.map(
                        (citation, idx) => (
                          <button
                            key={idx}
                            className="ml-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            [{citation}]
                          </button>
                        ),
                      )}
                    </div>
                  </td>
                  {!isAddColumnOpen && !isChatOpen && (
                    <td className="px-8 py-4">
                      {/* Empty cell for new column */}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
