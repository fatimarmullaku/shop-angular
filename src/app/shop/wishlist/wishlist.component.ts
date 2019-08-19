import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../shared/models/product.model";
import {ProductService} from "../../shared/services/product.service";
;


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {

  products: ProductModel[];


  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

}
