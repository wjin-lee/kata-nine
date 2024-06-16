import { Checkout } from "./checkout/checkout";
import { ItemQuantityCondition } from "./checkout/pricing-rules/conditions/item-quantity-condition";
import { FixedDiscountRule } from "./checkout/pricing-rules/fixed-discount-rule";
import { StandardItem } from "./item/standard-item";

const DUMMY_ITEMS: { [sku: string]: StandardItem } = {
  A: new StandardItem("A", "Item A", 50),
  B: new StandardItem("B", "Item B", 30),
  C: new StandardItem("C", "Item C", 20),
  D: new StandardItem("D", "Item D", 15),
};

const SINGLE_ITEM_RULESET = [
  new FixedDiscountRule([new ItemQuantityCondition(DUMMY_ITEMS["A"], 3)], -20),
  new FixedDiscountRule([new ItemQuantityCondition(DUMMY_ITEMS["B"], 2)], -15),
];

const co = new Checkout(SINGLE_ITEM_RULESET);
co.scan(DUMMY_ITEMS.A);
co.scan(DUMMY_ITEMS.B);
co.scan(DUMMY_ITEMS.B);
console.log(co.total);
