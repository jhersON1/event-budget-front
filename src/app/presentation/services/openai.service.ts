import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { createThreadUseCase } from 'app/core/use-case/assistant/create-thread.use-case';
import { postQuestionUseCase } from 'app/core/use-case/assistant/post-question.use-case';
import { from, Observable, of, tap } from 'rxjs';

export interface Message {
  role: 'user' | 'assistant';
  content: any;
}

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  private apiUrl =
    'https://construction-budget-back.onrender.com/event/text-to-json-event';
  private reportsUrl =
    'https://construction-budget-back.onrender.com/reports/bill-event';

  // private apiEventUrl =
  //   'http://localhost:3000/event/text-to-json-event';
  // private reportsEventUrl =
  //   'http://localhost:3000/reports/bill-event';
  private http = inject(HttpClient);

  createThread(): Observable<string> {
    if (localStorage.getItem('thread')) {
      return of(localStorage.getItem('thread')!);
    }

    return from(createThreadUseCase()).pipe(
      tap((thread) => {
        localStorage.setItem('thread', thread);
      })
    );
  }

  postQuestion(threadId: string, question: string, file?: File) {
    return from(postQuestionUseCase(threadId, question, file));
  }

  convertTextToJson(messages: Message[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, { messages });
  }

  generatePdf(data: any): Observable<Blob> {
    return this.http.post(this.reportsUrl, data, {
      responseType: 'blob', 
    });
  }

}
