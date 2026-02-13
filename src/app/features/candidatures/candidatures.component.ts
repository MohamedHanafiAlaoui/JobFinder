// src/app/features/candidatures/candidatures.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsService } from '../../core/services/applications/applications.service';

@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidatures.component.html'
})
export class CandidaturesComponent implements OnInit {

  applications: any[] = [];
  loading = true;

  constructor(private appService: ApplicationsService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    this.loading = true;
    this.appService.getApplications().subscribe(res => {
      this.applications = res;
      this.loading = false;
    });
  }

  remove(id: string) {
    this.appService.removeApplication(id).subscribe(() => {
      this.applications = this.applications.filter(a => a.id !== id);
    });
  }

updateStatus(app: any, event: Event) {
  const select = event.target as HTMLSelectElement;
  const status = select.value as 'en_attente' | 'accepte' | 'refuse';

  this.appService.updateApplication(app.id, { status }).subscribe(() => {
    app.status = status;
  });
}



}
