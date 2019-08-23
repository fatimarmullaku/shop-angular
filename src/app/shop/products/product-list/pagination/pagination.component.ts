// import {Component, OnInit} from '@angular/core';
// import {Router} from '@angular/router';
//
// @Component({
//   selector: 'app-product-list-pagination',
//   templateUrl: './pagination.component.html',
//   styleUrls: ['./pagination.component.scss']
// })
// export class PaginationComponent implements OnInit {
//
//   constructor(private router: Router) {
//   }
//
//   currentPage = 0;
//   lastPageIndex = 2;
//   totalItems: number;
//   pageSize = 9;
//
//   left = 1;
//   mid = 2;
//   right = 3;
//   ngOnInit() {
//   }
//
//   log(as) {
//     console.log(as);
//   }
//
//   initPaginationVars() {
//   }
//
//   changePage(page: number) {
//     if (page >= 0 && page <= this.lastPageIndex) {
//     this.currentPage = page;
//     }
//     if (this.currentPage === 0) {
//       this.left = 1;
//       this.mid = 2;
//       this.right = 3;
//     } else if (this.currentPage === this.lastPageIndex) {
//       this.left = this.lastPageIndex - 2 + 1 ;
//       this.mid = this.lastPageIndex - 1 + 1;
//       this.right = this.lastPageIndex     + 1;
//     } else {
//       this.left = this.currentPage - 1 + 1;
//       this.mid = this.currentPage     + 1;
//       this.right = this.currentPage + 1 + 1;
//     }
//
//
//   }
// }
