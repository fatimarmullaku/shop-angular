import {Component, Input, OnInit} from '@angular/core';
import {TopProductsService} from "../../shared/services/top-products.service";
import {forEachComment} from "tslint";
import {ProductModel} from "../../shared/models/product.model";
import {TopTenModel} from "../../shared/models/top-ten.model";
import {parse} from "ts-node";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private topSold: TopProductsService) {
  }

  public top4 = [];
  imgPath:string = './assets/img/';


  ngOnInit() {
    this.topSold.getTopSoldProducts(4).subscribe(data => {
      this.top4 = data;
    });
  }

  // getTopSoldProducts(){
  //   this.topSold.getTopSoldProducts(4).subscribe((res: any) => {
  //
  //       this.top4.push(res);
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     });
  // }

}
