import { CartState, ICartState } from "../cart-state";
import { BasePricingRule } from "./base-pricing-rule";
import { IRuleCondition } from "./conditions/rule-condition";

/**
 * A pricing rule that applies a constant-valued price modifier given that its condition has been met.
 */
export class FixedDiscountRule extends BasePricingRule {
  private modifier: number;

  constructor(conditions: IRuleCondition[], modifier: number) {
    super(conditions);
    this.modifier = modifier;
  }

  apply(cartState: ICartState): ICartState {
    const cartItemCounts = this.applyItemConsumption(cartState.cartItemCounts);
    return new CartState(
      cartItemCounts,
      cartState.appliedPriceModifier + this.modifier
    );
  }
}
