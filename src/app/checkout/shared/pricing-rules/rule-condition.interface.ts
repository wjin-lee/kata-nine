import { ICheckoutContext } from '../checkout-context';
import { SKUCountMap } from '../sku-count-map.interface';

export interface IRuleCondition {
  /**
   * True if the rule condition is satisfied. False otherwise.
   * @param checkoutContext the current checkout cart state
   */
  isSatisfied(checkoutContext: ICheckoutContext): boolean;

  /**
   * Retrieves the consumed items to remove from the available pool of cart items used for discounts.
   */
  getConsumption(): SKUCountMap;
}
