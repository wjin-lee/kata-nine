import { BaseItem } from "../../../item/base-item";
import { SKUCountMap } from "../../../shared/sku-count-map";
import { ICartState } from "../../cart-state";
import { IRuleCondition } from "./rule-condition";

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

  isSatisfied(cartState: ICartState): boolean {
    return (
      this.item.sku in cartState.cartItemCounts &&
      cartState.cartItemCounts[this.item.sku] >= this.quantity
    );
  }

  getConsumption(): SKUCountMap {
    let consumption: SKUCountMap = {};
    consumption[this.item.sku] = this.quantity;
    return consumption;
  }
}
