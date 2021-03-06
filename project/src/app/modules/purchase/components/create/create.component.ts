import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PurchaseService } from '../../services/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  /** ประการตัวแปรมารับฟอร์มตัวหลัก */
  form: FormGroup;
  /** ประการตัวแปรมารับฟอร์มตัวสินค้า */
  formProduct: FormGroup;
  /** เก็บรหัส PO หากว่ามีการแก้ไข */
  private poId: number;

  constructor(
    private builder: FormBuilder,
    private service: PurchaseService,
    private router: Router,
    private activRoute: ActivatedRoute
  ) {
    this.createFormData();
  }

  ngOnInit(): void {
    this.updateFormData();
  }

  /** บันทึกข้อมูล */
  onSubmit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    // create
    if (!this.poId) {
      this.service.saveItem(this.form.value).subscribe(() => {
        this.router.navigate(['/purchase']); // redirect ไปที่หน้ารายการ
      }, error => alert(error.message));
    }
    // update
    else {
      this.service.updateItem(this.poId, this.form.value).subscribe(() => {
        this.poId = null;
        this.router.navigate(['/purchase']); // redirect ไปที่หน้ารายการ
      }, error => alert(error.message));
    }
  }

  /** บันทึกข้อมูลสินค้า */
  onSubmitProduct() {
    // หากเป็นการแก้ไข
    if (this.isEditProduct) {
      this.onUpdateProduct();
    }
    // หากเป็นการสร้างใหม่
    else {
      this.onAddProduct();
    }
  }

  /** เพิ่มสินค้า */
  onAddProduct() {
    if (this.formProduct.invalid) return this.formProduct.markAllAsTouched();
    const products = this.getProductArrays();
    const createForm = this.builder.group({
      productName: ['', Validators.required],
      productAmount: ['', Validators.required],
      productPrice: ['', Validators.required]
    });
    createForm.patchValue(this.formProduct.value);
    products.push(createForm);
    this.formProduct.reset();
  }

  /** แก้ไขสินค้า */
  onUpdateProduct() {
    const index = this.formProduct.value['editIndex'] as number;
    const products = this.getProductArrays();
    const product = products.get(index.toString());
    if (!product) return;
    product.patchValue(this.formProduct.value);
    this.formProduct.reset();
  }

  /** ลบสินค้า */
  onRemoveProduct(index: number) {
    const products = this.getProductArrays();
    if (!confirm('คุณต้องการทำรายการต่อไป?')) return;
    products.removeAt(index);
  }

  /** นำมาใส่ Form เพื่อที่จะแก้ไขสินค้า */
  onShowEditProduct(index: number) {
    const products = this.getProductArrays();
    const product = products.get(index.toString());
    if (!product) return;
    this.formProduct.patchValue(product.value);
    this.formProduct.get('editIndex').setValue(index);
  }

  /** ดึงข้อมูลอาเรย์ของฟอร์มสินค้า */
  getProductArrays() {
    return this.form.get('products') as FormArray;
  }

  /** ตรวจสอบ Proudct form ว่าเป็นการเพิ่มใหม่หรือแก้ไข */
  get isEditProduct() {
    return typeof this.formProduct.get('editIndex').value == 'number';
  }

  /** สร้างฟอร์มมาเก็บข้อมูล */
  private createFormData() {
    // main form
    this.form = this.builder.group({
      poNumber: ['', Validators.required],
      poDate: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      customerAddress: ['', Validators.required],
      products: this.builder.array([], Validators.required)
    });

    // product form
    this.formProduct = this.builder.group({
      productName: ['', Validators.required],
      productAmount: ['', Validators.required],
      productPrice: ['', Validators.required],
      editIndex: [''] // ตรวจสอบว่าเป็นการแก้ไขหรือไม่
    });
  }

  /** แก้ไขฟอร์มหลัก */
  private updateFormData() {
    const datePipe = new DatePipe('en-US');
    this.poId = parseFloat(this.activRoute.snapshot.params.id);
    if (!this.poId) return;
    // ส่ง id ไปดึงข้อมูลจาก server มา
    this.service.getItem(this.poId).subscribe(data => {
      data.poDate = datePipe.transform(data.poDate, 'yyyy-MM-dd');
      this.form.patchValue(data);
      const products = this.getProductArrays();
      data.products.forEach(m => {
        const createForm = this.builder.group({
          productName: ['', Validators.required],
          productAmount: ['', Validators.required],
          productPrice: ['', Validators.required]
        });
        createForm.patchValue(m);
        products.push(createForm);
      });
    });
  }
}
