import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token from wherever you have stored it
    const token = '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';

    // Clone the request and add the authorization header
    const authReq = request.clone({
      setHeaders: {
        'Content-Type': 'application/octet-stream',
        Authorization: `Bearer ${token}`,
      },
    });

    // Pass the modified request to the next handler
    return next.handle(authReq);
  }
}
