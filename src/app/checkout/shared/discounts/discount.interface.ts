import { ICartState } from '../cart-state';

/**
 * Represents a discount to be applied when a pricing rule condition is met.
 */
export interface IDiscount {
  /**
   * Computes the discount to be applied.
   * @param cartState the current cart state.
   */
  getDiscount(cartState: ICartState): number;
}
