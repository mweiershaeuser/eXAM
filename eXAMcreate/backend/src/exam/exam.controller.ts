import { Controller, Post } from '@nestjs/common';

@Controller('exam')
export class ExamController {
  @Post()
  getExam(): string {
    return 'Abiturklausur';
  }
}
