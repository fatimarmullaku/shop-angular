import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filterNames: string[];
  filters: any[];
  expression: string;
  defaultFilters: any[];
  constructor() {
  }

  ngOnInit() {
  }

  passFilterNames(filterNames: string[]) {
    this.filterNames = filterNames;
  }

  clearFilters() {
    this.filters = [];
  }

  changeFilter(filterName: string) {
    if (this.filterNames.includes(filterName)) {
      this.clearFilters();
      this.filters.push({filterName: this.expression});
    }
  }

  addFilter(filterName: string) {
    if (this.filterNames.includes(filterName)) {
      this.filters.push({filterName: this.expression});
    }
  }

  addDefaultFilter(filterName: string) {
    if (this.filterNames.includes(filterName)) {
      this.defaultFilters.push({filterName: this.expression});
    }
  }

  getFilters() {
    return this.filters.concat(this.defaultFilters);
  }
}
