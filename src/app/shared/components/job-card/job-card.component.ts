import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripHtmlPipe } from '../../pipes/strip-html.pipe';
import { FavoriteService } from '../../../core/services/favorite/favorite.service';
import { ApplicationsService } from '../../../core/services/applications/applications.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import * as FavoritesActions from '../../../features/favorites/store/favorites.actions';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, StripHtmlPipe],
  templateUrl: './job-card.component.html'
})
export class JobCardComponent implements OnInit {

  @Input() job: any;

  isTracked = false;

  constructor(
    private favService: FavoriteService,
    private appService: ApplicationsService,
    private auth: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (!this.job || this.job.id == null) return;

    const jobId = this.job.id;

    this.appService.isTracked(jobId).subscribe(res => {
      this.isTracked = res.length > 0;
    });
  }

  toggleFavorite() {
    this.favService.toggle(this.job);

    this.store.dispatch(FavoritesActions.loadFavorites());
  }

  isFav() {
    if (!this.job || this.job.id == null) return false;
    return this.favService.isFavorite(this.job.id);
  }

  toggleApplication() {
    if (!this.job || this.job.id == null) {
      console.error('Job or Job ID is missing');
      return;
    }

    const jobId = this.job.id;

    if (this.isTracked) {
      this.appService.isTracked(jobId).subscribe(res => {
        if (res.length > 0 && res[0]?.id != null) {

          const applicationId = res[0].id;

          this.appService.removeApplication(applicationId).subscribe(() => {
            this.isTracked = false;
          });
        }
      });

    } else {
      this.appService.addApplication(this.job).subscribe(() => {
        this.isTracked = true;
      });
    }
  }

  isLogged() {
    return this.auth.isAuthenticated();
  }
}
