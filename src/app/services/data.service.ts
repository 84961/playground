import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, delay, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private errorSubject = new Subject<void>();
  
  constructor(private http: HttpClient) {}
  
  getData(): Observable<string> {
    return new Observable<string>(subscriber => {
      subscriber.next('Initial data loaded successfully');
      
      // Subscribe to the error subject to trigger errors on demand
      this.errorSubject.subscribe(() => {
        subscriber.error(new Error('Data service error occurred'));
      });
    });
  }
  
  // Method to trigger error from outside
  triggerError(): void {
    this.errorSubject.next();
  }
}

