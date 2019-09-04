import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PaginationService} from './pagination.service';

@Component({
  selector: 'app-product-list-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  currentPage: number;
  totalPages = 6;
  left = 1;
  mid = 2;
  right = 3;

  constructor(private router: Router,
              private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.paginationService.currentPage.subscribe(currentPage => this.currentPage = currentPage);
    this.paginationService.totalPages.subscribe(totalPages => this.totalPages = totalPages);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.paginationService.changePage(page);
        // this.router.navigate(
        //   [],
        //   {
        //     relativeTo: this.activatedRoute,
        //     queryParams: {size: this.pageSize, page: this.currentPage}
        //   });
      console.log(this.currentPage);
    }
    if (this.currentPage === 1) {
      this.left = 1;
      this.mid = 2;
      this.right = 3;
    } else if (this.currentPage === this.totalPages) {
      this.left = this.totalPages - 2;
      this.mid = this.totalPages - 1;
      this.right = this.totalPages;
    } else {
      this.left = this.currentPage - 1;
      this.mid = this.currentPage;
      this.right = this.currentPage + 1;
    }


  }
}
