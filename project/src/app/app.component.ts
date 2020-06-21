import { Component, ViewChild } from '@angular/core';
import { IProduct } from './interfaces/IProduct';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Project';
  item: IProduct;

  @ViewChild('staticModal') staticModal: ModalDirective;

  constructor() {
  }

  /** receive product item */
  onUpdate(item: IProduct) {
    this.item = item;
    this.staticModal.show();
  }
}