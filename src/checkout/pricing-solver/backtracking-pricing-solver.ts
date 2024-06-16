import { SKUCountMap } from "../../shared/sku-count-map";
import { CartState } from "../cart-state";
import { IPricingRule } from "../pricing-rules/pricing-rule.interface";

import { IPricingSolver } from "./pricing-solver.interface";

/**
 * Implements the DFS/Backtracking algorithm to solve for the maximum possible discount price.
 */
export class BacktrackingPricingSolver implements IPricingSolver {
  constructor() {}

  solve(pricingRules: IPricingRule[], cartItemCounts: SKUCountMap): number {
    let maxDiscount = 0; // Lower the better

    const discountMemo: { [sku: string]: number } = {};
    discountMemo[SKUCountMap.skuCountMapToString(cartItemCounts)] = 0;

    // Traverse the state space tree using DFS.
    const stack = [cartItemCounts];

    while (stack.length > 0) {
      const currentState = stack.pop();
      if (currentState) {
        const cartState = new CartState(
          currentState,
          discountMemo[SKUCountMap.skuCountMapToString(currentState)]
        );

        for (const rule of pricingRules) {
          if (rule.isConditionSatisfied(cartState)) {
            const newCartState = rule.apply(cartState);
            const newStateHash = SKUCountMap.skuCountMapToString(
              newCartState.cartItemCounts
            );
            const memoizedDiscount = discountMemo[newStateHash];

            // Only traverse down the new state if it is an unseen state or results in a higher discount value than the last time it was traversed.
            if (
              memoizedDiscount === undefined ||
              newCartState.appliedPriceModifier < memoizedDiscount
            ) {
              discountMemo[newStateHash] = newCartState.appliedPriceModifier;
              stack.push(newCartState.cartItemCounts);

              // Update min as we go - saves us having to do min() at the end on a potentially massive memo map.
              if (newCartState.appliedPriceModifier < maxDiscount) {
                maxDiscount = newCartState.appliedPriceModifier;
              }
            }
          }
        }
      }
    }

    return maxDiscount;
  }
}
