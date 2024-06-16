import { SKUCountMap } from "../../shared/sku-count-map";
import { IPricingRule } from "../pricing-rules/pricing-rule.interface";

export interface IPricingSolver {
  /**
   * Solves for the maximal discount possible (i.e. negative price modifier).
   *
   * @param pricingRules the pricing rules to solve with
   * @param cartItemCounts current cart item counts
   */
  solve(pricingRules: IPricingRule[], cartItemCounts: SKUCountMap): number;
}
