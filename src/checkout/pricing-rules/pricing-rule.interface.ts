import { ICartState } from "../cart-state";

export interface IPricingRule {
  /**
   * Whether or not the condition for the pricing rule has been satisfied.
   *
   * @param cartState the current cart state.
   */
  isConditionSatisfied(cartState: ICartState): boolean;

  /**
   * Applies the pricing rule to the given cart state.
   * @param cartState cart state to apply the rule modifier to.
   */
  apply(cartState: ICartState): ICartState;
}
