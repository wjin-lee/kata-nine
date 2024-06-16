import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardItem } from '../items/shared/standard-item.model';
import { CheckoutComponent } from './checkout.component';
import { Checkout } from './shared/checkout';
import { BasePricingRule } from './shared/pricing-rules/base-pricing-rule';
import { FixedDiscountRule } from './shared/pricing-rules/fixed-discount-rule';
import { ItemQuantityCondition } from './shared/pricing-rules/item-quantity-condition';

const DUMMY_ITEMS: { [sku: string]: StandardItem } = {
  A: new StandardItem('A', 'Item A', 50),
  B: new StandardItem('B', 'Item B', 30),
  C: new StandardItem('C', 'Item C', 20),
  D: new StandardItem('D', 'Item D', 15),
};

const SINGLE_ITEM_RULESET = [
  new FixedDiscountRule([new ItemQuantityCondition(DUMMY_ITEMS['A'], 3)], -20),
  new FixedDiscountRule([new ItemQuantityCondition(DUMMY_ITEMS['B'], 2)], -15),
];

const MULTI_ITEM_RULESET = [
  new FixedDiscountRule(
    [
      new ItemQuantityCondition(DUMMY_ITEMS['A'], 1),
      new ItemQuantityCondition(DUMMY_ITEMS['B'], 2),
    ],
    -50
  ),
  new FixedDiscountRule(
    [
      new ItemQuantityCondition(DUMMY_ITEMS['A'], 1),
      new ItemQuantityCondition(DUMMY_ITEMS['B'], 1),
      new ItemQuantityCondition(DUMMY_ITEMS['C'], 1),
      new ItemQuantityCondition(DUMMY_ITEMS['D'], 1),
    ],
    -15
  ),
];

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  function getTotalPrice(itemKeys: string, rules: BasePricingRule[]) {
    const checkout = new Checkout(rules);

    for (let i = 0; i < itemKeys.length; i++) {
      if (itemKeys[i] in DUMMY_ITEMS) {
        checkout.scan(DUMMY_ITEMS[itemKeys[i]]);
      } else {
        throw Error(
          `Item key '${itemKeys[i]}' was not found in dummy item data.`
        );
      }
    }

    return checkout.total;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
    });
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to calculate the price of items without discounts', () => {
    expect(getTotalPrice('', [])).toEqual(0);
    expect(getTotalPrice('ABC', [])).toEqual(100);
    expect(getTotalPrice('AAA', [])).toEqual(150);
  });

  it('should be able to apply single-item quantity discounts.', () => {
    expect(getTotalPrice('', SINGLE_ITEM_RULESET)).toEqual(0);
    expect(getTotalPrice('A', SINGLE_ITEM_RULESET)).toEqual(50);
    expect(getTotalPrice('AB', SINGLE_ITEM_RULESET)).toEqual(80);
    expect(getTotalPrice('CDBA', SINGLE_ITEM_RULESET)).toEqual(115);

    expect(getTotalPrice('AA', SINGLE_ITEM_RULESET)).toEqual(100);
    expect(getTotalPrice('AAA', SINGLE_ITEM_RULESET)).toEqual(130);
    expect(getTotalPrice('AAAA', SINGLE_ITEM_RULESET)).toEqual(180);
    expect(getTotalPrice('AAAAA', SINGLE_ITEM_RULESET)).toEqual(230);
    expect(getTotalPrice('AAAAAA', SINGLE_ITEM_RULESET)).toEqual(260);

    expect(getTotalPrice('AAAB', SINGLE_ITEM_RULESET)).toEqual(160);
    expect(getTotalPrice('AAABB', SINGLE_ITEM_RULESET)).toEqual(175);
    expect(getTotalPrice('AAABBD', SINGLE_ITEM_RULESET)).toEqual(190);
    expect(getTotalPrice('DABABA', SINGLE_ITEM_RULESET)).toEqual(190);
  });

  it('should be able to apply multi-item quantity discounts.', () => {
    expect(getTotalPrice('', MULTI_ITEM_RULESET)).toEqual(0);

    // Full price
    expect(getTotalPrice('A', MULTI_ITEM_RULESET)).toEqual(50);
    expect(getTotalPrice('AA', MULTI_ITEM_RULESET)).toEqual(100);
    expect(getTotalPrice('AAA', MULTI_ITEM_RULESET)).toEqual(150);
    expect(getTotalPrice('AAAB', MULTI_ITEM_RULESET)).toEqual(180);

    // -50 (1xA, 2xB), -50 (1xA, 2xB)
    expect(getTotalPrice('AB', MULTI_ITEM_RULESET)).toEqual(80);
    expect(getTotalPrice('ABAB', MULTI_ITEM_RULESET)).toEqual(110);
    expect(getTotalPrice('ABABAB', MULTI_ITEM_RULESET)).toEqual(190);
    expect(getTotalPrice('ABABABAB', MULTI_ITEM_RULESET)).toEqual(220);
    expect(getTotalPrice('ABABABABAB', MULTI_ITEM_RULESET)).toEqual(300);

    // -15 (1xA, 1xB, 1xC, 1xD)
    expect(getTotalPrice('AB', MULTI_ITEM_RULESET)).toEqual(80);
    expect(getTotalPrice('ABC', MULTI_ITEM_RULESET)).toEqual(100);
    expect(getTotalPrice('ABCCC', MULTI_ITEM_RULESET)).toEqual(140);
    expect(getTotalPrice('ABCCCDDD', MULTI_ITEM_RULESET)).toEqual(170);
    expect(getTotalPrice('CADDCBCD', MULTI_ITEM_RULESET)).toEqual(170);

    // -50 (1xA, 2xB), -15 (1xA, 1xB, 1xC, 1xD)
    expect(getTotalPrice('AABBBCCDD', MULTI_ITEM_RULESET)).toEqual(195);
    expect(getTotalPrice('ABBACDCDB', MULTI_ITEM_RULESET)).toEqual(195);
  });

  it('should have correct incremental totals when applying single-item quantity discounts.', () => {
    const checkout = new Checkout(SINGLE_ITEM_RULESET);

    expect(checkout.total).toEqual(0);

    checkout.scan(DUMMY_ITEMS['A']);
    expect(checkout.total).toEqual(50);

    checkout.scan(DUMMY_ITEMS['B']);
    expect(checkout.total).toEqual(80);

    checkout.scan(DUMMY_ITEMS['A']);
    expect(checkout.total).toEqual(130);

    checkout.scan(DUMMY_ITEMS['A']);
    expect(checkout.total).toEqual(160);
    checkout.scan(DUMMY_ITEMS['B']);
    expect(checkout.total).toEqual(175);
  });

  it('should have correct incremental totals when applying multi-item quantity discounts.', () => {
    const checkout = new Checkout(MULTI_ITEM_RULESET);

    expect(checkout.total).toEqual(0);

    checkout.scan(DUMMY_ITEMS['A']);
    expect(checkout.total).toEqual(50);

    checkout.scan(DUMMY_ITEMS['B']);
    expect(checkout.total).toEqual(80);

    checkout.scan(DUMMY_ITEMS['C']);
    expect(checkout.total).toEqual(100);

    checkout.scan(DUMMY_ITEMS['D']);
    expect(checkout.total).toEqual(100); // -15 (1xA, 1xB, 1xC, 1xD)

    checkout.scan(DUMMY_ITEMS['B']);
    expect(checkout.total).toEqual(95); // -50 (1xA, 2xB)

    checkout.scan(DUMMY_ITEMS['A']);
    expect(checkout.total).toEqual(145);

    checkout.scan(DUMMY_ITEMS['B']);
    expect(checkout.total).toEqual(160); // -50 (1xA, 2xB), -15 (1xA, 1xB, 1xC, 1xD)
  });
});
