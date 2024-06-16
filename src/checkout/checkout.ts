import { BaseItem } from "../item/base-item";
import { SKUCountMap } from "../shared/sku-count-map";
import { BasePricingRule } from "./pricing-rules/base-pricing-rule";
import { BacktrackingPricingSolver } from "./pricing-solver/backtracking-pricing-solver";
import { IPricingSolver } from "./pricing-solver/pricing-solver";

export interface ICheckout {
  total: number;

  /**
   * Adds an item to the checkout cart
   * @param item
   */
  scan(item: BaseItem): void;
}

/**
 * Represents a checkout cart instance.
 */
export class Checkout implements ICheckout {
  pricingRules: BasePricingRule[];
  pricingSolver: IPricingSolver;
  _total: number = 0;

  private cartItemCounts: SKUCountMap = {};
  private cartItems: { [sku: string]: BaseItem } = {};
  private appliedPriceModifier: number = 0;

  constructor(pricingRules: BasePricingRule[]) {
    this.pricingRules = pricingRules;
    this.pricingSolver = new BacktrackingPricingSolver();
  }

  scan(item: BaseItem): void {
    const sku = item.sku;
    if (!(sku in this.cartItems)) {
      this.cartItems[sku] = item;
      this.cartItemCounts[sku] = 0;
    }

    this.cartItemCounts[sku] += 1;
    this._total += item.unitPrice;

    // Re-solve
    this.appliedPriceModifier = this.pricingSolver.solve(
      this.pricingRules,
      this.cartItemCounts
    );
  }

  public get total() {
    return this._total + this.appliedPriceModifier;
  }
}