import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@shared/base-service/base.service';

/**
 * HomeworkAssignmentService: API service for Homework Assignments resource
 *
 * Extends BaseApiService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/homework-assignment
 * - POST   /api/v1/homework-assignment/pages
 * - GET    /api/v1/homework-assignment/{id}
 * - POST   /api/v1/homework-assignment
 * - DELETE /api/v1/homework-assignment/{id}
 */
@Injectable({
    providedIn: 'root'
})
export class HomeworkAssignmentService extends BaseService {

    constructor(http: HttpClient) {
        super(http, '/homework-assignment');
    }

}
