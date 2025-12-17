import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@shared/base-service/base.service';

/**
 * PersonsService: API service for Persons resource
 *
 * Extends BaseApiService to provide common CRUD operations:
 * - getAll()
 * - search(request)
 * - get(id)
 * - save(payload)
 * - delete(id)
 *
 * Endpoints:
 * - GET    /api/v1/persons
 * - POST   /api/v1/persons/pages
 * - GET    /api/v1/persons/{id}
 * - POST   /api/v1/persons
 * - DELETE /api/v1/persons/{id}
 */
@Injectable({
    providedIn: 'root'
})
export class PersonsService extends BaseService {

    constructor(http: HttpClient) {
        super(http, '/persons');
    }

    getByUsername(username: string) {
        return this.http.get(this.baseApiUrl + `/persons/username/${username}`);
    }

}
