import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BaseResponse } from '@utils/constants/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * BaseApiService: Generic HTTP API service with error handling
 *
 * Provides common CRUD methods and centralized error handling.
 * Extend this service for domain-specific services (e.g., ClassesService, UsersService).
 *
 * Usage:
 * ```typescript
 * @Injectable({ providedIn: 'root' })
 * export class ClassesService extends BaseApiService {
 *   constructor(http: HttpClient) {
 *     super(http, '/api/v1/classes');
 *   }
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class BaseService {

    protected baseApiUrl: string;
    protected baseEndpoint: string;

    constructor(
        protected http: HttpClient,
        endpoint: string = ''
    ) {
        // Initialize baseApiUrl from environment; fallback to default
        this.baseApiUrl = environment && (environment as any).apiUrl
            ? String((environment as any).apiUrl).replace(/\/$/, '')
            : 'http://localhost:8081/api/v1';

        this.baseEndpoint = endpoint;
    }

    /**
     * Get the full endpoint URL
     */
    protected getEndpoint(path: string = ''): string {
        return `${this.baseApiUrl}${this.baseEndpoint}${path}`;
    }

    /**
     * GET all items (no parameters)
     * Maps to: GET /api/v1/{resource}
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    getAll<T>(): Observable<BaseResponse<T[]>> {
        return this.http
            .get<BaseResponse<T[]>>(this.getEndpoint())
            .pipe(catchError(this.handleError));
    }

    /**
     * POST search/pagination request
     * Maps to: POST /api/v1/{resource}/pages
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    search<T, S>(request: S): Observable<BaseResponse<T>> {
        return this.http
            .post<BaseResponse<T>>(
                this.getEndpoint('/pages'),
                request
            )
            .pipe(catchError(this.handleError));
    }

    /**
     * Generic POST to an arbitrary path (relative to baseApiUrl).
     * Example: requestPost('/auth/login', payload) => POST {baseApiUrl}/auth/login
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    requestPost<T, S>(path: string, payload: S): Observable<any> {
        return this.http
            .post<any>(this.getEndpoint(path), payload)
            .pipe(catchError(this.handleError));
    }

    /**
     * Generic GET to an arbitrary path (relative to baseApiUrl).
     * Example: requestGet('/auth/verify/abc') => GET {baseApiUrl}/auth/verify/abc
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    requestGet<T>(path: string): Observable<any> {
        return this.http
            .get<any>(this.getEndpoint(path))
            .pipe(catchError(this.handleError));
    }

    /**
     * GET single item by ID
     * Maps to: GET /api/v1/{resource}/{id}
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    get<T>(id: number | string): Observable<BaseResponse<T>> {
        return this.http
            .get<BaseResponse<T>>(this.getEndpoint(`/${id}`))
            .pipe(catchError(this.handleError));
    }

    /**
     * POST/PUT save or update item
     * Maps to: POST /api/v1/{resource}
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    save<T>(payload: T): Observable<BaseResponse<T>> {
        return this.http
            .post<BaseResponse<T>>(this.getEndpoint(), payload)
            .pipe(catchError(this.handleError));
    }

    /**
     * DELETE item by ID
     * Maps to: DELETE /api/v1/{resource}/{id}
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    delete<T = void>(id: number | string): Observable<BaseResponse<T>> {
        return this.http
            .delete<BaseResponse<T>>(this.getEndpoint(`/${id}`))
            .pipe(catchError(this.handleError));
    }

    /**
     * Error handler: logs error and returns observable error
     */
    protected handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
