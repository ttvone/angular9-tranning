import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.css']
})
export class Part2Component implements OnInit {

  @Input('title') title: string = 'Part 2';

  /** รายการสินค้า */
  products: IProduct[] = [
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

  ngOnInit() {
  }

  /** ลบสินค้า */
  onDeleteProduct(item: IProduct) {
    if (confirm('คุณต้องการทำรายการต่อไปหรือไม่?')) {
      let index = this.products.findIndex(i => i.productId == item.productId);
      if (index < 0) return;
      this.products.splice(index, 1);
    }
  }

}
