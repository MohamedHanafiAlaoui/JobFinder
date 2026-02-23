import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../../../core/services/job/jobs.service';
import { JobCardComponent } from "../../../shared/components/job-card/job-card.component";
import { SearchFilterComponent } from '../../../shared/components/search-filter/search-filter.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, JobCardComponent, SearchFilterComponent],
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {

  jobs: any[] = [];
  loading = false;

  page = 1;
  itemsPerPage = 6;
  totalPages = 1;

  keyword = '';
  selectedCategory = '';
  selectedLocation = '';

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.search();
  }

  applyFilters(filters: any) {
    this.keyword = filters.keyword;
    this.selectedCategory = filters.category;
    this.selectedLocation = filters.location;

    this.page = 1;
    this.search();
  }

search() {
  this.loading = true;

  const params: any = {
    page: this.page,
    per_page: this.itemsPerPage
  };

  if (this.selectedCategory) params.category = this.selectedCategory;
  if (this.selectedLocation) params.location = this.selectedLocation;

  this.jobsService.getJobs(params).subscribe({
    next: (res) => {

      let results = res.results || [];

      if (this.keyword.trim() !== '') {
        const kw = this.keyword.toLowerCase();
        results = results.filter((job: any) =>
          job.name?.toLowerCase().includes(kw)
        );
      }

      if (results.length === 0 && this.page > 1) {
        this.page = 1;
        this.search();
        return;
      }

      this.jobs = results;
      this.totalPages = res.page_count && res.page_count > 0 ? res.page_count : 1;

      this.loading = false;
    },
    error: () => {
      this.loading = false;
    }
  });
}


  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.search();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.search();
    }
  }
}
