import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Job } from '../../models/job.model';

@Injectable({ providedIn: 'root' })
export class FavoriteService {

  private getKey(): string {
    const userId = localStorage.getItem('user_id');
    return `favorite_jobs_${userId}`;
  }

  getFavorites(): Observable<Job[]> {
    const favorites = JSON.parse(localStorage.getItem(this.getKey()) || '[]');
    return of(favorites);
  }

  isFavorite(id: string): boolean {
    const favs: Job[] = JSON.parse(localStorage.getItem(this.getKey()) || '[]');
    return favs.some((job: Job) => job.id === id);
  }

  add(job: Job): void {
    const favs: Job[] = JSON.parse(localStorage.getItem(this.getKey()) || '[]');
    favs.push(job);
    localStorage.setItem(this.getKey(), JSON.stringify(favs));
  }

  remove(id: string): void {
    let favs: Job[] = JSON.parse(localStorage.getItem(this.getKey()) || '[]');
    favs = favs.filter((job: Job) => job.id !== id);
    localStorage.setItem(this.getKey(), JSON.stringify(favs));
  }

  toggle(job: Job): void {
    if (this.isFavorite(job.id)) {
      this.remove(job.id);
    } else {
      this.add(job);
    }
  }
}
