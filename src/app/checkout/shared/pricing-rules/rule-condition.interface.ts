import { ICartState } from '../cart-state';
import { SKUCountMap } from '../sku-count-map.interface';

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
