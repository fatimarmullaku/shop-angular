import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlatformsService} from '../../../shared/services/platforms.service';
import {BrandsService} from '../../../shared/services/brands.service';
import 'hammerjs';
import {ProductsService} from '../products.service';
import {BrandsModel} from '../../../shared/models/brands.model';
import {Options, LabelType} from 'ng5-slider';

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
  brandsList: any;
  minValue = 0;
  maxValue: number = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `<b>Min:</b> ${value}`;
        case LabelType.High:
          return '<b>Max :</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  @Output()
  params: EventEmitter<object> = new EventEmitter();

  @Output()
  prices: EventEmitter<object> = new EventEmitter();

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

    this.productsService.getMinAndMaxPrices().subscribe((data: any) => {
      this.minValue = data.min;
      this.maxValue = data.max;
    });

    this.productsService.getHighestPrice().subscribe((data: number) => {
      this.maxValue = data;
    });


  }


  getProductsByPrice(event: any) {
    this.prices.emit({
      min: event.value,
      max: event.highValue
    });
  }

  getProducts() {
    const params = {
      platformId: this.selectedPlatformm,
      brandId: this.selectedBrandd,
      min: this.minValue,
      max: this.maxValue
    };
    this.params.emit(params);
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
