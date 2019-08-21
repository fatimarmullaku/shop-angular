import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductListService} from '../../shop/products/product-list/product-list.service';

@Component({
  selector: 'app-product-list-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(private router: Router) {
  }
  @Input()
  service: any;
  currentPage: number;
  totalPages = 6;


  left = 1;
  mid = 2;
  right = 3;

  ngOnInit() {
    this.service.currentPage.subscribe(currentPage => this.currentPage = currentPage);
    this.service.totalPages.subscribe(totalPages => this.totalPages = totalPages);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.service.changePage(page);
      //   this.router.navigate(
      //     [],
      //     {
      //       relativeTo: this.activatedRoute,
      //       queryParams: {size: this.pageSize, page: this.currentPage}
      //     });
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
