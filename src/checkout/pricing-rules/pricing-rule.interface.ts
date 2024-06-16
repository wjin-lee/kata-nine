import { ICartState } from "../cart-state";

export interface IPricingRule {
  isConditionSatisfied(cartState: ICartState): boolean;
  apply(cartState: ICartState): ICartState;
}
