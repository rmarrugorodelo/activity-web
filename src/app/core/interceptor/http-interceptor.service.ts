import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
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
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
          return this.mapResponse(event);
        } else {
          return event;
        }
      }),
      catchError((error) => {
        let errorMessage = "";
        if (error instanceof HttpErrorResponse) {
          this.spinner.hide();
          errorMessage = this.handleError(error);
          this.alertService.showWarning(errorMessage);
          return throwError(errorMessage);
        }
      })
    );
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
    if (error.error.message) {
      console.log('Server-side error:' + error.error.message);
      return error.error.message;
    } else {
      console.log('Server-side error:' + error.status + '-' + error.message);
      return `Ha ocurrido un error, espere un momento por favor`;
    }

  }

}
