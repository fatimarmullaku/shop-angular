import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../shared/services/product.service';
import {image} from 'html2canvas/dist/types/css/types/image';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html'
})
export class ProductGalleryComponent implements OnInit {

  image;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(res => {
      console.log(res);
      if (res.id) {
        this.productService.getProductObservable(res.id).subscribe(response => {
          this.image = response.fileName === null ? '/assets/img/bf4-cover.jpg' : response.fileName;
        });
      }
    });
  }

}
