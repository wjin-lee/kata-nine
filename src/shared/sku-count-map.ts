import { SKU_FORBIDDEN_CHAR } from "../item/base-item";

/**
 * A map from a given SKU to its count.
 */
export interface SKUCountMap {
  [sku: string]: number;
}

export class SKUCountMap {
  /**
   * Converts a SKUCountMap into a string deterministically.
   *
   * @param skuCountMap the SKUCountMap instance to convert.
   * @returns a stringified and deterministic version of SKUCountMap.
   */
  static skuCountMapToString(skuCountMap: SKUCountMap) {
    return Object.entries(skuCountMap)
      .map(([sku, count]) => `${sku}${SKU_FORBIDDEN_CHAR}${count}`)
      .join(SKU_FORBIDDEN_CHAR);
  }
}
