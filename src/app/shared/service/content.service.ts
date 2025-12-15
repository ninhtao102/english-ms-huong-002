import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/base-service/base.service';

/**
 * ContentService: API service for Content resource
 *
 * Extends BaseApiService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/content
 * - POST   /api/v1/content/pages
 * - GET    /api/v1/content/{id}
 * - POST   /api/v1/content
 * - DELETE /api/v1/content/{id}
 */
@Injectable({ providedIn: 'root' })
export class ContentService extends BaseService {
  constructor(http: HttpClient) {
    super(http, '/content');
  }
}
