import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  currentPage = 1;
  lastPageIndex = 6;
  @Input()
  totalItems: number;
  @Input()
  pageSize: number;

  left = 1;
  mid = 2;
  right = 3;

  ngOnInit() {
    // this.lastPageIndex = Math.ceil(this.totalItems / this.pageSize);
  }

  log(as) {
    console.log(as);
  }

  initPaginationVars() {
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.lastPageIndex) {
      this.currentPage = page;
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: {size: this.pageSize, page: this.currentPage}
        });
    }
    if (this.currentPage === 1) {
      this.left = 1;
      this.mid = 2;
      this.right = 3;
    } else if (this.currentPage === this.lastPageIndex) {
      this.left = this.lastPageIndex - 2;
      this.mid = this.lastPageIndex - 1;
      this.right = this.lastPageIndex;
    } else {
      this.left = this.currentPage - 1;
      this.mid = this.currentPage;
      this.right = this.currentPage + 1;
    }


  }
}
