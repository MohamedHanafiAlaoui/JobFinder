import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllFavorites } from '../store/favorites.selectors';
import * as FavoritesActions from '../store/favorites.actions';
import { JobCardComponent } from '../../../shared/components/job-card/job-card.component';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, JobCardComponent],
  templateUrl: './favorites-list.component.html'
})
export class FavoritesListComponent implements OnInit {

  favorites$: Observable<any[]> = this.store.pipe(select(selectAllFavorites));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FavoritesActions.loadFavorites());
  }
}
