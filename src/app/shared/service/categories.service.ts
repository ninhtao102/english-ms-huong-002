import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/base-service/base.service';

/**
 * CategoriesService: API service for Categories resource
 *
 * Extends BaseApiService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/categories
 * - POST   /api/v1/categories/pages
 * - GET    /api/v1/categories/{id}
 * - POST   /api/v1/categories
 * - DELETE /api/v1/categories/{id}
 */
@Injectable({ providedIn: 'root' })
export class CategoriesService extends BaseService {
  constructor(http: HttpClient) {
    super(http, '/categories');
  }
}
