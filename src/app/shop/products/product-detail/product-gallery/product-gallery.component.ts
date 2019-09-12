import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../shared/services/product.service';
import {image} from 'html2canvas/dist/types/css/types/image';
import {ENDPOINTS} from '../../../../shared/constants/api.constants';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html'
})
export class ProductGalleryComponent implements OnInit {

  image;
  productUrl = ENDPOINTS.products.getProductImage;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(res => {
      if (res.id) {
        this.productService.getProductObservable(res.id).subscribe(response => {
          this.image = response.fileName === null ? '/assets/img/bf4-cover.jpg' : this.productUrl + response.fileName;
        });
      }
    });
  }

}
