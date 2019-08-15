import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector:  'app-product-list-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  currentPage: number;
  totalPages = 4;
  totalItems: number;
  pageSize = 9;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  log(as) {
    console.log(as);
  }
}
