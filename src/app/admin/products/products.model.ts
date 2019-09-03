import {PlatformsModel} from '../platforms/platforms.model';
import {BrandsModel} from '../brands/brands.model';

export class ProductsModel {
  platform: PlatformsModel;
  fileUpload: any;
  brand: BrandsModel;
  id: number;
  name: string;
  unitPrice: bigint;
  recordStatus: string;
  createDateTime: Date;
  updateDateTime: Date;
  deletedDateTime: Date;
  description: string;
  version: number;
}
