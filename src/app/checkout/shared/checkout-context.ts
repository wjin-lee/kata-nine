import { SKUCountMap } from './sku-count-map.interface';

export interface ICheckoutContext {
  readonly cartItems: SKUCountMap;
  readonly appliedPriceModifier: number;
}

/**
 * Represents the a checkout cart state.
 */
export class CheckoutContext implements ICheckoutContext {
  private _cartItems: SKUCountMap;
  private _appliedPriceModifier: number;

  /**
   * Instantiates a new checkout context
   *
   * @param cartItems an item SKU to count mapping.
   * @param appliedPriceModifier the total discounts applied so far.
   */
  constructor(cartItems: SKUCountMap, appliedPriceModifier: number) {
    this._cartItems = cartItems;
    this._appliedPriceModifier = appliedPriceModifier;
  }

  public get cartItems() {
    return this._cartItems;
  }

  public get appliedPriceModifier() {
    return this._appliedPriceModifier;
  }
}
