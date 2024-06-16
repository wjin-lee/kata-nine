import { BaseItem } from './base-item';

export class StandardItem extends BaseItem {
  constructor(sku: string, name: string, unitPrice: number) {
    super(sku, name, unitPrice);
  }
}
