import { Component, OnInit } from '@angular/core';
import { JobCardComponent } from '../../../shared/components/job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, JobCardComponent],
  templateUrl: './favorites-list.component.html'
})
export class FavoritesListComponent implements OnInit {

  favorites: any[] = [];

  constructor(private favService: FavoriteService) {}

  ngOnInit(): void {
    this.favorites = this.favService.getFavorites();
  }
}
