import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@shared/base-service/base.service';

/**
 * HomeworkService: API service for Homework resource
 *
 * Extends BaseService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/homework
 * - POST   /api/v1/homework/pages
 * - GET    /api/v1/homework/{id}
 * - POST   /api/v1/homework
 * - DELETE /api/v1/homework/{id}
 */
@Injectable({
    providedIn: 'root'
})
export class HomeworkService extends BaseService {

    constructor(http: HttpClient) {
        super(http, '/homework');
    }

    getDetail(id: number, studentId: number): any {
        return this.http.get(this.getEndpoint(`/${id}/${studentId}`));
    }

}
