import { IProduct } from './IProduct';

export interface IPurchase {
    poId: number;
    companyName: string;
    companyAddress: string;
    customerAddress: string;
    poNumber: string;
    poDate: string;
    products: IProduct[];
    poCreated: string;
    poUpdated: string;
}