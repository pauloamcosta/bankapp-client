import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Client } from '../model/client';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/clients';


  constructor(private http: HttpClient) {
    console.log('Bank http service called');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  public getAllClients(): any {
    const myResponse = this.http.get(this.baseUrl);
    return myResponse;
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(this.baseUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, JSON.stringify(client), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}, ` + `message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
