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

  allJobs: any[] = [];   
  jobs: any[] = [];      
  loading = false;

  page = 1;
  itemsPerPage = 6;      
  totalPages = 1;

 
  keyword = '';
  selectedCategory = '';
  selectedLevel = '';
  selectedLocation = '';

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.search();
  }

  applyFilters(filters: any) {
    this.keyword = filters.keyword;
    this.selectedCategory = filters.category;
    this.selectedLevel = filters.level;
    this.selectedLocation = filters.location;

    this.page = 1;
    this.search();
  }

  search() {
    this.loading = true;

    const params: any = {
      page: 0,            
      descending: true
    };

    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.selectedLevel) params.level = this.selectedLevel;
    if (this.selectedLocation) params.location = this.selectedLocation;

    this.jobsService.getJobs(params).subscribe({
      next: (res) => {
        let results = res.results;

        if (this.keyword) {
          const kw = this.keyword.toLowerCase();
          results = results.filter((job: any) =>
            job.name?.toLowerCase().includes(kw)
          );
        }

        this.allJobs = results;

        this.updatePagination();

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updatePagination() {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.jobs = this.allJobs.slice(start, end);

    this.totalPages = Math.ceil(this.allJobs.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }

  logAllData() {
    console.log('All Jobs:', this.allJobs);
    console.log('Filtered Jobs:', this.jobs);
  }
}
