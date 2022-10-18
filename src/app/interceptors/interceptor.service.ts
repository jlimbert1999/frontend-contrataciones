import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token') || ''
    })
    const reqClone = req.clone({
      headers
    })
    return next.handle(reqClone).pipe(
      catchError(this.manejoErrores)
    )
  }
  manejoErrores(error: HttpErrorResponse) {
    console.log(error);
    Swal.fire('error', error.error.message, 'error')
    return throwError(() => error);
  }
}

