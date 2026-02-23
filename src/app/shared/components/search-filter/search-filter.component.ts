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
  selectedLocation = '';

  @Output() onFilter = new EventEmitter<any>();

  categories = [
    'Engineering',
    'Data Science',
    'Marketing',
    'Sales',
    'Design',
    'Product'
  ];

  locations = [
    'New York, NY',
    'San Francisco, CA',
    'Remote'
  ];

  applyFilters() {
    this.onFilter.emit({
      keyword: this.keyword,
      category: this.selectedCategory,
      location: this.selectedLocation
    });
  }

  clear() {
    this.keyword = '';
    this.selectedCategory = '';
    this.selectedLocation = '';

    this.applyFilters();
  }
}
