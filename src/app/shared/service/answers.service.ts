import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/base-service/base.service';

/**
 * AnswersService: API service for Answers resource
 *
 * Extends BaseApiService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/answers
 * - POST   /api/v1/answers/pages
 * - GET    /api/v1/answers/{id}
 * - POST   /api/v1/answers
 * - DELETE /api/v1/answers/{id}
 */
@Injectable({ providedIn: 'root' })
export class AnswersService extends BaseService {

  constructor(http: HttpClient) {
    super(http, '/answers');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getAllByQuestionId(questionId: number) {
    return this.http.get(this.baseApiUrl + `/${questionId}`);
  }

}
