import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from '../services/token.service';
import {RestService} from '../services/rest.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private restService: RestService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.handleHeader(req));
  }

  private handleHeader(req: HttpRequest<any>) {
    if (req.headers.has('X_SKIP_TOKEN')) {
      return req.clone({
        headers: req.headers.delete('X_SKIP_TOKEN')
      });
    } else {
      // TODO: Check if token has time from tokenService method.

      if (this.tokenService.isTokenExpired() === true) {
        console.log('TOKEN IS EXPIRED');
      } else {
        return req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.tokenService.getToken()}`
          }
        });
      }
    }
  }
}
