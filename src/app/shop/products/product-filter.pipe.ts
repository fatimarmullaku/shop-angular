import { PipeTransform, Pipe } from '@angular/core';
import {BrandsModel} from '../../admin/brands/brands.model';

@Pipe({
  name: 'pipeFilter',
  pure: false
})

export class ProductFilterPipe implements PipeTransform {


  transform(brands: BrandsModel[], query: string): BrandsModel[] {
    if (!query) {
      return brands;
    } else  {
      return brands.filter((x: BrandsModel) => x.name);
    }
  }
}

