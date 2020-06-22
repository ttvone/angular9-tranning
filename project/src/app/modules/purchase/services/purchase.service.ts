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

    /** get item by id */
    getItem(id: number) {
        return this.http.get<IPurchase>(environment.api + '/api/po/' + id);
    }

    /** insert item */
    saveItem(value: IPurchase) {
        return this.http.post<{ message: string, data: IPurchase }>(environment.api + '/api/po', value);
    }

    /** update item */
    updateItem(id: number, value: IPurchase) {
        return this.http.put<{ message: string, data: IPurchase }>(environment.api + '/api/po/' + id, value);
    }

    /** delete item */
    deleteItem(id: number) {
        return this.http.delete<{ message: string }>(environment.api + '/api/po/' + id);
    }
}