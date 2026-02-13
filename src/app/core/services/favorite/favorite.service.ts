import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoriteService {

  private getKey() {
    const userId = localStorage.getItem('user_id');
    return `favorite_jobs_${userId}`;
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem(this.getKey()) || '[]');
  }

  isFavorite(id: number) {
    const favs = this.getFavorites();
    return favs.some((job: any) => job.id === id);
  }

  add(job: any) {
    const favs = this.getFavorites();
    favs.push(job);
    localStorage.setItem(this.getKey(), JSON.stringify(favs));
  }

  remove(id: number) {
    let favs = this.getFavorites();
    favs = favs.filter((job: any) => job.id !== id);
    localStorage.setItem(this.getKey(), JSON.stringify(favs));
  }

  toggle(job: any) {
    if (this.isFavorite(job.id)) {
      this.remove(job.id);
    } else {
      this.add(job);
    }
  }
}
