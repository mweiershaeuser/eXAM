import { Body, Controller, Post, Res, StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { ExamService } from './exam.service';
import { CreateExamRequest } from './dtos/create-exam-request';

@Controller('exam')
export class ExamController {
  constructor(private examService: ExamService) {}

  @Post()
  async getExam(
    @Body() createExamRequest: CreateExamRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const pdf = await this.examService.getExam(createExamRequest.exam);

    const filename = `${createExamRequest.year}-Abiturklausur-${createExamRequest.subject}.pdf`;
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });

    return new StreamableFile(new Uint8Array(pdf));
  }
}
