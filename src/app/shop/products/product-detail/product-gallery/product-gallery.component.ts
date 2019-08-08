import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {

  image = '';

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (history.state.data) {
      this.image = history.state.data.image;
    }
  }

}
