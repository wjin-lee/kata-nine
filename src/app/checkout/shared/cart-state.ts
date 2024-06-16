import { SKUCountMap } from './sku-count-map.interface';

export interface ICartState {
  readonly cartItemCounts: SKUCountMap;
  readonly appliedPriceModifier: number;
}

/**
 * Represents the a checkout cart state.
 */
export class CartState implements ICartState {
  private _cartItemCounts: SKUCountMap;
  private _appliedPriceModifier: number;

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
