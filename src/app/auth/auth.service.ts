import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  // private AUTH_FIREBASE_URL = 'http://127.0.0.2:3333/fake-login-service';
  private AUTH_FIREBASE_URL_SIGN_UP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private AUTH_FIREBASE_URL_SIGN_IN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  private FIRE_BASE_KEY = environment.fireBaseApiKey;

  private tokenExpirationTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router) { }

  signup(email: string, password: string) {
    const params = new HttpParams().set('key', this.FIRE_BASE_KEY);

    return this.http
      .post<AuthResponseData>(
        this.AUTH_FIREBASE_URL_SIGN_UP,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }, {
        params
      }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData);
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    const loadedUser = new User(
      userData?.email,
      userData?.id,
      userData?._token,
      new Date(userData?._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const exiprationDuration =
        new Date(userData?._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(exiprationDuration);
    }
  }

  private handleAuthentication(resData: AuthResponseData) {

    // console.log(resData);
    const EXPIRE_IN: number = +resData.expiresIn * 1000;
    const expirationDate = new Date(
      new Date().getTime() +
      EXPIRE_IN);

    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate);

    // const user = new User(
    //   'resData.email',
    //   'resData.localId',
    //   'resData.idToken',
    //   expirationDate);

    this.user.next(user);
    this.autoLogout(EXPIRE_IN);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  // Access-Control - Allow - Origin
  login(email: string, password: string) {
    const params = new HttpParams().set('key', this.FIRE_BASE_KEY);

    return this.http.post<AuthResponseData>(
      this.AUTH_FIREBASE_URL_SIGN_IN,
      {
        email,
        password,
        returnSecureToken: true
      }, {
      params
    }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData)
        }
        ));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email dosnt exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }

    return throwError(errorMessage);
  }

}
