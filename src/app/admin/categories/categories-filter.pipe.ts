import {CategoreisModel } from './categoreis.model';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'pipeFilteer',
  pure: false
})

export class CategoriesFilterPipe implements PipeTransform {


  transform(categories: CategoreisModel[], query: string): CategoreisModel[] {
    if (!query) {
      return categories;
    } else  {
      return categories.filter((x: CategoreisModel) => x.name.toLowerCase().startsWith(query.toLowerCase()));
    }
  }
}

