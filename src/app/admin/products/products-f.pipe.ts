import { PipeTransform, Pipe } from '@angular/core';
import {ProductsModel} from './products.model';

@Pipe({
  name: 'pipeFilteer',
  pure: false
})

export class ProductsFPipe implements PipeTransform {


  transform(products: ProductsModel[], query: string): ProductsModel[] {
    if (!query) {
      return products;
    } else  {
      return products.filter((x: ProductsModel) => x.name.toLowerCase().startsWith(query.toLowerCase()));
    }
  }
}

