import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlatformsService} from '../../../shared/services/platforms.service';
import {BrandsService} from '../../../shared/services/brands.service';
import 'hammerjs';
import {ProductsService} from '../products.service';
import {BrandsModel} from '../../../shared/models/brands.model';
import {ɵNgStyleR2Impl} from '@angular/common';
import {HttpParams} from '@angular/common/http';
import {ProductModel} from '../../../shared/models/product.model';

@Component({
  selector: 'app-products-sidebar',
  templateUrl: './products-sidebar.component.html',
  styleUrls: ['./products-sidebar.component.scss']
})
export class ProductsSidebarComponent implements OnInit {
  productSort = ['Alphabetical A to Z', 'Alphabetical from Z to A', 'Most popular', 'Release date'];
  showFiller = false;
  selected: boolean;
  selectedPlatformm: any = '';
  selectedBrandd: any = '';
  platformsList: PlatformModel[];
  brandsList: BrandsModel[];
  productsList: ProductModel[];

  @Output()
  params: EventEmitter<object> = new EventEmitter();


  constructor(private productsService: ProductsService,
              private platformsService: PlatformsService,
              private brandsService: BrandsService) {
  }

  ngOnInit() {
    this.platformsService.getAllPlatforms().subscribe((data: PlatformModel[]) => {
      this.platformsList = data;
    });

    this.brandsService.getAllBrands().subscribe((data: BrandsModel) => {
      this.brandsList = data;
    });

  }


  getProducts() {
    const params = {
      platformId: this.selectedPlatformm,
      brandId: this.selectedBrandd
    };
    this.params.emit(params);
  }

  selectedPlatform(option: string) {
    this.selectedPlatformm = option;
    this.getProducts();
  }

  selectedBrand(option: any) {
    this.selectedBrandd = option;
    this.getProducts();
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
