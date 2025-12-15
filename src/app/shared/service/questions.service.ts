import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@shared/base-service/base.service';

/**
 * QuestionsService: API service for Questions resource
 *
 * Extends BaseApiService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/questions
 * - POST   /api/v1/questions/pages
 * - GET    /api/v1/questions/{id}
 * - POST   /api/v1/questions
 * - DELETE /api/v1/questions/{id}
 */
@Injectable({
    providedIn: 'root'
})
export class QuestionsService extends BaseService {
    constructor(http: HttpClient) {
        super(http, '/questions');
    }
}
