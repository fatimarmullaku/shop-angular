import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlatformsService} from '../../../shared/services/platforms.service';
import {BrandsService} from '../../../shared/services/brands.service';
import 'hammerjs';
import {ProductsService} from '../products.service';
import {BrandsModel} from '../../../shared/models/brands.model';
import {LabelType, Options} from 'ng5-slider';
import {PaginationService} from "../../../shared/pagination/pagination.service";

@Component({
  selector: 'app-products-sidebar',
  templateUrl: './products-sidebar.component.html',
  styleUrls: ['./products-sidebar.component.scss']
})
export class ProductsSidebarComponent implements OnInit {
  currentPageNumber:number;
  size:number = 2;
  selectedBrandd =  [];
  platformsList: PlatformModel[];
  brandsList: any;
  minValue = 0;
  maxValue: number = 100;
  ceilValue: number;
  options: Options = {
    showOuterSelectionBars: true,
    floor: 0,
    ceil: 100,
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
              private brandsService: BrandsService,
              private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.productsService.getHighestPrice().subscribe((res: number) => {
      this.maxValue = res;
    });

    this.platformsService.getAllPlatforms().subscribe((data: PlatformModel[]) => {
      this.platformsList = data;
    });

    this.brandsService.getAllBrands().subscribe((data: BrandsModel) => {
      this.brandsList = data;
    });

    this.paginationService.currentPage.subscribe(res => {
      this.currentPageNumber = res;
    })


  }

  getProductsByPrice(event: any) {
    this.prices.emit({
      brandId: this.selectedBrandd,
      min: event.value,
      max: event.highValue,
      page: this.currentPageNumber,
      size: this.size
    });
  }

  getProducts() {
    const params = {
      brandId: this.selectedBrandd,
      min: this.minValue,
      max: this.maxValue,
      page: this.currentPageNumber,
      size: this.size
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
