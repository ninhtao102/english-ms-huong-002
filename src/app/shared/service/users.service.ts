import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/base-service/base.service';

/**
 * UsersService: API service for Users resource
 *
 * Extends BaseApiService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/users
 * - POST   /api/v1/users/pages
 * - GET    /api/v1/users/{id}
 * - POST   /api/v1/users
 * - DELETE /api/v1/users/{id}
 */
@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(http: HttpClient) {
    super(http, '/users');
  }
}
