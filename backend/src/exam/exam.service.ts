import { Injectable } from '@nestjs/common';
import * as markdownPdf from 'markdown-pdf';

@Injectable()
export class ExamService {
  getExam(md: string): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      markdownPdf()
        .from.string(md)
        .to.buffer({}, (error, buffer) => {
          if (error) {
            reject();
          }
          resolve(buffer);
        });
    });
  }
}
