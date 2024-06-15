import { BaseItem } from './base-item.interface';

export class OrderItem implements BaseItem {
  name: string;
  unitPrice: number;

  constructor(name: string, unitPrice: number) {
    this.name = name;
    this.unitPrice = unitPrice;
  }
}
