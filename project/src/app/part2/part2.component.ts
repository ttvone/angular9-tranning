import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { PartService } from '../services/part.service';

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.css']
})
export class Part2Component implements OnInit {

  @Input('title') title: string = 'Part 2';

  /** รายการสินค้า */
  products: IProduct[];

  constructor(private service: PartService) {

    this.service.getItems().subscribe(items => {
      this.products = items;
    });

  }

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
