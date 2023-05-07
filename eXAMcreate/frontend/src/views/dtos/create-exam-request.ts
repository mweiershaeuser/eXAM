import type { Subject } from '@/models/subject'

export interface CreateExamRequest {
  year: number
  subject: Subject
  exam: string
}
