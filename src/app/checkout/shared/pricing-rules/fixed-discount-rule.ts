import { CheckoutContext, ICheckoutContext } from '../checkout-context';
import { BasePricingRule } from './base-pricing-rule';
import { IRuleCondition } from './rule-condition.interface';

/**
 * A pricing rule that applies a constant-valued price modifier given that its condition has been met.
 */
export class FixedDiscountRule extends BasePricingRule {
  private modifier: number;

  constructor(conditions: IRuleCondition[], modifier: number) {
    super(conditions);
    this.modifier = modifier;
  }

  apply(ctx: ICheckoutContext): ICheckoutContext {
    const cartItemCounts = this.applyItemConsumption(ctx.cartItemCounts);
    return new CheckoutContext(
      cartItemCounts,
      ctx.appliedPriceModifier + this.modifier
    );
  }
}
