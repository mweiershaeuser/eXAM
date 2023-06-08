import { Body, Controller, Post, Res, StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { ExamService } from './exam.service';
import { CreateExamRequest } from './dtos/create-exam-request';

@Controller('exam')
export class ExamController {
  constructor(private examService: ExamService) {}

  @Post()
  getExam(@Body() createExamRequest: CreateExamRequest): string {
    return this.examService.getExam(createExamRequest.exam);
  }
}
