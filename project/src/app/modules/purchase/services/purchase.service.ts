import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IPurchase } from 'src/app/interfaces/IPurchase';
import { environment } from 'src/environments/environment';

@Injectable()
export class PurchaseService {

    constructor(private http: HttpClient) { }

    /** get items */
    getItems() {
        return this.http.get<IPurchase[]>(environment.api + '/api/po');
    }

    /** delete item */
    deleteItem(id: number) {
        return this.http.delete<{ message: string }>(environment.api + '/api/po/' + id);
    }
}