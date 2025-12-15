import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@shared/base-service/base.service';

/**
 * HomeworkSubmissionService: API service for Homework Submissions resource
 *
 * Extends BaseApiService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/homework-submission
 * - POST   /api/v1/homework-submission/pages
 * - GET    /api/v1/homework-submission/{id}
 * - POST   /api/v1/homework-submission
 * - DELETE /api/v1/homework-submission/{id}
 */
@Injectable({
    providedIn: 'root'
})
export class HomeworkSubmissionService extends BaseService {

    constructor(http: HttpClient) {
        super(http, '/homework-submission');
    }

}
