import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  /** รายการสินค้า */
  private products: IProduct[] = [
    {
      productId: 1,
      productName: 'สินค้า 1',
      productAmount: 10,
      productPrice: 100.25
    },
    {
      productId: 2,
      productName: 'สินค้า 2',
      productAmount: 10,
      productPrice: 2500
    },
    {
      productId: 3,
      productName: 'สินค้า 3',
      productAmount: 1200,
      productPrice: 50
    },
    {
      productId: 4,
      productName: 'สินค้า 4',
      productAmount: 70,
      productPrice: 80
    },
    {
      productId: 5,
      productName: 'สินค้า 5',
      productAmount: 60,
      productPrice: 100
    },
  ];

  constructor() { }

  /** get product items */
  getItems() {
    return of(this.products);
  }

  /** insert product item */
  addItem(value: IProduct) {
    return new Observable(observ => {
      value.productId = Math.random();
      this.products.push(value);
      observ.next({ message: 'สำเร็จ' });
    });
  }

  /** update item */
  updateItem(id: number, value: IProduct) {
    return new Observable(observ => {
      const product = this.products.find(m => m.productId == id);
      if (!product) return observ.error({ message: 'ไม่มีสินค้า' });
      product.productName = value.productName;
      product.productAmount = value.productAmount;
      product.productPrice = value.productPrice;
      observ.next({ message: 'สำเร็จ' });
    });
  }

}
