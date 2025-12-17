import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { BaseService } from '@shared/base-service/base.service';
import { BaseResponse } from '@utils/constants/common';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    public currentUser: any;

    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, '/users');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    getCurrentUser(): Observable<BaseResponse<any>> {
        return this._httpClient.get(this.baseApiUrl + '/users/current').pipe(
            tap((response: BaseResponse<any>) => {
                this.currentUser = { ...response.body, name: response.body.displayName, avatar: response.body.photoUrl };

                // if typed user is available, push to subject
                try {
                    this._user.next(this.currentUser as User);
                } catch {
                    // ignore if shape doesn't match
                }
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
