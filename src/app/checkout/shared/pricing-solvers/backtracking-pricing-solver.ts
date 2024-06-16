import { CheckoutContext } from '../checkout-context';
import { BasePricingRule } from '../pricing-rules/base-pricing-rule';
import { SKUCountMap } from '../sku-count-map.interface';
import { IPricingSolver } from './pricing-solver.interface';

/**
 * Implements the DFS/Backtracking algorithm to solve for the maximum possible discount price.
 */
export class BacktrackingPricingSolver implements IPricingSolver {
  constructor() {}

  private skuCountMapToString(counts: SKUCountMap) {
    return Object.entries(counts)
      .map(([sku, count]) => `${sku},${count}`)
      .join(',');
  }

  solve(pricingRules: BasePricingRule[], cartItemCounts: SKUCountMap): number {
    let minModifier = 0;

    const modifierMemo: { [sku: string]: number } = {};
    modifierMemo[this.skuCountMapToString(cartItemCounts)] = 0;

    // Traverse the state space tree using DFS.
    const stack = [cartItemCounts];

    while (stack.length > 0) {
      const currentState = stack.pop();
      if (currentState) {
        const stateHash = this.skuCountMapToString(currentState);

        const stateCtx = new CheckoutContext(
          currentState,
          modifierMemo[stateHash] || 0
        );

        for (const rule of pricingRules) {
          if (rule.isConditionSatisfied(stateCtx)) {
            const newCtx = rule.apply(stateCtx);
            const newStateHash = this.skuCountMapToString(newCtx.cartItems);
            const newMemoizedModifier = modifierMemo[newStateHash];

            // Only traverse down the new state if it results in a higher discount value than the last time it was traversed.
            if (
              newMemoizedModifier === undefined ||
              newCtx.appliedPriceModifier < newMemoizedModifier
            ) {
              modifierMemo[newStateHash] = newCtx.appliedPriceModifier;
              stack.push(newCtx.cartItems);

              // Update min as we go - saves us having to do min() at the end on a potentially massive memo map.
              if (newCtx.appliedPriceModifier < minModifier) {
                minModifier = newCtx.appliedPriceModifier;
              }
            }
          }
        }
      }
    }

    return minModifier;
  }
}
