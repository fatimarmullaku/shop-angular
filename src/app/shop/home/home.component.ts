import {Component, OnInit} from '@angular/core';
import {TopProductsService} from "../../shared/services/top-products.service";
import {forEachComment} from "tslint";
import {ProductModel} from "../../shared/models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private topSold: TopProductsService) {
  }

  top4: any;

  ngOnInit() {
    // this.getTopSoldProducts();
    this.topSold.getTopSoldProducts(4).subscribe(res => {
      console.log('Mrena ', res[0]);
      this.top4 = res;

    });
  }

  // getTopSoldProducts(){
  //   this.topSold.getTopSoldProducts(4).subscribe(res => {
  //       console.log(res);
  //       this.top4 = res;
  //
  //   });
  //   console.log("Top 4 sold", this.top4);
  //
  // }

}
