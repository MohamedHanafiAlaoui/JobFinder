import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private apiUrl = 'https://www.themuse.com/api/public/jobs';

  constructor(private http: HttpClient) {}

  getJobs(params: any) {
    return this.http.get<any>(this.apiUrl, { params });
  }
}

