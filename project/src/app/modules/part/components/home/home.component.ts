import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  item: IProduct;

  @ViewChild('staticModal') staticModal: ModalDirective;

  constructor() {
  }

  ngOnInit() { }

  /** receive product item */
  onUpdate(item: IProduct) {
    this.item = item;
    this.staticModal.show();
  }
}
