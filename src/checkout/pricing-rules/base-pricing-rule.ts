import { SKUCountMap } from "../../shared/sku-count-map";
import { ICartState } from "../cart-state";
import { IRuleCondition } from "./conditions/rule-condition";

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
    let cartItemCounts: SKUCountMap = { ...oldItemCounts };

    for (const [sku, consumedCount] of Object.entries(
      this.getItemConsumption()
    )) {
      if (sku in cartItemCounts && consumedCount <= cartItemCounts[sku]) {
        cartItemCounts[sku] -= consumedCount;
      } else {
        throw new Error(
          `Attempted to consume non-existant cart item(s)! (Tried to consume ${consumedCount} of ${sku} with only ${cartItemCounts[sku]} left in cart).`
        );
      }
    }

    return cartItemCounts;
  }

  /**
   * Whether or not the condition for the pricing rule has been satisfied.
   *
   * @param cartState the current cart state.
   */
  isConditionSatisfied(cartState: ICartState): boolean {
    for (const condition of this.conditions) {
      if (!condition.isSatisfied(cartState)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Applies the pricing rule to the given cart state.
   * @param cartState cart state to apply the rule modifier to.
   */
  abstract apply(cartState: ICartState): ICartState;
}
