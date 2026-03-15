import type { Participant } from '@/types'

export const sampleParticipants: Participant[] = [
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
