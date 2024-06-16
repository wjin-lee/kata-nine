import { SKUCountMap } from "../../../shared/sku-count-map";
import { ICartState } from "../../cart-state";

export interface IRuleCondition {
  /**
   * True if the rule condition is satisfied. False otherwise.
   * @param cartState the current cart state
   */
  isSatisfied(cartState: ICartState): boolean;

  /**
   * Retrieves the consumed items to remove from the available pool of cart items used for discounts.
   */
  getConsumption(): SKUCountMap;
}
