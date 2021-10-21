import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PruebaService implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) { 
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    const headers=new HttpHeaders({
        "x-token":"jdjdhdhhshsjs"
      });
      const reqClone=req.clone({
        headers
      });
      return next.handle(reqClone)
      .pipe(catchError((err) => {
        this.spinner.hide();
        return throwError(err);;
      }))
      .pipe(map<HttpEvent<any>,any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.spinner.hide();
        }
        return evt;
      }));
  }
  }
 

