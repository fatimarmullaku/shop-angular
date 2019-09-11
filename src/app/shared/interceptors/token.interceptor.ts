import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {TokenService} from '../services/token.service';
import {RestService} from '../services/rest.service';
import {catchError} from 'rxjs/operators';
import {UserService} from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
              private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.handleHeader(req)).pipe(
      catchError(err => {
        if (err.status === 401) {
          console.log(err);
          alert(err.error.message);
          this.userService.logout();
          return throwError(err);
        }

        return throwError(err);
      })
    );
  }

  private handleHeader(req: HttpRequest<any>) {
    if (req.headers.has('X_SKIP_TOKEN')) {
      return req.clone({
        headers: req.headers.delete('X_SKIP_TOKEN')
      });
    } else {
      // TODO: Check if token has time from tokenService method.

      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenService.getToken()}`
        }
      });

    }
  }
}
