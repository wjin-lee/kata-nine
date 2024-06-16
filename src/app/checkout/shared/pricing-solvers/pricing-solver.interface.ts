import { BasePricingRule } from '../pricing-rules/base-pricing-rule';
import { SKUCountMap } from '../sku-count-map.interface';

export interface IPricingSolver {
  /**
   * Solves for the maximal discount possible (i.e. negative price modifier).
   *
   * @param pricingRules the pricing rules to solve with
   * @param cartItemCounts current cart item counts
   */
  solve(pricingRules: BasePricingRule[], cartItemCounts: SKUCountMap): number;
}
