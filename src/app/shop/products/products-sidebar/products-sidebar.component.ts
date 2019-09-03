import {Component, OnInit} from '@angular/core';
import {PlatformsService} from '../../../admin/platforms/platforms.service';
import 'hammerjs';
import {BrandsService} from '../../../admin/brands/brands.service';
import {BrandsModel} from '../../../admin/brands/brands.model';
import {PlatformsModel} from '../../../admin/platforms/platforms.model';

@Component({
  selector: 'app-products-sidebar',
  templateUrl: './products-sidebar.component.html',
  styleUrls: ['./products-sidebar.component.scss']
})
export class ProductsSidebarComponent implements OnInit {
  productSort = ['Alphabetical A to Z', 'Alphabetical from Z to A', 'Most popular', 'Release date'];
  showFiller = false;
  platformsList: PlatformsModel[];
  brandsList: BrandsModel[];
  selected: boolean;


  constructor(private platformsService: PlatformsService,
              private brandsService: BrandsService) {
  }

  ngOnInit() {
    this.platformsService.getAllPlatforms().subscribe((data: any) => {
      this.platformsList = data;
    });

    this.brandsService.getAllBrands().subscribe((data: any) => {
      this.brandsList = data;
    });
  }

  selectedPlatform(option: any) {
    localStorage.setItem('platformSelected', option);
  }

  selectedBrand(option: any) {
    localStorage.setItem('brandSelected', option);
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
