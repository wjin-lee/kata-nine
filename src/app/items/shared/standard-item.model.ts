import { BaseItem } from './base-item.interface';

export class StandardItem implements BaseItem {
  sku: string;
  name: string;
  unitPrice: number;

  constructor(sku: string, name: string, unitPrice: number) {
    this.sku = sku;
    this.name = name;
    this.unitPrice = unitPrice;
  }
}