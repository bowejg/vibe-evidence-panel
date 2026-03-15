export type Tab = 'study-setup' | 'analysis-grid' | 'ai-chat'

export interface Participant {
  id: number
  fileName: string
  participant: string
  segment: string
  date: string
  diagnosis: string
  diagnosisCitations: number[]
  unmetNeeds: string
  unmetNeedsCitations: number[]
  rating: number
  ratingReason: string
  ratingReasonCitations: number[]
}

export interface UploadedInterview {
  id: number
  fileName: string
  participants: string
  segment: string
  createdAt: string
}

export type ViewMode = 'options' | 'table'
