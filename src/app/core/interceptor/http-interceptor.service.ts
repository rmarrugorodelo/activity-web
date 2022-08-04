import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from '../../shared/service/alert.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService,
    private alertService: AlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isResource(req.url)) {
      this.spinner.show();
    }
    return next.handle(req);
  }

  private isResource(url: string): boolean {
    return url.includes('assets/image') ? true : false;
  }

  private mapResponse(event: HttpResponse<any>) {
    const responseServer = event.body;
    if (responseServer.status === 0) {
      return event.clone({ body: event.body.body });
    }
    return event.clone({ body: event.body });
  }

  private handleError(error) {
    if (error instanceof ErrorEvent) {
      console.log('Server-side error:' + error.error.message);
      return `An internal error has occurred`;
    } else {
      console.log('Server-side error:' + error.status + '-' + error.message);
      return `Communication with the server has been lost`;
    }

  }

}
