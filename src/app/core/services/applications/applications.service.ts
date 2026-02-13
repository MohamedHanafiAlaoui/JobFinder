import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../../models/application.model';

@Injectable({ providedIn: 'root' })
export class ApplicationsService {

  private apiUrl = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

  private getUserId(): string {
    return localStorage.getItem('user_id') || '';
  }

  getApplications(): Observable<Application[]> {
    const userId = this.getUserId();
    return this.http.get<Application[]>(`${this.apiUrl}?userId=${userId}`);
  }

  isTracked(offerId: number | string): Observable<Application[]> {
    const userId = this.getUserId();
    return this.http.get<Application[]>(`${this.apiUrl}?userId=${userId}&offerId=${offerId}`);
  }

  addApplication(job: any): Observable<Application> {
    const userId = this.getUserId();

    const application: Application = {
      userId,
      offerId: job.id,
      apiSource: job.apiSource || 'unknown',
      title: job.name,
      company: job.company?.name,
      location: job.locations?.[0]?.name,
      url: job.refs?.landing_page,
      status: 'en_attente',
      notes: '',
      dateAdded: new Date().toISOString()
    };

    return this.http.post<Application>(this.apiUrl, application);
  }

  updateApplication(id: string | number, data: Partial<Application>): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/${id}`, data);
  }

  removeApplication(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
