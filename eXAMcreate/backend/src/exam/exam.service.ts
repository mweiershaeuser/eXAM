import { Injectable } from '@nestjs/common';
import mdToPdf from 'md-to-pdf';
import { PdfOutput } from 'md-to-pdf/dist/lib/generate-output';

@Injectable()
export class ExamService {
  getExam(md: string): Promise<PdfOutput> {
    return mdToPdf({ content: md });
  }
}
