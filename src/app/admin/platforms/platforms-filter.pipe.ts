import {PlatformsModel } from './platforms.model';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'pipeFilteer',
  pure: false
})

export class PlatformsFilterPipe implements PipeTransform {


  transform(categories: PlatformsModel[], query: string): PlatformsModel[] {
    if (!query) {
      return categories;
    } else  {
      return categories.filter((x: PlatformsModel) => x.name.toLowerCase().startsWith(query.toLowerCase()));
    }
  }
}

