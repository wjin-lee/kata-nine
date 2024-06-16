import { SKUCountMap } from './sku-count-map.interface';

export interface ICheckoutContext {
  readonly cartItemCounts: SKUCountMap;
  readonly appliedPriceModifier: number;
}

/**
 * Represents the a checkout cart state.
 */
export class CheckoutContext implements ICheckoutContext {
  private _cartItemCounts: SKUCountMap;
  private _appliedPriceModifier: number;

  /**
   * Instantiates a new checkout context
   *
   * @param cartItemCounts an item SKU to count mapping.
   * @param appliedPriceModifier the total discounts applied so far.
   */
  constructor(cartItemCounts: SKUCountMap, appliedPriceModifier: number) {
    this._cartItemCounts = cartItemCounts;
    this._appliedPriceModifier = appliedPriceModifier;
  }

  public get cartItemCounts() {
    return this._cartItemCounts;
  }

  public get appliedPriceModifier() {
    return this._appliedPriceModifier;
  }
}
