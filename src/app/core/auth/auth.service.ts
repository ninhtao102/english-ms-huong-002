import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { BaseService } from '@shared/base-service/base.service';
import { AuthRequest, RegisterRequest } from './auth.model';
import { Base } from 'crypto-js';
import { BaseResponse } from '@utils/constants/common';

@Injectable()
export class AuthService extends BaseService {

    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
        super(_httpClient, '/auth');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set refreshToken(token: string) {
        localStorage.setItem('refreshToken', token);
    }

    get refreshToken(): string {
        return localStorage.getItem('refreshToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param request
     */
    forgotPassword(request: AuthRequest): Observable<any> {
        return this._httpClient.post(this.baseApiUrl + '/forgot-password', request);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: AuthRequest): Observable<BaseResponse<any>> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this.baseApiUrl + '/auth/login', credentials).pipe(
            switchMap((response: BaseResponse<any>) => {

                // Store the access token in the local storage
                this.accessToken = response.body.accessToken;
                this.refreshToken = response.body.refreshToken;
                if (response.body.accessToken && response.body.refreshToken) {
                    localStorage.setItem('accessToken', response.body.accessToken);
                    localStorage.setItem('refreshToken', response.body.refreshToken);
                    localStorage.setItem('language', 'en');
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.body.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient.get(this.baseApiUrl + '/auth/refresh-token/' + this.refreshToken).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.body.accessToken;
                this.refreshToken = response.body.refreshToken;
                if (response.body.accessToken && response.body.refreshToken) {
                    localStorage.setItem('accessToken', response.body.accessToken);
                    localStorage.setItem('refreshToken', response.body.refreshToken);
                    localStorage.setItem('language', 'en');
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.body.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: RegisterRequest): Observable<any> {
        return this._httpClient.post(this.baseApiUrl + '/register', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    // login(request: any) {
    //     return this.base.requestPost(this.baseApiUrl + '/login', request);
    // }

    // activeAccount(token: string) {
    //     return this.base.requestGet(this.baseApiUrl + '/verification/' + token);
    // }

    // generateActiveToken(username: string) {
    //     return this.base.requestGet(this.baseApiUrl + '/generation-active-token/' + username);
    // }

    // forgotPassword(request: any) {
    //     return this.base.requestPost(this.baseApiUrl + '/forgot-password', request);
    // }

    // activePassword(token: string) {
    //     return this.base.requestGet(this.baseApiUrl + '/forgot-password/' + token);
    // }

    // generateNewToken(token: string) {
    //     return this.base.requestGet(this.baseApiUrl + '/forgot-password/new-token/' + token);
    // }

    // logout() {
    //     return this.base.requestGet(this.baseApiUrl + '/logout');
    // }

    // refreshToken(token: string) {
    //     return this.base.requestGet(this.baseApiUrl + '/refresh-token/' + token);
    // }

    // register(request: any) {
    //     return this.base.requestPost(this.baseApiUrl + '/register', request);
    // }

    // loginGoogle(request: any) {
    //     return this.base.requestPost(this.baseApiUrl + '/login-google', request);
    // }

}
