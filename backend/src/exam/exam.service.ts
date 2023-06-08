/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { marked } from 'marked';

@Injectable()
export class ExamService {
  getExam(md: string): string {
    return marked.parse(md, { mangle: false, headerIds: false });
  }
}
