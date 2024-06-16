import { BaseItem } from 'src/app/items/shared/base-item';
import { ICheckoutContext } from '../checkout-context';
import { SKUCountMap } from '../sku-count-map.interface';
import { IRuleCondition } from './rule-condition.interface';

/**
 * A pricing rule condition that is satisfied when a given item's quantity in the cart is above the threshold specified.
 */
export class ItemQuantityCondition implements IRuleCondition {
  private item: BaseItem;
  private quantity: number;

  constructor(item: BaseItem, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }

  isSatisfied(ctx: ICheckoutContext): boolean {
    return (
      this.item.sku in ctx.cartItems &&
      ctx.cartItems[this.item.sku] >= this.quantity
    );
  }

  getConsumption(): SKUCountMap {
    let consumption: SKUCountMap = {};
    consumption[this.item.sku] = this.quantity;
    return consumption;
  }
}
