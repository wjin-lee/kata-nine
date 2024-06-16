import { ICheckoutContext } from '../checkout-context';
import { SKUCountMap } from '../sku-count-map.interface';
import { IRuleCondition } from './rule-condition.interface';

/**
 * Base class for a pricing rule.
 */
export abstract class BasePricingRule {
  private conditions: IRuleCondition[];

  constructor(conditions: IRuleCondition[]) {
    this.conditions = conditions;
  }

  /**
   * Retrieves all consumed items to remove from the available pool of cart items used for discounts.
   */
  private getItemConsumption(): SKUCountMap {
    let totalConsumption: SKUCountMap = {};

    for (const condition of this.conditions) {
      for (const [sku, count] of Object.entries(condition.getConsumption())) {
        if (!(sku in totalConsumption)) {
          totalConsumption[sku] = 0;
        }

        totalConsumption[sku] += count;
      }
    }

    return totalConsumption;
  }

  /**
   * Returns a new SKU map with the consumed items removed.
   *
   * @param oldItemCounts the item counts to apply the item consumption.
   * @returns updated item counts with the consumed items removed.
   */
  protected applyItemConsumption(oldItemCounts: SKUCountMap): SKUCountMap {
    let cartItems: SKUCountMap = { ...oldItemCounts };

    for (const [sku, consumedCount] of Object.entries(
      this.getItemConsumption()
    )) {
      if (sku in cartItems && consumedCount <= cartItems[sku]) {
        cartItems[sku] -= consumedCount;
      } else {
        throw new Error(
          `Attempted to consume non-existant cart item(s)! (Tried to consume ${consumedCount} of ${sku} with only ${cartItems[sku]} left in cart).`
        );
      }
    }

    return cartItems;
  }

  /**
   * Whether or not the condition for the pricing rule has been satisfied.
   *
   * @param checkoutContext the current checkout cart context.
   */
  isConditionSatisfied(checkoutContext: ICheckoutContext): boolean {
    for (const condition of this.conditions) {
      if (!condition.isSatisfied(checkoutContext)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Applies the pricing rule to the given checkout context.
   * @param checkoutContext checkout context to apply the rule modifier to.
   */
  abstract apply(checkoutContext: ICheckoutContext): ICheckoutContext;
}
