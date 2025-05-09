import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyAudit } from '../models/company-audit.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyAuditService {
  constructor(private http: HttpClient) {}

  getAudits(): Observable<CompanyAudit[]> {
    return this.http.get<any[]>('/data/mock-audits.json').pipe(
      map(data =>
        data.map(item => ({
          ...item,
          auditDate: new Date(item.auditDate)
        }))
      )
    );
  }
}
