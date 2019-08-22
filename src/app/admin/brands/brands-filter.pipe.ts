import { PipeTransform, Pipe } from '@angular/core';
import {BrandsModel} from './brands.model';

@Pipe({
  name: 'pipeFilteer',
  pure: false
})

export class BrandsFilterPipe implements PipeTransform {


  transform(brands: BrandsModel[], query: string): BrandsModel[] {
    if (!query) {
      return brands;
    } else  {
      return brands.filter((x: BrandsModel) => x.name.toLowerCase().startsWith(query.toLowerCase()));
    }
  }
}

