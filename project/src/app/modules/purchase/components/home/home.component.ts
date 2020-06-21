import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { IPurchase } from 'src/app/interfaces/IPurchase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Items: IPurchase[] = [];

  constructor(private service: PurchaseService) {
    /** get purchase items */
    this.loadItems();
  }

  ngOnInit(): void {
  }

  onDelete(item: IPurchase) {
    if (!confirm('Do you want to delete this right?')) return;
    this.service.deleteItem(item.poId).subscribe(() => {
      this.loadItems();
    }, error => alert(error.message));
  }

  private loadItems() {
    /** get purchase items */
    this.service.getItems().subscribe(items => {
      this.Items = items;
    });
  }

}
