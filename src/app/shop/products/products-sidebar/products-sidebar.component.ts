import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlatformsService} from '../../../shared/services/platforms.service';
import {BrandsService} from '../../../shared/services/brands.service';
import 'hammerjs';
import {ProductsService} from '../products.service';
import {BrandsModel} from '../../../shared/models/brands.model';
import {LabelType, Options} from 'ng5-slider';

@Component({
  selector: 'app-products-sidebar',
  templateUrl: './products-sidebar.component.html',
  styleUrls: ['./products-sidebar.component.scss']
})
export class ProductsSidebarComponent implements OnInit {
  selectedBrandd =  [];
  platformsList: PlatformModel[];
  brandsList: any;
  minValue = 0;
  maxValue: number;
  ceilValue: number;
  options: Options = {
    floor: 0,
    ceil: this.ceilValue,
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
    this.productsService.getHighestPrice().subscribe((res: number) => {
      this.ceilValue = res;
    });

    this.platformsService.getAllPlatforms().subscribe((data: PlatformModel[]) => {
      this.platformsList = data;
    });

    this.brandsService.getAllBrands().subscribe((data: BrandsModel) => {
      this.brandsList = data;
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
      brandId: this.selectedBrandd,
      min: this.minValue,
      max: this.maxValue
    };
    this.params.emit(params);
  }


  selectedBrand(option: any) {
    const exist = this.selectedBrandd.find(current => current === +option);
    if (!exist) {
      this.selectedBrandd.push(option);
    } else {
      this.selectedBrandd = this.selectedBrandd.filter(current => current !== +option);
    }

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
