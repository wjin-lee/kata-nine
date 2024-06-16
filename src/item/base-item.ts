export const SKU_FORBIDDEN_CHAR = '$';

export abstract class BaseItem {
  sku: string;
  name: string;
  unitPrice: number;

  constructor(sku: string, name: string, unitPrice: number) {
    if (sku.includes(SKU_FORBIDDEN_CHAR)) {
      throw new Error(`Item SKU cannot include '${SKU_FORBIDDEN_CHAR}'!`);
    }

    this.sku = sku;
    this.name = name;
    this.unitPrice = unitPrice;
  }
}
