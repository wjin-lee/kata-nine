import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { OrderItem } from './shared/order-item.model';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsComponent],
    });
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to create an item object', () => {
    let item = new OrderItem('itemName', 5.0);
    expect(item).toBeTruthy();
    expect(item.name).toEqual('itemName');
    expect(item.unitPrice).toEqual(5.0);
  });
});
