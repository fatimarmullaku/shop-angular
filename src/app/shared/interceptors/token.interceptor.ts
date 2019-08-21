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

    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });
    return next.handle(request);
  }

  addHeader(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });
  }

  removeHeader(req: HttpRequest<any>) {
    return req.clone({
      headers: req.headers.delete('test')
    });
  }

  handleHeader(req: HttpRequest<any>) {
    // TODO: Include addHeader and removeHeader cases
  }

}
