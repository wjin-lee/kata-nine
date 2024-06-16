import { StandardItem } from "../src/item/standard-item";

describe("ItemsComponent", () => {
  it("should be able to create an item object", () => {
    let item = new StandardItem("itemSKU", "itemName", 5.0);
    expect(item).toBeTruthy();
    expect(item.sku).toEqual("itemSKU");
    expect(item.name).toEqual("itemName");
    expect(item.unitPrice).toEqual(5.0);
  });

  it("should error when trying to create an item object with an invalid name", () => {
    expect(() => {
      new StandardItem("invalid$SKU", "itemName", 5.0);
    }).toThrowError();
  });
});
