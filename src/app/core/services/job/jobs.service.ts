import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private apiUrl = 'https://www.themuse.com/api/public/jobs';

  constructor(private http: HttpClient) {}

  getJobs(params: any) {
    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      httpParams = httpParams.set(key, params[key]);
    });

    return this.http.get<any>(this.apiUrl, { params: httpParams });
  }
}
