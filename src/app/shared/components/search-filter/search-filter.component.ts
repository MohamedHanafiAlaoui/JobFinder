import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent {

  keyword = '';
  selectedCategory = '';
  selectedLevel = '';
  selectedLocation = '';

  @Output() onFilter = new EventEmitter<any>();

  categories = [
    'Software Engineering',
    'Data Science',
    'Marketing',
    'Sales',
    'Design',
    'Product'
  ];

  levels = [
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Internship'
  ];

  locations = [
    'New York, NY',
    'San Francisco, CA',
    'Remote',
    'London, UK',
    'Berlin, Germany'
  ];

  applyFilters() {
    this.onFilter.emit({
      keyword: this.keyword,
      category: this.selectedCategory,
      level: this.selectedLevel,
      location: this.selectedLocation
    });
  }

  clear() {
    this.keyword = '';
    this.selectedCategory = '';
    this.selectedLevel = '';
    this.selectedLocation = '';

    this.applyFilters();
  }
}
