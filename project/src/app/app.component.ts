import { Component } from '@angular/core';
import { IProduct } from './interfaces/IProduct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Project';
  item: IProduct;

  constructor() {
  }

  /** receive product item */
  onUpdate(item: IProduct) {
    this.item = item;
  }
}