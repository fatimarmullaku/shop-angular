import {PlatformsModel} from "../platforms/platforms.model";
import {BrandsModel} from "../brands/brands.model";

export class ProductsModel {
  id: number;
  name: string;
  unitPrice: bigint;
  inStock: number;
  recordStatus: string;
  createDateTime: Date;
  updateDateTime: Date;
  deletedDateTime: Date;
  description: string;
  version: number;
  platform: PlatformsModel;
  brand: BrandsModel;
}
