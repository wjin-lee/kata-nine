import { Item } from "../item/item.interface";
import { SKUCountMap } from "../shared/sku-count-map";
import { IPricingRule } from "./pricing-rules/pricing-rule.interface";
import { BacktrackingPricingSolver } from "./pricing-solver/backtracking-pricing-solver";
import { IPricingSolver } from "./pricing-solver/pricing-solver.interface";

export interface ICheckout {
  total: number;

  /**
   * Adds an item to the checkout cart
   * @param item
   */
  scan(item: Item): void;
}

/**
 * Represents a checkout cart instance.
 */
export class Checkout implements ICheckout {
  pricingRules: IPricingRule[];
  pricingSolver: IPricingSolver;
  _total: number = 0;

  private cartItemCounts: SKUCountMap = {};
  private cartItems: { [sku: string]: Item } = {};
  private appliedPriceModifier: number = 0;

  constructor(pricingRules: IPricingRule[]) {
    this.pricingRules = pricingRules;
    this.pricingSolver = new BacktrackingPricingSolver();
  }

  scan(item: Item): void {
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
