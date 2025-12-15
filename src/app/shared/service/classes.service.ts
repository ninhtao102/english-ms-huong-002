import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/base-service/base.service';

/**
 * ClassesService: API service for Classes resource
 *
 * Extends BaseApiService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/classes
 * - POST   /api/v1/classes/pages
 * - GET    /api/v1/classes/{id}
 * - POST   /api/v1/classes
 * - DELETE /api/v1/classes/{id}
 */
@Injectable({ providedIn: 'root' })
export class ClassesService extends BaseService {
    constructor(http: HttpClient) {
        super(http, '/classes');
    }

}
