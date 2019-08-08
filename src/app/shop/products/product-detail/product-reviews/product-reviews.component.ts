import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

  reviews: any[];

  constructor() { }

  ngOnInit() {
    if (history.state.data) {
      this.reviews = history.state.data.reviews;
    }
  }
}
