import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // Define API
  constructor(private http: HttpClient) { }
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // HttpClient API get() method => Fetch employees list
  getCounterInfo(id: string): Observable<any> {
    return this.http.get("https://vaki.quickbase.com/db/bkcc59wk9?a=API_DoQuery&query={190.EX.'984-20'}&ticket=9_bsb3iwykg_b5rqwe_hd6a_a_-b_4896w4hnpa6xd9tv8ksdiwtaszckmtvm9feakvsbd8dwnxdavy9dv_f4xs8sj").pipe(retry(1));
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}